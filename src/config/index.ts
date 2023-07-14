import { ACCESS_NODE_URLS } from '../constants';

const env = process.env;

const config = () => {
  // App
  const port = env.NODE_PORT;
  const environment = env.NODE_ENV; // dev | prod
  const googleClientID = env.GOOGLE_CLIENT_ID;
  const googleClientSecret = env.GOOGLE_CLIENT_SECRET;
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
  const flowNetwork = env.FLOW_NETWORK ?? 'local';
  const accessAPI = ACCESS_NODE_URLS[flowNetwork];

  // Contracts - Standard
  const fungibleTokenAddress = env.FUNGIBLE_TOKEN_ADDRESS;
  
  const flowTokenAddress = env.FLOW_TOKEN_ADDRESS;
  
  const linkedAccountMetadataViewsAddress = env.LINKED_ACCOUNT_METADATA_VIEWS_ADDRESS;
  const linkedAccountsAddress = env.LINKED_ACCOUNTS_ADDRESS;
  const accountCreatorAddress = env.ACCOUNT_CREATOR_ADDRESS;


  const metadataViewsAddressTestnet = env.METADATA_VIEWS_ADDRESS_TESTNET;
  const nftCatalogAddressTestnet = env.NFT_CATALOG_ADDRESS_TESTNET;
  const nonFungibleTokenAddressTestnet = env.NON_FUNGIBLE_TOKEN_ADDRESS_TESTNET;

  const metadataViewsAddressMainnet = env.METADATA_VIEWS_ADDRESS_MAINNET;
  const nftCatalogAddressMainnet = env.NFT_CATALOG_ADDRESS_MAINNET;
  const nonFungibleTokenAddressMainnet = env.NON_FUNGIBLE_TOKEN_ADDRESS_MAINNET;

  return {
    // App
    port,
    environment,
    googleClientID,
    googleClientSecret,
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
      nonFungibleTokenAddress: nonFungibleTokenAddressTestnet
    }, 

    mainnet: {
      nftCatalogAddress: nftCatalogAddressMainnet,
      metadataViewsAddress: metadataViewsAddressMainnet,
      nonFungibleTokenAddress: nonFungibleTokenAddressMainnet
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

export default config;
