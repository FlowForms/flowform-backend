"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const env = process.env;
const config = () => {
    var _a;
    // App
    const port = env.NODE_PORT;
    const environment = env.NODE_ENV; // dev | prod
    const googleClientID = env.GOOGLE_CLIENT_ID;
    const googleClientSecret = env.GOOGLE_CLIENT_SECRET;
    const twitterClientID = env.TWITTER_CLIENT_ID;
    const twitterClientSecret = env.TWITTER_CLIENT_SECRET;
    const twitterCallbackURL = env.TWITTER_CALLBACK_URL;
    const frontendURL = env.FRONTEND_URL;
    const cookieSecret = env.COOKIE_SECRET;
    // Admin
    const adminKeyIndex = env.ADMIN_KEY_INDEX;
    const adminAddress = env.ADMIN_ADDRESS;
    const adminPrivateKeyHex = env.ADMIN_PRIVATE_KEY_HEX;
    // Redis
    const redisURL = env.REDIS_URL;
    const keyTTL = env.KEY_TTL;
    // Flow
    const flowNetwork = (_a = env.FLOW_NETWORK) !== null && _a !== void 0 ? _a : 'local';
    const accessAPI = constants_1.ACCESS_NODE_URLS[flowNetwork];
    // Contracts - Standard
    const fungibleTokenAddress = env.FUNGIBLE_TOKEN_ADDRESS;
    const flowTokenAddress = env.FLOW_TOKEN_ADDRESS;
    const linkedAccountMetadataViewsAddress = env.LINKED_ACCOUNT_METADATA_VIEWS_ADDRESS;
    const linkedAccountsAddress = env.LINKED_ACCOUNTS_ADDRESS;
    const accountCreatorAddress = env.ACCOUNT_CREATOR_ADDRESS;
    const metadataViewsAddressTestnet = env.METADATA_VIEWS_ADDRESS_TESTNET;
    const nftCatalogAddressTestnet = env.NFT_CATALOG_ADDRESS_TESTNET;
    const nonFungibleTokenAddressTestnet = env.NON_FUNGIBLE_TOKEN_ADDRESS_TESTNET;
    const findProfileTestnet = env.PROFILE_TESTNET;
    const findTestnet = env.FIND_TESTNET;
    const metadataViewsAddressMainnet = env.METADATA_VIEWS_ADDRESS_MAINNET;
    const nftCatalogAddressMainnet = env.NFT_CATALOG_ADDRESS_MAINNET;
    const nonFungibleTokenAddressMainnet = env.NON_FUNGIBLE_TOKEN_ADDRESS_MAINNET;
    const findProfileMainnet = env.PROFILE_MAINNET;
    const findMainnet = env.FIND_MAINNET;
    return {
        // App
        port,
        environment,
        googleClientID,
        googleClientSecret,
        twitterClientID,
        twitterClientSecret,
        twitterCallbackURL,
        frontendURL,
        cookieSecret,
        // Admin
        adminKeyIndex,
        adminAddress,
        adminPrivateKeyHex,
        // Redis
        redisURL,
        keyTTL,
        // Flow
        flowNetwork,
        accessAPI,
        testnet: {
            nftCatalogAddress: nftCatalogAddressTestnet,
            metadataViewsAddress: metadataViewsAddressTestnet,
            nonFungibleTokenAddress: nonFungibleTokenAddressTestnet,
            findProfileAddress: findProfileTestnet,
            findAddress: findTestnet
        },
        mainnet: {
            nftCatalogAddress: nftCatalogAddressMainnet,
            metadataViewsAddress: metadataViewsAddressMainnet,
            nonFungibleTokenAddress: nonFungibleTokenAddressMainnet,
            findProfileAddress: findProfileMainnet,
            findAddress: findMainnet
        }
        // Contracts - Standard
        // fungibleTokenAddress,
        // nonFungibleTokenAddress,
        // flowTokenAddress,
        // metadataViewsAddress,
        // linkedAccountMetadataViewsAddress,
        // linkedAccountsAddress,
        // accountCreatorAddress
    };
};
exports.default = config;
//# sourceMappingURL=index.js.map