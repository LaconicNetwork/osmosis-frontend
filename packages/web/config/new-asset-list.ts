import { IS_TESTNET } from "~/config/env";
import { queryGithubFile } from "~/queries/github";

export interface ChainList {
  zone: string;
  chains: Chain[];
}

export interface Chain {
  chain_name: string;
  status: string;
  network_type: string;
  pretty_name: string;
  chain_id: string;
  bech32_prefix: string;
  bech32_config: Bech32Config;
  slip44: number;
  fees: {
    fee_tokens: FeeToken[];
  };
  staking: {
    staking_tokens: StakingToken[];
    lock_duration: LockDuration;
  };
  apis: {
    rpc: Api[];
    rest: Api[];
  };
  explorers: Explorer[];
  features: string[];
}

export interface AssetList {
  chain_name: string;
  assets: Asset[];
}

export interface Asset {
  description: string;
  denom_units: DenomUnit[];
  base: string;
  name: string;
  display: string;
  symbol: string;
  traces: any[];
  logo_URIs: LogoURIs;
  coingecko_id: string;
  keywords: string[];
}

interface DenomUnit {
  denom: string;
  exponent: number;
}

interface LogoURIs {
  png: string;
  svg: string;
}

interface Bech32Config {
  bech32PrefixAccAddr: string;
  bech32PrefixAccPub: string;
  bech32PrefixValAddr: string;
  bech32PrefixValPub: string;
  bech32PrefixConsAddr: string;
  bech32PrefixConsPub: string;
}

interface FeeToken {
  denom: string;
  fixed_min_gas_price: number;
  low_gas_price: number;
  average_gas_price: number;
  high_gas_price: number;
}

interface StakingToken {
  denom: string;
}

interface LockDuration {
  time: string;
}

interface Api {
  address: string;
}

interface Explorer {
  tx_page: string;
}

function getFilePath({
  chainId,
  fileType,
}: {
  chainId: string;
  fileType: "assetlist" | "chainlist";
}) {
  return `/${chainId}/${chainId}.${fileType}.json`;
}

async function main() {
  const repo = "osmosis-labs/assetlists";
  const chainId = IS_TESTNET ? "osmo-test-5" : "osmosis-1";

  const chainList = await queryGithubFile<ChainList>({
    repo,
    filePath: getFilePath({
      chainId,
      fileType: "chainlist",
    }),
  });

  const assetList = await queryGithubFile<AssetList>({
    repo,
    filePath: getFilePath({
      chainId,
      fileType: "assetlist",
    }),
  });

  console.log(chainList, assetList);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
