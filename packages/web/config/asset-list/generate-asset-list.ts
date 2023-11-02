// eslint-disable-next-line import/no-extraneous-dependencies
import { ChainInfoWithExplorer } from "@osmosis-labs/stores";
import * as fs from "fs";
import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as prettier from "prettier";

import {
  IS_TESTNET,
  OSMOSIS_CHAIN_ID_OVERWRITE,
  OSMOSIS_CHAIN_NAME_OVERWRITE,
  OSMOSIS_REST_OVERWRITE,
  OSMOSIS_RPC_OVERWRITE,
} from "~/config/env";
import { hasMatchingMinimalDenom, matchesDenomOrAlias } from "~/config/utils";
import { queryGithubFile } from "~/queries/github";

import { Asset, AssetList, Chain, ChainList, ResponseAssetList } from "./type";

const repo = "osmosis-labs/assetlists";

/** Determines the environment asset list to fetch from github. */
const osmosisChainId = IS_TESTNET ? "osmo-test-5" : "osmosis-1";

function getFilePath({
  chainId,
  fileType,
}: {
  chainId: string;
  fileType: "assetlist" | "chainlist";
}) {
  return `/${chainId}/${chainId}.${fileType}.json`;
}

function findDenomUnits({
  asset,
  chainName,
}: {
  asset?: Asset;
  chainName: string;
}) {
  if (!asset) {
    return {
      baseDenomUnit: undefined,
      displayDenomUnit: undefined,
    };
  }

  const baseDenomUnit = asset?.denom_units.find((denomUnits) =>
    matchesDenomOrAlias({
      denomToSearch: asset.base,
      ...denomUnits,
    })
  )!;
  const displayDenomUnit = asset?.denom_units.find((denomUnits) =>
    matchesDenomOrAlias({
      denomToSearch: asset.display,
      ...denomUnits,
    })
  )!;

  if (!baseDenomUnit) {
    console.warn(
      `Failed to find base denom for ${asset?.symbol} on ${chainName}`
    );
  }

  if (!displayDenomUnit) {
    console.warn(
      `Failed to find display denom for ${asset?.symbol} on ${chainName}`
    );
  }

  return { baseDenomUnit, displayDenomUnit };
}

