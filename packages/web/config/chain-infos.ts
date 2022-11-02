import { ChainInfoWithExplorer } from "../stores/chain";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { createKeplrChainInfos, SimplifiedChainInfo } from "./utils";

const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === "true";
const OSMOSIS_RPC_OVERWRITE = process.env.NEXT_PUBLIC_OSMOSIS_RPC_OVERWRITE;
const OSMOSIS_REST_OVERWRITE = process.env.NEXT_PUBLIC_OSMOSIS_REST_OVERWRITE;
const OSMOSIS_EXPLORER_URL_OVERWRITE =
  process.env.NEXT_PUBLIC_OSMOSIS_EXPLORER_URL_OVERWRITE;
const OSMOSIS_CHAIN_ID_OVERWRITE =
  process.env.NEXT_PUBLIC_OSMOSIS_CHAIN_ID_OVERWRITE;
const OSMOSIS_CHAIN_NAME_OVERWRITE =
  process.env.NEXT_PUBLIC_OSMOSIS_CHAIN_NAME_OVERWRITE;

const chainInfos = (
  [
    {
      rpc:
        OSMOSIS_RPC_OVERWRITE ?? IS_TESTNET
          ? "https://rpc-test.osmosis.zone/"
          : "https://rpc-osmosis.keplr.app/",
      rest:
        OSMOSIS_REST_OVERWRITE ?? IS_TESTNET
          ? "https://lcd-test.osmosis.zone/"
          : "https://lcd-osmosis.keplr.app/",
      chainId:
        OSMOSIS_CHAIN_ID_OVERWRITE ?? IS_TESTNET ? "osmo-test-4" : "osmosis-1",
      chainName: OSMOSIS_CHAIN_NAME_OVERWRITE ?? "Osmosis",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("osmo"),
      currencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          coinGeckoId: "osmosis",
          coinImageUrl: "/tokens/osmo.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "ION",
          coinMinimalDenom: "uion",
          coinDecimals: 6,
          coinGeckoId: "ion",
          coinImageUrl: "/tokens/ion.png",
        },
      ],
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.025,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx:
        OSMOSIS_EXPLORER_URL_OVERWRITE ?? IS_TESTNET
          ? "https://testnet.mintscan.io/osmosis-testnet/txs/{txHash}"
          : "https://www.mintscan.io/osmosis/txs/{txHash}",
    },
    {
      rpc: "https://rpc-cosmoshub.keplr.app",
      rest: "https://lcd-cosmoshub.keplr.app",
      chainId: "cosmoshub-4",
      chainName: "Cosmos Hub",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("cosmos"),
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
          coinImageUrl: "/tokens/atom.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/cosmos/txs/{txHash}",
    },
    {
      rpc: "https://rpc-columbus.keplr.app",
      rest: "https://lcd-columbus.keplr.app",
      chainId: "columbus-5",
      chainName: "Terra Classic",
      bip44: {
        coinType: 330,
      },
      bech32Config: Bech32Address.defaultBech32Config("terra"),
      currencies: [
        {
          coinDenom: "LUNC",
          coinMinimalDenom: "uluna",
          coinDecimals: 6,
          //coinGeckoId: "terra-luna",
          coinGeckoId: "pool:ulunc",
          coinImageUrl: "/tokens/lunc.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "USTC",
          coinMinimalDenom: "uusd",
          coinDecimals: 6,
          //coinGeckoId: "terrausd",
          coinGeckoId: "pool:uustc",
          coinImageUrl: "/tokens/ustc.png",
          isFeeCurrency: true,
          pegMechanism: "algorithmic",
        },
        {
          coinDenom: "KRTC",
          coinMinimalDenom: "ukrw",
          coinDecimals: 6,
          coinGeckoId: "terra-krw",
          coinImageUrl: "/tokens/krtc.png",
          pegMechanism: "algorithmic",
        },
      ],
      gasPriceStep: {
        low: 5.665,
        average: 5.665,
        high: 10,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://finder.terra.money/columbus-5/tx/{txHash}",
    },
    {
      rpc: "https://rpc-secret.keplr.app",
      rest: "https://lcd-secret.keplr.app",
      chainId: "secret-4",
      chainName: "Secret Network",
      bip44: {
        coinType: 529,
      },
      bech32Config: Bech32Address.defaultBech32Config("secret"),
      currencies: [
        {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
          coinGeckoId: "secret",
          coinImageUrl: "/tokens/scrt.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx:
        "https://secretnodes.com/secret/chains/secret-4/transactions/{txHash}",
    },
    {
      rpc: "https://rpc-akash.keplr.app",
      rest: "https://lcd-akash.keplr.app",
      chainId: "akashnet-2",
      chainName: "Akash",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("akash"),
      currencies: [
        {
          coinDenom: "AKT",
          coinMinimalDenom: "uakt",
          coinDecimals: 6,
          coinGeckoId: "akash-network",
          coinImageUrl: "/tokens/akt.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "ibc-go", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/akash/txs/{txHash}",
    },
    {
      rpc: "https://rpc-regen.keplr.app",
      rest: "https://lcd-regen.keplr.app",
      chainId: "regen-1",
      chainName: "Regen Network",
      bip44: { coinType: 118 },
      bech32Config: Bech32Address.defaultBech32Config("regen"),
      currencies: [
        {
          coinDenom: "REGEN",
          coinMinimalDenom: "uregen",
          coinDecimals: 6,
          coinImageUrl: "/tokens/regen.png",
          coinGeckoId: "regen",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://regen.aneka.io/txs/{txHash}",
    },
    {
      rpc: "https://rpc-sentinel.keplr.app",
      rest: "https://lcd-sentinel.keplr.app",
      chainId: "sentinelhub-2",
      chainName: "Sentinel",
      bip44: { coinType: 118 },
      bech32Config: Bech32Address.defaultBech32Config("sent"),
      currencies: [
        {
          coinDenom: "DVPN",
          coinMinimalDenom: "udvpn",
          coinDecimals: 6,
          coinGeckoId: "sentinel",
          coinImageUrl: "/tokens/dvpn.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      explorerUrlToTx: "https://www.mintscan.io/sentinel/txs/{txHash}",
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
    },
    {
      rpc: "https://rpc-persistence.keplr.app",
      rest: "https://lcd-persistence.keplr.app",
      chainId: "core-1",
      chainName: "Persistence",
      bip44: {
        coinType: 750,
      },
      bech32Config: Bech32Address.defaultBech32Config("persistence"),
      currencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence",
          coinImageUrl: "/tokens/xprt.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "PSTAKE",
          coinMinimalDenom:
            "ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444",
          coinDecimals: 18,
          coinGeckoId: "pstake-finance",
          coinImageUrl: "/tokens/pstake.png",
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/persistence/txs/{txHash}",
    },
    {
      rpc: "https://rpc-iris.keplr.app",
      rest: "https://lcd-iris.keplr.app",
      chainId: "irishub-1",
      chainName: "IRISnet",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("iaa"),
      currencies: [
        {
          coinDenom: "IRIS",
          coinMinimalDenom: "uiris",
          coinDecimals: 6,
          coinGeckoId: "iris-network",
          coinImageUrl: "/tokens/iris.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/iris/txs/{txHash}",
    },
    {
      rpc: "https://rpc-crypto-org.keplr.app/",
      rest: "https://lcd-crypto-org.keplr.app/",
      chainId: "crypto-org-chain-mainnet-1",
      chainName: "Crypto.org",
      bip44: {
        coinType: 394,
      },
      bech32Config: Bech32Address.defaultBech32Config("cro"),
      currencies: [
        {
          coinDenom: "CRO",
          coinMinimalDenom: "basecro",
          coinDecimals: 8,
          coinGeckoId: "crypto-com-chain",
          coinImageUrl: "/tokens/cro.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/crypto-org/txs/{txHash}",
    },
    {
      rpc: "https://rpc-iov.keplr.app",
      rest: "https://lcd-iov.keplr.app",
      chainId: "iov-mainnet-ibc",
      chainName: "Starname",
      bip44: {
        coinType: 234,
      },
      bech32Config: Bech32Address.defaultBech32Config("star"),
      currencies: [
        {
          coinDenom: "IOV",
          coinMinimalDenom: "uiov",
          coinDecimals: 6,
          coinGeckoId: "starname",
          coinImageUrl: "/tokens/iov.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer"],
      explorerUrlToTx: "https://www.mintscan.io/starname/txs/{txHash}",
    },
    {
      rpc: "https://rpc-emoney.keplr.app",
      rest: "https://lcd-emoney.keplr.app",
      chainId: "emoney-3",
      chainName: "e-Money",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("emoney"),
      currencies: [
        {
          coinDenom: "NGM",
          coinMinimalDenom: "ungm",
          coinDecimals: 6,
          coinGeckoId: "e-money",
          coinImageUrl: "/tokens/ngm.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "EEUR",
          coinMinimalDenom: "eeur",
          coinDecimals: 6,
          coinGeckoId: "e-money-eur",
          coinImageUrl: "/tokens/eeur.png",
        },
      ],
      gasPriceStep: {
        low: 1,
        average: 1,
        high: 1,
      },
      features: ["stargate", "ibc-transfer"],
      explorerUrlToTx: "https://emoney.bigdipper.live/transactions/{txHash}",
    },
    {
      rpc: "https://rpc-juno.keplr.app",
      rest: "https://lcd-juno.keplr.app",
      chainId: "juno-1",
      chainName: "Juno",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("juno"),
      currencies: [
        {
          coinDenom: "JUNO",
          coinMinimalDenom: "ujuno",
          coinDecimals: 6,
          coinGeckoId: "juno-network",
          coinImageUrl: "/tokens/juno.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          type: "cw20",
          contractAddress:
            "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
          coinDenom: "NETA",
          coinMinimalDenom:
            "cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr:NETA",
          coinDecimals: 6,
          coinGeckoId: "neta",
          coinImageUrl: "/tokens/neta.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl",
          coinDenom: "MARBLE",
          coinMinimalDenom:
            "cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl:MARBLE",
          coinDecimals: 3,
          coinGeckoId: "pool:marble",
          coinImageUrl: "/tokens/marble.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
          coinDenom: "HOPE",
          coinMinimalDenom:
            "cw20:juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z:HOPE",
          coinDecimals: 6,
          coinGeckoId: "pool:hope",
          coinImageUrl: "/tokens/hope.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa",
          coinDenom: "RAC",
          coinMinimalDenom:
            "cw20:juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa:RAC",
          coinDecimals: 6,
          coinGeckoId: "pool:rac",
          coinImageUrl: "/tokens/rac.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq",
          coinDenom: "BLOCK",
          coinMinimalDenom:
            "cw20:juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq:BLOCK",
          coinDecimals: 6,
          coinGeckoId: "pool:block",
          coinImageUrl: "/tokens/block.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49",
          coinDenom: "DHK",
          coinMinimalDenom:
            "cw20:juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49:DHK",
          coinDecimals: 0,
          coinGeckoId: "pool:dhk",
          coinImageUrl: "/tokens/dhk.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g",
          coinDenom: "RAW",
          coinMinimalDenom:
            "cw20:juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g:RAW",
          coinDecimals: 6,
          coinGeckoId: "pool:raw",
          coinImageUrl: "/tokens/raw.png",
        },
        {
          type: "cw20",
          contractAddress:
            "juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w",
          coinDenom: "ASVT",
          coinMinimalDenom:
            "cw20:juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w:ASVT",
          coinDecimals: 6,
          coinGeckoId: "pool:asvt",
          coinImageUrl: "/tokens/asvt.png",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3",
          coinDenom: "JOE",
          coinMinimalDenom:
            "cw20:juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3:JOE",
          coinDecimals: 6,
          coinGeckoId: "pool:joe",
          coinImageUrl: "/tokens/joe.png",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se",
          coinDenom: "GLTO",
          coinMinimalDenom:
            "cw20:juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se:GLTO",
          coinDecimals: 6,
          coinGeckoId: "pool:glto",
          coinImageUrl: "/tokens/glto.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh",
          coinDenom: "GKEY",
          coinMinimalDenom:
            "cw20:juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh:GKEY",
          coinDecimals: 6,
          coinGeckoId: "pool:gkey",
          coinImageUrl: "/tokens/gkey.svg",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv",
          coinDenom: "SEJUNO",
          coinMinimalDenom:
            "cw20:juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv:SEJUNO",
          coinDecimals: 6,
          coinImageUrl: "/tokens/sejuno.png",
        },
        {
          type: "cw20",
          contractAddress:
            "juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3",
          coinDenom: "BJUNO",
          coinMinimalDenom:
            "cw20:juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3:BJUNO",
          coinDecimals: 6,
          coinImageUrl: "/tokens/bjuno.png",
        },
        {
          type: "cw20",
          contractAddress:
            "juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse",
          coinDenom: "SOLAR",
          coinMinimalDenom:
            "cw20:juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse:SOLAR",
          coinDecimals: 6,
          coinImageUrl: "/tokens/solar.png",
        },
        {
          type: "cw20",
          contractAddress:
            "juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf",
          coinDenom: "SEASY",
          coinMinimalDenom:
            "cw20:juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf:SEASY",
          coinDecimals: 6,
          coinImageUrl: "/tokens/seasy.svg",
        },
      ],
      features: [
        "stargate",
        "ibc-transfer",
        "ibc-go",
        "no-legacy-stdTx",
        "wasmd_0.24+",
        "cosmwasm",
      ],
      explorerUrlToTx: "https://www.mintscan.io/juno/txs/{txHash}",
    },
    {
      rpc: "https://rpc-microtick.keplr.app",
      rest: "https://lcd-microtick.keplr.app",
      chainId: "microtick-1",
      chainName: "Microtick",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("micro"),
      currencies: [
        {
          coinDenom: "TICK",
          coinMinimalDenom: "utick",
          coinDecimals: 6,
          coinGeckoId: "pool:utick",
          coinImageUrl: "/tokens/tick.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer"],
      explorerUrlToTx: "https://explorer.microtick.zone/transactions/{txHash}",
    },
    {
      rpc: "https://mainnet-node.like.co/rpc",
      rest: "https://mainnet-node.like.co",
      chainId: "likecoin-mainnet-2",
      chainName: "LikeCoin",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("like"),
      currencies: [
        {
          coinDenom: "LIKE",
          coinMinimalDenom: "nanolike",
          coinDecimals: 9,
          coinGeckoId: "likecoin",
          coinImageUrl: "/tokens/like.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://likecoin.bigdipper.live/transactions/{txHash}",
    },
    {
      rpc: "https://rpc-impacthub.keplr.app",
      rest: "https://lcd-impacthub.keplr.app",
      chainId: "impacthub-3",
      chainName: "IXO",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("ixo"),
      currencies: [
        {
          coinDenom: "IXO",
          coinMinimalDenom: "uixo",
          coinDecimals: 6,
          coinGeckoId: "pool:uixo",
          coinImageUrl: "/tokens/ixo.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer"],
      explorerUrlToTx: "https://blockscan.ixo.world/transactions/{txHash}",
    },
    {
      rpc: "https://rpc.bitcanna.io",
      rest: "https://lcd.bitcanna.io",
      chainId: "bitcanna-1",
      chainName: "BitCanna",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("bcna"),
      currencies: [
        {
          coinDenom: "BCNA",
          coinMinimalDenom: "ubcna",
          coinDecimals: 6,
          coinGeckoId: "bitcanna",
          coinImageUrl: "/tokens/bcna.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/bitcanna/txs/{txHash}",
    },
    {
      rpc: "https://rpc.explorebitsong.com",
      rest: "https://lcd.explorebitsong.com",
      chainId: "bitsong-2b",
      chainName: "BitSong",
      bip44: {
        coinType: 639,
      },
      bech32Config: Bech32Address.defaultBech32Config("bitsong"),
      currencies: [
        {
          coinDenom: "BTSG",
          coinMinimalDenom: "ubtsg",
          coinDecimals: 6,
          coinGeckoId: "pool:ubtsg",
          coinImageUrl: "/tokens/btsg.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "CLAY",
          coinMinimalDenom: "ft2D8E7041556CE93E1EFD66C07C45D551A6AAAE09",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft2D8E7041556CE93E1EFD66C07C45D551A6AAAE09.png",
        },
        {
          coinDenom: "FASANO",
          coinMinimalDenom: "ft25B30C386CDDEBD1413D5AE1180956AE9EB3B9F7",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft25B30C386CDDEBD1413D5AE1180956AE9EB3B9F7.png",
        },
        {
          coinDenom: "D9X",
          coinMinimalDenom: "ft575B10B0CEE2C164D9ED6A96313496F164A9607C",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft575B10B0CEE2C164D9ED6A96313496F164A9607C.png",
        },
        {
          coinDenom: "FONTI",
          coinMinimalDenom: "ft56664FC98A2CF5F4FBAC3566D1A11D891AD88305",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft56664FC98A2CF5F4FBAC3566D1A11D891AD88305.png",
        },
        {
          coinDenom: "BJKS",
          coinMinimalDenom: "ft52EEB0EE509AC546ED92EAC8591F731F213DDD16",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft52EEB0EE509AC546ED92EAC8591F731F213DDD16.png",
        },
        {
          coinDenom: "RWNE",
          coinMinimalDenom: "ftE4903ECC861CA45F2C2BC7EAB8255D2E6E87A33A",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ftE4903ECC861CA45F2C2BC7EAB8255D2E6E87A33A.png",
        },
        {
          coinDenom: "ENMODA",
          coinMinimalDenom: "ft85AE1716C5E39EA6D64BBD7898C3899A7B500626",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft85AE1716C5E39EA6D64BBD7898C3899A7B500626.png",
        },
        {
          coinDenom: "404DR",
          coinMinimalDenom: "ft99091610CCC66F4277C66D14AF2BC4C5EE52E27A",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft99091610CCC66F4277C66D14AF2BC4C5EE52E27A.png",
        },
        {
          coinDenom: "N43",
          coinMinimalDenom: "ft387C1C279D962ED80C09C1D592A92C4275FD7C5D",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft387C1C279D962ED80C09C1D592A92C4275FD7C5D.png",
        },
        {
          coinDenom: "LOBO",
          coinMinimalDenom: "ft24C9FA4F10B0F235F4A815B15FC774E046A2B2EB",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft24C9FA4F10B0F235F4A815B15FC774E046A2B2EB.png",
        },
        {
          coinDenom: "VIBRA",
          coinMinimalDenom: "ft7020C2A8E984EEBCBB383E91CD6FBB067BB2272B",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft7020C2A8E984EEBCBB383E91CD6FBB067BB2272B.png",
        },
        {
          coinDenom: "KARINA",
          coinMinimalDenom: "ft2DD67F5D99E9A141142B48474FA7B6B3FF00A3FE",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft2DD67F5D99E9A141142B48474FA7B6B3FF00A3FE.png",
        },
        {
          coinDenom: "TESTA",
          coinMinimalDenom: "ft4B030260D99E3ABE2B604EA2B33BAF3C085CDA12",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ft4B030260D99E3ABE2B604EA2B33BAF3C085CDA12.png",
        },
        {
          coinDenom: "CMQZ",
          coinMinimalDenom: "ftD4B6290EDEE1EC7B97AB5A1DC6C177EFD08ADCC3",
          coinDecimals: 6,
          coinImageUrl:
            "/tokens/ftD4B6290EDEE1EC7B97AB5A1DC6C177EFD08ADCC3.png",
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorebitsong.com/transactions/{txHash}",
    },
    {
      rpc: "https://rpc-mainnet.blockchain.ki",
      rest: "https://api-mainnet.blockchain.ki",
      chainId: "kichain-2",
      chainName: "Ki",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("ki"),
      currencies: [
        {
          coinDenom: "XKI",
          coinMinimalDenom: "uxki",
          coinDecimals: 6,
          coinGeckoId: "pool:uxki",
          coinImageUrl: "/tokens/xki.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          type: "cw20",
          contractAddress:
            "ki1dt3lk455ed360pna38fkhqn0p8y44qndsr77qu73ghyaz2zv4whq83mwdy",
          coinDenom: "LVN",
          coinMinimalDenom:
            "cw20:ki1dt3lk455ed360pna38fkhqn0p8y44qndsr77qu73ghyaz2zv4whq83mwdy:LVN",
          coinDecimals: 6,
          coinGeckoId: "lvn",
          coinImageUrl: "/tokens/lvn.png",
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.05,
      },
      features: [
        "stargate",
        "ibc-transfer",
        "ibc-go",
        "wasmd_0.24+",
        "cosmwasm",
      ],
      explorerUrlToTx: "https://www.mintscan.io/ki-chain/txs/{txHash}",
    },
    {
      rpc: "https://rpc.gopanacea.org",
      rest: "https://api.gopanacea.org",
      chainId: "panacea-3",
      chainName: "MediBloc",
      bip44: {
        coinType: 371,
      },
      bech32Config: Bech32Address.defaultBech32Config("panacea"),
      currencies: [
        {
          coinDenom: "MED",
          coinMinimalDenom: "umed",
          coinDecimals: 6,
          coinGeckoId: "medibloc",
          coinImageUrl: "/tokens/med.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 5,
        average: 7,
        high: 9,
      },
      features: ["stargate", "ibc-transfer"],
      explorerUrlToTx: "https://www.mintscan.io/medibloc/txs/{txHash}",
    },
    {
      rpc: "https://rpc.bostrom.cybernode.ai",
      rest: "https://lcd.bostrom.cybernode.ai",
      chainId: "bostrom",
      chainName: "Bostrom",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("bostrom"),
      currencies: [
        {
          coinDenom: "BOOT",
          coinMinimalDenom: "boot",
          coinDecimals: 0,
          coinGeckoId: "bostrom",
          coinImageUrl: "/tokens/boot.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://cyb.ai/network/bostrom/tx/{txHash}",
    },
    {
      rpc: "https://rpc.comdex.one",
      rest: "https://rest.comdex.one",
      chainId: "comdex-1",
      chainName: "Comdex",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("comdex"),
      currencies: [
        {
          coinDenom: "CMDX",
          coinMinimalDenom: "ucmdx",
          coinDecimals: 6,
          coinGeckoId: "comdex",
          coinImageUrl: "/tokens/cmdx.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/comdex/txs/{txHash}",
    },
    {
      rpc: "https://rpc.cheqd.net",
      rest: "https://api.cheqd.net",
      chainId: "cheqd-mainnet-1",
      chainName: "cheqd",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("cheqd"),
      currencies: [
        {
          coinDenom: "CHEQ",
          coinMinimalDenom: "ncheq",
          coinDecimals: 9,
          coinGeckoId: "cheqd-network",
          coinImageUrl: "/tokens/cheq.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 25,
        average: 50,
        high: 100,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://explorer.cheqd.io/transactions/{txHash}",
    },
    {
      rpc: "https://rpc.stargaze-apis.com",
      rest: "https://rest.stargaze-apis.com",
      chainId: "stargaze-1",
      chainName: "Stargaze",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("stars"),
      currencies: [
        {
          coinDenom: "STARS",
          coinMinimalDenom: "ustars",
          coinDecimals: 6,
          coinGeckoId: "pool:ustars",
          coinImageUrl: "/tokens/stars.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/stargaze/txs/{txHash}",
    },
    {
      rpc: "https://rpc.chihuahua.wtf",
      rest: "https://api.chihuahua.wtf",
      chainId: "chihuahua-1",
      chainName: "Chihuahua",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("chihuahua"),
      currencies: [
        {
          coinDenom: "HUAHUA",
          coinMinimalDenom: "uhuahua",
          coinDecimals: 6,
          coinGeckoId: "pool:uhuahua",
          coinImageUrl: "/tokens/huahua.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://ping.pub/chihuahua/tx/{txHash}",
    },
    {
      rpc: "https://node0.mainnet.lum.network/rpc",
      rest: "https://node0.mainnet.lum.network/rest",
      chainId: "lum-network-1",
      chainName: "Lum Network",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("lum"),
      currencies: [
        {
          coinDenom: "LUM",
          coinMinimalDenom: "ulum",
          coinDecimals: 6,
          coinGeckoId: "pool:ulum",
          coinImageUrl: "/tokens/lum.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/lum/txs/{txHash}",
    },
    {
      rpc: "https://mainnet-rpc.vidulum.app",
      rest: "https://mainnet-lcd.vidulum.app",
      chainId: "vidulum-1",
      chainName: "Vidulum",
      bip44: {
        coinType: 370,
      },
      bech32Config: Bech32Address.defaultBech32Config("vdl"),
      currencies: [
        {
          coinDenom: "VDL",
          coinMinimalDenom: "uvdl",
          coinDecimals: 6,
          coinGeckoId: "vidulum",
          coinImageUrl: "/tokens/vdl.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorers.vidulum.app/vidulum/tx/{txHash}",
    },
    {
      rpc: "https://rpc.mainnet.desmos.network",
      rest: "https://api.mainnet.desmos.network",
      chainId: "desmos-mainnet",
      chainName: "Desmos",
      bip44: {
        coinType: 852,
      },
      bech32Config: Bech32Address.defaultBech32Config("desmos"),
      currencies: [
        {
          coinDenom: "DSM",
          coinMinimalDenom: "udsm",
          coinDecimals: 6,
          coinGeckoId: "pool:udsm",
          coinImageUrl: "/tokens/dsm.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorer.desmos.network/transactions/{txHash}",
    },
    {
      rpc: "https://rpc-1-dig.notional.ventures",
      rest: "https://api-1-dig.notional.ventures",
      chainId: "dig-1",
      chainName: "Dig",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("dig"),
      currencies: [
        {
          coinDenom: "DIG",
          coinMinimalDenom: "udig",
          coinDecimals: 6,
          coinGeckoId: "pool:udig",
          coinImageUrl: "/tokens/dig.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.03,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://ping.pub/dig/tx/{txHash}",
    },
    {
      rpc: "https://rpc-sommelier.keplr.app",
      rest: "https://lcd-sommelier.keplr.app",
      chainId: "sommelier-3",
      chainName: "Sommelier",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("somm"),
      currencies: [
        {
          coinDenom: "SOMM",
          coinMinimalDenom: "usomm",
          coinDecimals: 6,
          coinGeckoId: "pool:usomm",
          coinImageUrl: "/tokens/somm.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://sommscan.io",
    },
    {
      rpc: "https://rpc.sifchain.finance",
      rest: "https://api-int.sifchain.finance",
      chainId: "sifchain-1",
      chainName: "Sifchain",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("sif"),
      currencies: [
        {
          coinDenom: "ROWAN",
          coinMinimalDenom: "rowan",
          coinDecimals: 18,
          coinGeckoId: "sifchain",
          coinImageUrl: "/tokens/rowan.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer"],
      explorerUrlToTx: "https://www.mintscan.io/sifchain/txs/{txHash}",
    },
    {
      rpc: "https://rpc.laozi3.bandchain.org",
      rest: "https://laozi1.bandchain.org/api",
      chainId: "laozi-mainnet",
      chainName: "BandChain",
      bip44: {
        coinType: 494,
      },
      bech32Config: Bech32Address.defaultBech32Config("band"),
      currencies: [
        {
          coinDenom: "BAND",
          coinMinimalDenom: "uband",
          coinDecimals: 6,
          coinGeckoId: "band-protocol",
          coinImageUrl: "/tokens/band.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://cosmoscan.io/tx/{txHash}",
    },
    {
      rpc: "https://node1.konstellation.tech:26657",
      rest: "https://node1.konstellation.tech:1318",
      chainId: "darchub",
      chainName: "Konstellation",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("darc"),
      currencies: [
        {
          coinDenom: "DARC",
          coinMinimalDenom: "udarc",
          coinDecimals: 6,
          coinGeckoId: "pool:udarc",
          coinImageUrl: "/tokens/darc.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/konstellation/txs/{txHash}",
    },
    {
      rpc: "https://rpc-umee.keplr.app",
      rest: "https://lcd-umee.keplr.app",
      chainId: "umee-1",
      chainName: "Umee",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("umee"),
      currencies: [
        {
          coinDenom: "UMEE",
          coinMinimalDenom: "uumee",
          coinDecimals: 6,
          coinGeckoId: "pool:uumee",
          coinImageUrl: "/tokens/umee.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://www.mintscan.io/umee/txs/{txHash}",
    },
    {
      rpc: "https://gravitychain.io:26657",
      rest: "https://gravitychain.io:1317",
      chainId: "gravity-bridge-3",
      chainName: "Gravity Bridge",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("gravity"),
      currencies: [
        {
          coinDenom: "GRAV",
          coinMinimalDenom: "ugraviton",
          coinDecimals: 6,
          coinGeckoId: "pool:ugraviton",
          coinImageUrl: "/tokens/grav.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "PSTAKE",
          coinMinimalDenom: "gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006",
          coinDecimals: 18,
          coinGeckoId: "pstake-finance",
          coinImageUrl: "/tokens/pstake.png",
        },
        {
          coinDenom: "WBTC.grv",
          coinMinimalDenom: "gravity0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          coinDecimals: 8,
          coinGeckoId: "wrapped-bitcoin",
          coinImageUrl: "/tokens/gwbtc.png",
        },
        {
          coinDenom: "WETH.grv",
          coinMinimalDenom: "gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          coinDecimals: 18,
          coinGeckoId: "ethereum",
          coinImageUrl: "/tokens/gweth.png",
        },
        {
          coinDenom: "USDC.grv",
          coinMinimalDenom: "gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          coinDecimals: 6,
          coinGeckoId: "usd-coin",
          coinImageUrl: "/tokens/gusdc.png",
          pegMechanism: "collateralized",
        },
        {
          coinDenom: "DAI.grv",
          coinMinimalDenom: "gravity0x6B175474E89094C44Da98b954EedeAC495271d0F",
          coinDecimals: 18,
          coinGeckoId: "dai",
          coinImageUrl: "/tokens/gdai.png",
          pegMechanism: "collateralized",
        },
        {
          coinDenom: "USDT.grv",
          coinMinimalDenom: "gravity0xdAC17F958D2ee523a2206206994597C13D831ec7",
          coinDecimals: 6,
          coinGeckoId: "tether",
          coinImageUrl: "/tokens/gusdt.png",
          pegMechanism: "collateralized",
        },
      ],
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/gravity-bridge/txs/{txHash}",
    },
    {
      rpc: "https://poseidon.mainnet.decentr.xyz",
      rest: "https://rest.mainnet.decentr.xyz",
      chainId: "mainnet-3",
      chainName: "Decentr",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("decentr"),
      currencies: [
        {
          coinDenom: "DEC",
          coinMinimalDenom: "udec",
          coinDecimals: 6,
          coinGeckoId: "decentr",
          coinImageUrl: "/tokens/dec.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx:
        "https://explorer.decentr.net/transactions/{txHash}?networkId=mainnet",
    },
    {
      rpc: "https://shenturpc.certikpowered.info",
      rest: "https://azuredragon.noopsbycertik.com",
      chainId: "shentu-2.2",
      chainName: "Certik",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("certik"),
      currencies: [
        {
          coinDenom: "CTK",
          coinMinimalDenom: "uctk",
          coinDecimals: 6,
          coinGeckoId: "certik",
          coinImageUrl: "/tokens/ctk.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/certik/txs/{txHash}",
    },
    {
      rpc: "https://tm-api.carbon.network",
      rest: "https://api.carbon.network",
      chainId: "carbon-1",
      chainName: "Carbon",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("swth"),
      currencies: [
        {
          coinDenom: "SWTH",
          coinMinimalDenom: "swth",
          coinDecimals: 8,
          coinGeckoId: "switcheo",
          coinImageUrl: "/tokens/swth.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 769.23077,
        average: 769.23077,
        high: 769.23077,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx:
        "https://scan.carbon.network/transaction/{txHash}?net=main",
    },
    {
      rpc: "https://public.api.injective.network",
      rest: "https://public.lcd.injective.network",
      chainId: "injective-1",
      chainName: "Injective",
      bip44: {
        coinType: 60,
      },
      bech32Config: Bech32Address.defaultBech32Config("inj"),
      currencies: [
        {
          coinDenom: "INJ",
          coinMinimalDenom: "inj",
          coinDecimals: 18,
          coinGeckoId: "injective-protocol",
          coinImageUrl: "/tokens/inj.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.0005,
        average: 0.0007,
        high: 0.0009,
      },
      features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
      explorerUrlToTx:
        "https://explorer.injective.network/transaction/{txHash}",
    },
    {
      rpc: "https://rpc.cerberus.zone:26657",
      rest: "https://api.cerberus.zone:1317",
      chainId: "cerberus-chain-1",
      chainName: "Cerberus",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("cerberus"),
      currencies: [
        {
          coinDenom: "CRBRUS",
          coinMinimalDenom: "ucrbrus",
          coinDecimals: 6,
          coinGeckoId: "cerberus-2",
          coinImageUrl: "/tokens/crbrus.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://skynetexplorers.com/Cerberus/tx/{txHash}",
    },
    {
      rpc: "https://rpc-fetchhub.fetch.ai:443",
      rest: "https://rest-fetchhub.fetch.ai",
      chainId: "fetchhub-4",
      chainName: "Fetch.ai",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("fetch"),
      currencies: [
        {
          coinDenom: "FET",
          coinMinimalDenom: "afet",
          coinDecimals: 18,
          coinGeckoId: "fetch-ai",
          coinImageUrl: "/tokens/fet.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/fetchai/txs/{txHash}",
    },
    {
      rpc: "https://rpc.assetmantle.one/",
      rest: "https://rest.assetmantle.one/",
      chainId: "mantle-1",
      chainName: "AssetMantle",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("mantle"),
      currencies: [
        {
          coinDenom: "MNTL",
          coinMinimalDenom: "umntl",
          coinDecimals: 6,
          coinGeckoId: "pool:umntl",
          coinImageUrl: "/tokens/mntl.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/asset-mantle/txs/{txHash}",
    },
    {
      rpc: "https://rpc.provenance.io/",
      rest: "https://api.provenance.io",
      chainId: "pio-mainnet-1",
      chainName: "Provenance",
      bip44: {
        coinType: 505,
      },
      bech32Config: Bech32Address.defaultBech32Config("pb"),
      currencies: [
        {
          coinDenom: "HASH",
          coinMinimalDenom: "nhash",
          coinGeckoId: "provenance-blockchain",
          coinDecimals: 9,
          coinImageUrl: "/tokens/hash.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 1905,
        average: 2100,
        high: 2500,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/provenance/txs/{txHash}",
    },
    {
      rpc: "https://rpc.galaxychain.zone",
      rest: "https://rest.galaxychain.zone",
      chainId: "galaxy-1",
      chainName: "Galaxy",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("galaxy"),
      currencies: [
        {
          coinDenom: "GLX",
          coinMinimalDenom: "uglx",
          coinDecimals: 6,
          coinGeckoId: "pool:uglx",
          coinImageUrl: "/tokens/glx.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorer.postcapitalist.io/galaxy/tx/{txHash}",
    },
    {
      rpc: "https://rpc-meme-1.meme.sx:443",
      rest: "https://api-meme-1.meme.sx:443",
      chainId: "meme-1",
      chainName: "Meme",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("meme"),
      currencies: [
        {
          coinDenom: "MEME",
          coinMinimalDenom: "umeme",
          coinDecimals: 6,
          coinGeckoId: "pool:umeme",
          coinImageUrl: "/tokens/meme.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorer.meme.sx/meme/tx/{txHash}",
    },
    {
      rpc: "https://rpc-evmos.keplr.app/",
      rest: "https://lcd-evmos.keplr.app/",
      chainId: "evmos_9001-2",
      chainName: "Evmos",
      bip44: {
        coinType: 60,
      },
      bech32Config: Bech32Address.defaultBech32Config("evmos"),
      currencies: [
        {
          coinDenom: "EVMOS",
          coinMinimalDenom: "aevmos",
          coinDecimals: 18,
          coinGeckoId: "evmos",
          coinImageUrl: "/tokens/evmos.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 10000000000,
        average: 25000000000,
        high: 40000000000,
      },
      features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
      explorerUrlToTx: "https://www.mintscan.io/evmos/txs/{txHash}",
    },
    {
      rpc: "https://rpc.terrav2.ccvalidators.com/",
      rest: "https://phoenix-lcd.terra.dev/",
      chainId: "phoenix-1",
      chainName: "Terra 2.0",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("terra"),
      currencies: [
        {
          coinDenom: "LUNA",
          coinMinimalDenom: "uluna",
          coinDecimals: 6,
          coinGeckoId: "terra-luna-2",
          coinImageUrl: "/tokens/luna.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.15,
        average: 0.2,
        high: 0.25,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
      explorerUrlToTx: "https://finder.terra.money/phoenix-1/tx/{txHash}",
    },
    {
      rpc: "https://rpcapi.rizon.world/",
      rest: "https://restapi.rizon.world/",
      chainId: "titan-1",
      chainName: "Rizon",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("rizon"),
      currencies: [
        {
          coinDenom: "ATOLO",
          coinMinimalDenom: "uatolo",
          coinDecimals: 6,
          coinGeckoId: "rizon",
          coinImageUrl: "/tokens/atolo.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.025,
        high: 0.035,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/rizon/txs/{txHash}",
    },
    {
      rpc: "https://rpc-kava.keplr.app",
      rest: "https://lcd-kava.keplr.app",
      chainId: "kava_2222-10",
      chainName: "Kava",
      bip44: {
        coinType: 459,
      },
      bech32Config: Bech32Address.defaultBech32Config("kava"),
      currencies: [
        {
          coinDenom: "KAVA",
          coinMinimalDenom: "ukava",
          coinDecimals: 6,
          coinGeckoId: "kava",
          coinImageUrl: "/tokens/kava.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "HARD",
          coinMinimalDenom: "hard",
          coinDecimals: 6,
          coinGeckoId: "kava-lend",
          coinImageUrl: "/tokens/hard.svg",
        },
        {
          coinDenom: "SWP",
          coinMinimalDenom: "swp",
          coinDecimals: 6,
          coinGeckoId: "kava-swap",
          coinImageUrl: "/tokens/swp.svg",
        },
        {
          coinDenom: "USDX",
          coinMinimalDenom: "usdx",
          coinDecimals: 6,
          coinGeckoId: "usdx",
          coinImageUrl: "/tokens/usdx.png",
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/kava/txs/{txHash}",
    },
    {
      rpc: "https://26657.genesisl1.org",
      rest: "https://api.genesisl1.org",
      chainId: "genesis_29-2",
      chainName: "GenesisL1",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("genesis"),
      currencies: [
        {
          coinDenom: "L1",
          coinMinimalDenom: "el1",
          coinDecimals: 18,
          //coinGeckoId: "pool:el1",
          coinImageUrl: "/tokens/l1.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 999999999,
        average: 1000000000,
        high: 1000000001,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://ping.pub/genesisL1/tx/{txHash}",
    },
    {
      rpc: "https://rpc.kaiyo.kujira.setten.io",
      rest: "https://lcd.kaiyo.kujira.setten.io",
      chainId: "kaiyo-1",
      chainName: "Kujira",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("kujira"),
      currencies: [
        {
          coinDenom: "KUJI",
          coinMinimalDenom: "ukuji",
          coinDecimals: 6,
          coinGeckoId: "kujira",
          coinImageUrl: "/tokens/kuji.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://finder.kujira.app/kaiyo-1/tx/{txHash}",
    },
    {
      rpc: "https://rpc.mainnet-1.tgrade.confio.run",
      rest: "https://api.mainnet-1.tgrade.confio.run",
      chainId: "tgrade-mainnet-1",
      chainName: "Tgrade",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("tgrade"),
      currencies: [
        {
          coinDenom: "TGD",
          coinMinimalDenom: "utgd",
          coinDecimals: 6,
          coinGeckoId: "pool:utgd",
          coinImageUrl: "/tokens/tgrade.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.05,
        average: 0.075,
        high: 0.1,
      },
      features: [
        "stargate",
        "ibc-transfer",
        "ibc-go",
        "no-legacy-stdTx",
        "wasmd_0.24+",
        "cosmwasm",
      ],
      explorerUrlToTx: "https://tgrade.aneka.io/txs/{txHash}",
    },
    {
      rpc: "https://rpc-echelon.whispernode.com/",
      rest: "https://lcd-echelon.whispernode.com/",
      chainId: "echelon_3000-3",
      chainName: "Echelon",
      bip44: {
        coinType: 60,
      },
      bech32Config: Bech32Address.defaultBech32Config("echelon"),
      currencies: [
        {
          coinDenom: "ECH",
          coinMinimalDenom: "aechelon",
          coinDecimals: 18,
          coinGeckoId: "echelon",
          coinImageUrl: "/tokens/ech.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 10000000000,
        average: 25000000000,
        high: 40000000000,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://ping.pub/echelon/tx/{txHash}",
    },
    {
      rpc: "https://node.odin-freya-website.odinprotocol.io/mainnet/a/",
      rest: "https://node.odin-freya-website.odinprotocol.io/mainnet/a/api/",
      chainId: "odin-mainnet-freya",
      chainName: "Odin",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("odin"),
      currencies: [
        {
          coinDenom: "ODIN",
          coinMinimalDenom: "loki",
          coinDecimals: 6,
          coinGeckoId: "pool:odin",
          coinImageUrl: "/tokens/odin.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "GEO",
          coinMinimalDenom: "mGeo",
          coinDecimals: 6,
          coinGeckoId: "pool:geo",
          coinImageUrl: "/tokens/geo.svg",
        },
        {
          coinDenom: "O9W",
          coinMinimalDenom: "mO9W",
          coinDecimals: 6,
          coinGeckoId: "pool:o9w",
          coinImageUrl: "/tokens/o9w.svg",
        },
      ],
      gasPriceStep: {
        low: 0.025,
        average: 0.05,
        high: 0.06,
      },
      features: [
        "stargate",
        "ibc-transfer",
        "ibc-go",
        "no-legacy-stdTx",
        "wasmd_0.24+",
        "cosmwasm",
      ],
      explorerUrlToTx: "https://scan.odinprotocol.io/transactions/{txHash}",
    },
    {
      rpc: "https://mainnet.crescent.network:26657",
      rest: "https://mainnet.crescent.network:1317",
      chainId: "crescent-1",
      chainName: "Crescent",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("cre"),
      currencies: [
        {
          coinDenom: "CRE",
          coinMinimalDenom: "ucre",
          coinDecimals: 6,
          coinGeckoId: "pool:ucre",
          coinImageUrl: "/tokens/cre.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.01,
        average: 0.02,
        high: 0.1,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://www.mintscan.io/crescent/txs/{txHash}",
    },
    {
      rpc: "https://rpc.helios-1.lumenex.io",
      rest: "https://api.helios-1.lumenex.io",
      chainId: "LumenX",
      chainName: "LumenX",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("lumen"),
      currencies: [
        {
          coinDenom: "LUMEN",
          coinMinimalDenom: "ulumen",
          coinDecimals: 6,
          coinImageUrl: "/tokens/lumen.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://scope.helios-1.lumenex.io/lumenx/tx/{txHash}",
    },
    {
      rpc: "https://rpc.orai.io",
      rest: "https://lcd.orai.io",
      chainId: "Oraichain",
      chainName: "Oraichain",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("orai"),
      currencies: [
        {
          coinDenom: "ORAI",
          coinMinimalDenom: "orai",
          coinDecimals: 6,
          coinGeckoId: "oraichain-token",
          coinImageUrl: "/tokens/orai.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 0,
        average: 0.00025,
        high: 0.0004,
      },
      features: ["stargate", "ibc-transfer", "cosmwasm"],
      explorerUrlToTx: "https://scan.orai.io/txs/{txHash}",
    },
    {
      rpc: "https://rpc.cudos.org",
      rest: "https://rest.cudos.org",
      chainId: "cudos-1",
      chainName: "Cudos",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("cudos"),
      currencies: [
        {
          coinDenom: "CUDOS",
          coinMinimalDenom: "acudos",
          coinDecimals: 18,
          coinGeckoId: "cudos",
          coinImageUrl: "/tokens/cudos.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
      ],
      gasPriceStep: {
        low: 5000000000000,
        average: 10000000000000,
        high: 20000000000000,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorer.cudos.org/transactions/{txHash}",
    },
    {
      rpc: "https://main.rpc.agoric.net",
      rest: "https://main.api.agoric.net",
      chainId: "agoric-3",
      chainName: "Agoric",
      bip44: {
        coinType: 564,
      },
      bech32Config: Bech32Address.defaultBech32Config("agoric"),
      currencies: [
        {
          coinDenom: "BLD",
          coinMinimalDenom: "ubld",
          coinDecimals: 6,
          coinGeckoId: "agoric",
          coinImageUrl: "/tokens/bld.png",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "IST",
          coinMinimalDenom: "uist",
          coinDecimals: 6,
          // coinGeckoId: "cudos",
          coinImageUrl: "/tokens/ist.png",
        },
      ],
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://agoric.bigdipper.live/transactions/{txHash}",
    },
    {
      rpc: "https://stride-rpc.polkachu.com/",
      rest: "https://stride-api.polkachu.com/",
      chainId: "stride-1",
      chainName: "Stride",
      bip44: {
        coinType: 118,
      },
      bech32Config: Bech32Address.defaultBech32Config("stride"),
      currencies: [
        {
          coinDenom: "STRD",
          coinMinimalDenom: "ustrd",
          coinDecimals: 6,
          coinGeckoId: "pool:ustrd",
          coinImageUrl: "/tokens/strd.svg",
          isStakeCurrency: true,
          isFeeCurrency: true,
        },
        {
          coinDenom: "stATOM",
          coinMinimalDenom: "stuatom",
          coinDecimals: 6,
          coinGeckoId: "pool:stuatom",
          coinImageUrl: "/tokens/statom.svg",
        },
        {
          coinDenom: "stOSMO",
          coinMinimalDenom: "stuosmo",
          coinDecimals: 6,
          // coinGeckoId: "osmosis",
          coinImageUrl: "/tokens/stosmo.svg",
        },
        {
          coinDenom: "stJUNO",
          coinMinimalDenom: "stujuno",
          coinDecimals: 6,
          // coinGeckoId: "juno-network",
          coinImageUrl: "/tokens/stjuno.svg",
        },
        {
          coinDenom: "stSCRT",
          coinMinimalDenom: "stuscrt",
          coinDecimals: 6,
          // coinGeckoId: "secret",
          coinImageUrl: "/tokens/stscrt.svg",
        },
      ],
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.04,
      },
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
      explorerUrlToTx: "https://explorer.stride.zone/stride/tx/{txHash}",
    },
  ] as SimplifiedChainInfo[]
).map(createKeplrChainInfos);

// Add normal chain infos in case of `currencies` not containing the stake or fee currency.
chainInfos.push({
  rpc: IS_TESTNET
    ? "https://axelartest-rpc.quickapi.com/"
    : "https://rpc-axelar.keplr.app", // source: https://docs.axelar.dev/resources
  rest: IS_TESTNET
    ? "https://axelartest-lcd.quickapi.com/"
    : "https://lcd-axelar.keplr.app",
  chainId: IS_TESTNET ? "axelar-testnet-lisbon-3" : "axelar-dojo-1",
  chainName: "Axelar",
  stakeCurrency: {
    coinDenom: "AXL",
    coinMinimalDenom: "uaxl",
    coinDecimals: 6,
    // coinGeckoId: 'pool:uaxl',
    coinImageUrl: "/tokens/axl.svg",
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("axelar"),
  currencies: [
    {
      coinDenom: IS_TESTNET ? "aUSDC" : "USDC",
      coinMinimalDenom: IS_TESTNET ? "uausdc" : "uusdc",
      coinDecimals: 6,
      coinGeckoId: "usd-coin",
      coinImageUrl: "/tokens/usdc.svg",
      pegMechanism: "collateralized",
    },
    {
      coinDenom: "FRAX",
      coinMinimalDenom: "frax-wei",
      coinDecimals: 18,
      coinGeckoId: "frax",
      coinImageUrl: "/tokens/frax.svg",
      pegMechanism: "hybrid",
    },
    {
      coinDenom: "USDT",
      coinMinimalDenom: "uusdt",
      coinDecimals: 6,
      coinGeckoId: "tether",
      coinImageUrl: "/tokens/usdt.svg",
      pegMechanism: "collateralized",
    },
    {
      coinDenom: "DAI",
      coinMinimalDenom: "dai-wei",
      coinDecimals: 18,
      coinGeckoId: "dai",
      coinImageUrl: "/tokens/dai.svg",
      pegMechanism: "collateralized",
    },
    {
      coinDenom: "WETH",
      coinMinimalDenom: "weth-wei",
      coinDecimals: 18,
      coinGeckoId: "weth",
      coinImageUrl: "/tokens/weth.png",
    },
    {
      coinDenom: "WBTC",
      coinMinimalDenom: "wbtc-satoshi",
      coinDecimals: 8,
      coinGeckoId: "wrapped-bitcoin",
      coinImageUrl: "/tokens/wbtc.png",
    },
    {
      coinDenom: "LINK",
      coinMinimalDenom: "link-wei",
      coinDecimals: 18,
      coinGeckoId: "chainlink",
      coinImageUrl: "/tokens/link.svg",
    },
    {
      coinDenom: "AAVE",
      coinMinimalDenom: "aave-wei",
      coinDecimals: 18,
      coinGeckoId: "aave",
      coinImageUrl: "/tokens/aave.svg",
    },
    {
      coinDenom: "APE",
      coinMinimalDenom: "ape-wei",
      coinDecimals: 18,
      coinGeckoId: "apecoin",
      coinImageUrl: "/tokens/ape.svg",
    },
    {
      coinDenom: "AXS",
      coinMinimalDenom: "axs-wei",
      coinDecimals: 18,
      coinGeckoId: "axie-infinity",
      coinImageUrl: "/tokens/axs.svg",
    },
    {
      coinDenom: "MKR",
      coinMinimalDenom: "mkr-wei",
      coinDecimals: 18,
      coinGeckoId: "maker",
      coinImageUrl: "/tokens/mkr.svg",
    },
    {
      coinDenom: "RAI",
      coinMinimalDenom: "rai-wei",
      coinDecimals: 18,
      coinGeckoId: "rai",
      coinImageUrl: "/tokens/rai.svg",
    },
    {
      coinDenom: "SHIB",
      coinMinimalDenom: "shib-wei",
      coinDecimals: 18,
      coinGeckoId: "shiba-inu",
      coinImageUrl: "/tokens/shib.svg",
    },
    {
      coinDenom: "stETH",
      coinMinimalDenom: "steth-wei",
      coinDecimals: 18,
      coinGeckoId: "staked-ether",
      coinImageUrl: "/tokens/steth.svg",
    },
    {
      coinDenom: "UNI",
      coinMinimalDenom: "uni-wei",
      coinDecimals: 18,
      coinGeckoId: "uniswap",
      coinImageUrl: "/tokens/uni.svg",
    },
    {
      coinDenom: "XCN",
      coinMinimalDenom: "xcn-wei",
      coinDecimals: 18,
      coinGeckoId: "chain-2",
      coinImageUrl: "/tokens/xcn.svg",
    },
    {
      coinDenom: "WGLMR",
      coinMinimalDenom: "wglmr-wei",
      coinDecimals: 18,
      coinGeckoId: "wrapped-moonbeam",
      coinImageUrl: "/tokens/glmr.svg",
    },
    {
      coinDenom: "DOT",
      coinMinimalDenom: "dot-planck",
      coinDecimals: 10,
      coinGeckoId: "polkadot",
      coinImageUrl: "/tokens/dot.svg",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "AXL",
      coinMinimalDenom: "uaxl",
      coinDecimals: 6,
      // coinGeckoId: 'pool:uaxl',
      coinImageUrl: "/tokens/axl.svg",
    },
  ],
  gasPriceStep: {
    low: 0.00005,
    average: 0.00007,
    high: 0.00009,
  },
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
  explorerUrlToTx: IS_TESTNET
    ? "https://testnet.axelarscan.io/tx/{txHash}"
    : "https://axelarscan.io/tx/{txHash}",
});

export const ChainInfos: ChainInfoWithExplorer[] = chainInfos;
