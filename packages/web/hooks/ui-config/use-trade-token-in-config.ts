import { Dec } from "@keplr-wallet/unit";
import { ObservableTradeTokenInConfig } from "@osmosis-labs/stores";
import { useState } from "react";

import { TfmRemoteRouter } from "~/integrations/tfm/router";
import { useStore } from "~/stores";

/** Maintains a single instance of `ObservableTradeTokenInConfig` for React view lifecycle.
 *  Updates `osmosisChainId`, `bech32Address`, `pools` on render.
 *  `percentage` default: `"50"`.
 */
export function useTradeTokenInConfig(osmosisChainId: string): {
  tradeTokenInConfig: ObservableTradeTokenInConfig;
  tradeTokenIn: (
    slippage: Dec
  ) => Promise<"multiroute" | "multihop" | "exact-in">;
} {
  const { chainStore, accountStore, queriesStore, priceStore } = useStore();

  const account = accountStore.getWallet(osmosisChainId);

  const address = account?.address ?? "";

  const [config] = useState(
    () =>
      new ObservableTradeTokenInConfig(
        chainStore,
        queriesStore,
        priceStore,
        osmosisChainId,
        address,
        undefined,
        {
          send: {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
          },
          out: {
            coinDenom: "OSMO",
            coinMinimalDenom: "uosmo",
            coinDecimals: 6,
          },
        },
        new TfmRemoteRouter(
          osmosisChainId,
          process.env.NEXT_PUBLIC_TFM_API_BASE_URL ?? "https://api.tfm.com"
        ),
        1_500
      )
  );
  // updates UI config on render to reflect latest values
  config.setChain(osmosisChainId);
  config.setSender(address);

  /** User trade token in from config values. */
  const tradeTokenIn = (maxSlippage: Dec) =>
    new Promise<"multiroute" | "multihop" | "exact-in">((resolve, reject) => {
      if (!config.optimizedRoutes) {
        return reject(
          "User input should be disabled if no route is found or is being generated"
        );
      }

      if (config.isEmptyInput) return reject("No input");

      /**
       * Prepare swap data
       */

      type Pool = {
        id: string;
        tokenOutDenom: string;
      };
      type Route = {
        pools: Pool[];
        tokenInAmount: string;
      };

      const routes: Route[] = [];

      for (const route of config.optimizedRoutes) {
        const pools: Pool[] = [];

        for (let i = 0; i < route.pools.length; i++) {
          const pool = route.pools[i];

          pools.push({
            id: pool.id,
            tokenOutDenom: route.tokenOutDenoms[i],
          });
        }

        routes.push({
          pools: pools,
          tokenInAmount: route.initialAmount.toString(),
        });
      }

      /** In amount converted to integer (remove decimals) */
      const tokenIn = {
        currency: config.sendCurrency,
        amount: config.getAmountPrimitive().amount,
      };

      const tokenOutMinAmount = config
        .outAmountLessSlippage(maxSlippage)
        .toCoin().amount;

      /**
       * Send messages to account
       */
      if (routes.length === 1) {
        const { pools } = routes[0];
        account?.osmosis
          .sendSwapExactAmountInMsg(
            pools,
            tokenIn,
            tokenOutMinAmount,
            undefined,
            undefined,
            () => {
              config.reset();

              resolve(pools.length === 1 ? "exact-in" : "multihop");
            }
          )
          .catch((reason) => {
            config.reset();
            reject(reason);
          });
        return pools.length === 1 ? "exact-in" : "multihop";
      } else if (routes.length > 1) {
        account?.osmosis
          .sendSplitRouteSwapExactAmountInMsg(
            routes,
            tokenIn,
            tokenOutMinAmount,
            undefined,
            undefined,
            () => {
              config.reset();

              resolve("multiroute");
            }
          )
          .catch((reason) => {
            config.reset();
            reject(reason);
          });
      } else {
        reject("No routes given");
      }
    });

  return { tradeTokenInConfig: config, tradeTokenIn };
}