function getKeplrCompatibleChain({
  chain,
  assetLists,
}: {
  chain: Chain;
  assetLists: AssetList[];
}): ChainInfoWithExplorer {
  const isOsmosis = chain.chain_name === "osmosis";
  const assetList = assetLists.find(
    ({ chain_name }) => chain_name === chain.chain_name
  );

  if (!assetList) {
    throw new Error(`Failed to find currencies for ${chain.chain_name}`);
  }

  const stakingTokenDenom = chain.staking.staking_tokens[0].denom;
  const stakeAsset = assetList.assets.find((asset) =>
    hasMatchingMinimalDenom(asset, stakingTokenDenom)
  );

  if (!stakeAsset) {
    console.warn(
      `Failed to find stake asset for ${stakingTokenDenom} on ${chain.chain_name}. Proceeding to use minimalDenom as currency.`
    );
  }

  const {
    baseDenomUnit: stakeBaseDenomUnit,
    displayDenomUnit: stakeDisplayDenomUnit,
  } = findDenomUnits({ asset: stakeAsset, chainName: chain.chain_name });

  const rpc = chain.apis.rpc[0].address;
  const rest = chain.apis.rest[0].address;
  const chainId = chain.chain_id;
  const prettyChainName = chain.pretty_name;

  return {
    rpc: isOsmosis ? OSMOSIS_RPC_OVERWRITE ?? rpc : rpc,
    rest: isOsmosis ? OSMOSIS_REST_OVERWRITE ?? rest : rest,
    chainId: isOsmosis ? OSMOSIS_CHAIN_ID_OVERWRITE ?? chainId : chainId,
    chainName: chain.chain_name,
    prettyChainName: isOsmosis
      ? OSMOSIS_CHAIN_NAME_OVERWRITE ?? prettyChainName
      : prettyChainName,
    bip44: {
      coinType: chain?.slip44 ?? 118,
    },
    currencies: assetList.assets.reduce<ChainInfoWithExplorer["currencies"]>(
      (acc, asset) => {
        const { baseDenomUnit, displayDenomUnit } = findDenomUnits({
          asset,
          chainName: chain.chain_name,
        });

        if (!baseDenomUnit || !displayDenomUnit) {
          return acc;
        }

        acc.push({
          coinDenom: asset.symbol,
          coinMinimalDenom: baseDenomUnit?.aliases?.[0] ?? baseDenomUnit.denom,
          coinDecimals: displayDenomUnit.exponent,
          coinGeckoId: asset.coingecko_id,
          coinImageUrl: asset.logo_URIs.svg ?? asset.logo_URIs.png,
        });
        return acc;
      },
      []
    ),
    stakeCurrency: {
      coinDecimals: stakeDisplayDenomUnit?.exponent ?? 0,
      coinDenom: stakeAsset?.symbol ?? stakingTokenDenom,
      coinMinimalDenom:
        stakeBaseDenomUnit?.aliases?.[0] ??
        stakeBaseDenomUnit?.denom ??
        stakingTokenDenom,
      coinGeckoId: stakeAsset?.coingecko_id,
      coinImageUrl: stakeAsset?.logo_URIs.svg,
    },
    feeCurrencies: chain.fees.fee_tokens.reduce<
      ChainInfoWithExplorer["feeCurrencies"]
    >((acc, token) => {
      const asset = assetList.assets.find((asset) =>
        hasMatchingMinimalDenom(asset, token.denom)
      );

      if (!asset) {
        console.warn(
          `Failed to find asset for ${token.denom} on ${chain.chain_name}`
        );
        return acc;
      }

      const { baseDenomUnit, displayDenomUnit } = findDenomUnits({
        asset,
        chainName: chain.chain_name,
      });

      if (!baseDenomUnit || !displayDenomUnit) {
        return acc;
      }

      acc.push({
        coinDenom: asset.symbol,
        coinMinimalDenom: baseDenomUnit?.aliases?.[0] ?? baseDenomUnit.denom,
        coinDecimals: displayDenomUnit.exponent,
        coinGeckoId: asset.coingecko_id,
        coinImageUrl: asset.logo_URIs.svg,
      });
      return acc;
    }, []),
    bech32Config: chain.bech32_config,
    explorerUrlToTx: chain.explorers[0].tx_page,
    features: chain.features,
  };
}

async function generateChainListFile({
  assetLists,
  chainList,
}: {
  assetLists: AssetList[];
  chainList: ChainList;
}) {
  const allAvailableChains: Pick<Chain, "chain_id" | "chain_name">[] = [
    ...chainList.chains,
    { chain_id: "osmosis-1", chain_name: "Osmosis" }, // Include Osmosis again since it can be overriden.
    { chain_id: "axelar-dojo-1", chain_name: "Axelar" }, // Include Axelar again because it can be overriden.
  ];

  const content = `
    import type { ChainInfoWithExplorer } from "@osmosis-labs/stores";

    import type { Chain } from "../asset-list/type";
    export const ChainList: ( Chain & { keplrChain: ChainInfoWithExplorer})[] = ${JSON.stringify(
      chainList.chains.map((chain) => ({
        ...chain,
        keplrChain: getKeplrCompatibleChain({ chain, assetLists }),
      })),
      null,
      2
    )};
    export type AvailableChainIds = ${Array.from(
      new Set(allAvailableChains.map((c) => c.chain_id))
    )
      .map(
        (chainId) =>
          `"${chainId}" /** ${
            allAvailableChains.find((c) => c.chain_id === chainId)!.chain_name
          } */`
      )
      .join(" | ")};
  `;

  const prettierConfig = await prettier.resolveConfig("./");
  const formatted = prettier.format(content, {
    ...prettierConfig,
    parser: "typescript",
  });

  const dirPath = "config/generated";
  const fileName = "chain-list.ts";

  try {
    const filePath = path.join(dirPath, fileName);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    fs.writeFileSync(filePath, formatted, {
      encoding: "utf8",
      flag: "w",
    });
    console.info(`Successfully wrote ${fileName}`);
  } catch (e) {
    console.error(`Error writing ${fileName}: ${e}`);
  }
}

