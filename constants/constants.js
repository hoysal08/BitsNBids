export const METAMASK_NOT_INSTALLED = "METAMASK_NOT_INSTALLED";
export const CHAINID_NOT_SUPPORTED = "CHAINID_NOT_SUPPORTED";
export const NFT_CALL_FAILED = "NFT_CALL_FAILED";


//NFT 
export const ERC_721 = "ERC721";


//Fraction Count
export const MAX_FRACTION_COUNT = 10000;

//Opensea Details
export const OPENSEA_LINK = "https://testnets.opensea.io/assets/mumbai/"
export const MUMBAI_CONTRACT_BASE_URL = "0xd4B71e9D524FB4925c8C3044b45f5FdABbad976e"

//File Types
export const FILE_TYPES = ["JPG", "PNG", "GIF"];

// //Social Media Handles
// export const TWITTER_LINK = "https://twitter.com/tryscatterxyz?s=11&t=hyIpfRdZV0OGHvouJEFPIg";
// export const DISCORD_LINK = "";
// export const GITHUB_LINK = "https://github.com/Scatter-xyz";

//Social Media Handles
export const TWITTER_LINK = "";
export const DISCORD_LINK = "";
export const GITHUB_LINK = "";

//Supported Chains
export const SUPPORTED_CHAINS = [
    {
        name: "Ethereum",
        chainName: 'Kovan Testnet',
        chainId: 42,
        image: "/ethereum-eth-logo.png",
        marketplace: "https://testnets.opensea.io/assets/kovan/",
        blockExplorer: "https://kovan.etherscan.io", 
        fractionContract: "0x04fd8C06965797196580dB762D6b573A3beAa75E",
        faucetContract: "0x75BA31F251b9dd1230a19631F1902f918b1CFF3B",
        mintContract: "",
        rpcUrls: ["https://kovan.infura.io/v3/"],
        nativeCurrency: {
            name: "KovanETH",
            symbol: "KovanETH",
            decimals: 18
        },
        nftInfraURL: "https://kovan.infura.io/v3/612e385d32c94736afcd45df07c3a44c",
        active: false
    },
    {
        name: "Polygon",
        chainName: 'Polygon Mumbai Testnet',
        chainId: 80001,
        image: "/polygon-matic-logo.png",
        marketplace: "https://testnets.opensea.io/assets/mumbai/",
        blockExplorer: "https://mumbai.polygonscan.com/address/",
        fractionContract: "0xd4B71e9D524FB4925c8C3044b45f5FdABbad976e",
        faucetContract: "0x7fF62C41a99DcF968395cC47eAa5014efD9b3A4b",
        mintContract: "0x6150C74d3035E74954D1e138817eF079316Caa8E",
        rpcUrls: ["https://polygon-testnet.public.blastapi.io", "https://rpc-mumbai.maticvigil.com/", "https://rpc.ankr.com/polygon_mumbai"],
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        nftInfraURL:"https://polygon-mumbai.g.alchemy.com/v2/l0jLil9DtS2WsAcK8r9_bq7GBNrWHTFk/",
        active: true
    },
    {
        name: "Celo",
        chainName: 'Polygon Mumbai Testnet',
        chainId: 62320,
        image: "/celo-celo-logo.png",
        marketplace: "https://testnets.opensea.io/assets/mumbai/",
        blockExplorer: "https://baklava-blockscout.celo-testnet.org/",
        fractionContract: "0xd4B71e9D524FB4925c8C3044b45f5FdABbad976e",
        faucetContract: "0x7fF62C41a99DcF968395cC47eAa5014efD9b3A4b",
        mintContract: "",
        rpcUrls: ["https://baklava-forno.celo-testnet.org"],
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        active: false
    },
    {
        name: "Aurora",
        chainName: 'Aurora Testnet',
        chainId: 1313161555,
        image: "/aurora-stack-rev.png",
        marketplace: "https://testnets.opensea.io/assets/mumbai/",
        blockExplorer: "https://testnet.aurorascan.dev",
        fractionContract: "0xd4B71e9D524FB4925c8C3044b45f5FdABbad976e",
        faucetContract: "0x7fF62C41a99DcF968395cC47eAa5014efD9b3A4b",
        mintContract: "",
        rpcUrls: ["https://testnet.aurora.dev/"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
        },
        active: false
    }
];