let assetsAdded = 0;
function createOrAddToAssetList(
  assetList: AssetList[],
  chain: Chain,
  asset: ResponseAssetList["assets"][number]
): AssetList[] {
  const assetlistIndex = assetList.findIndex(
    ({ chain_name }) => chain_name === chain.chain_name
  );

  const augmentedAsset: Asset = {
    ...asset,
    display: asset.display.toLowerCase(),
    origin_chain_id: chain.chain_id,
    origin_chain_name: chain.chain_name,
  };

  if (assetlistIndex === -1) {
    assetList.push({
      chain_name: chain.chain_name,
      chain_id: chain.chain_id,
      assets: [augmentedAsset],
    });
  } else {
    assetList[assetlistIndex].assets.push(augmentedAsset);
  }

  assetsAdded += 1;
  return assetList;
}

async function generateAssetListFile({ chains }: { chains: Chain[] }) {
  const assetList = await queryGithubFile<ResponseAssetList>({
    repo,
    filePath: getFilePath({
      chainId: osmosisChainId,
      fileType: "assetlist",
    }),
  });

  const assetLists = assetList.assets.reduce<AssetList[]>((acc, asset) => {
    const traces = asset.traces.filter((trace) =>
      ["ibc", "ibc-cw20"].includes(trace.type)
    );

    /** If there are no traces, assume it's an Osmosis asset */
    if (traces.length === 0) {
      const chain = chains.find(
        (chain) =>
          chain.chain_id === (OSMOSIS_CHAIN_ID_OVERWRITE ?? osmosisChainId)
      );

      if (!chain) {
        throw new Error("Failed to find chain osmosis");
      }

      return createOrAddToAssetList(acc, chain, asset);
    }

    for (const trace of traces) {
      const chainName = trace.counterparty.chain_name;
      const chain = chains.find((chain) => chain.chain_name === chainName);

      if (!chain) {
        console.warn(
          `Failed to find chain ${chainName}. ${asset.symbol} for that chain will be skipped.`
        );
        continue;
      }

      createOrAddToAssetList(acc, chain, asset);
    }

    return acc;
  }, [] as AssetList[]);

  const content = `
    import type { AssetList } from "../asset-list/type";
    export const AssetLists = ${JSON.stringify(
      assetLists,
      null,
      2
    )} as AssetList[];
    export type AvailableDisplayAssets = ${Array.from(
      new Set(assetList.assets.map((c) => c.display))
    )
      .map(
        (display) =>
          `"${display}" /** ${
            assetList.assets.find((c) => c.display === display)!.symbol
          } */`
      )
      .join(" | ")};
  `;

  const prettierConfig = await prettier.resolveConfig("./");
  const formatted = prettier.format(content, {
    ...prettierConfig,
    parser: "typescript",
  });

  const dirPath = "config/generated";
  const fileName = "asset-list.ts";

  try {
    const filePath = path.join(dirPath, fileName);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    fs.writeFileSync(filePath, formatted, {
      encoding: "utf8",
      flag: "w",
    });
    console.info(
      `Successfully wrote ${fileName}. Added ${assetsAdded} assets.`
    );

    return assetLists;
  } catch (e) {
    console.error(`Error writing ${fileName}: ${e}`);
  }
}

async function main() {
  const chainList = await queryGithubFile<ChainList>({
    repo,
    filePath: getFilePath({
      chainId: osmosisChainId,
      fileType: "chainlist",
    }),
  });

  const assetLists = await generateAssetListFile({ chains: chainList.chains });

  if (!assetLists) throw new Error("Failed to generate asset lists");

  await generateChainListFile({ assetLists, chainList });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
