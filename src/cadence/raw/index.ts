import config from "../../config";
import * as txcodes from "./txcodes";
import * as scriptCodes from "./scriptcodes";

export enum TransactionName {
  // SAMPLE NAME
  CREATE_TWEET = "CREATE_TWEET"
}

export enum ScriptName {
  GET_ALL_COLLECTIONS_FROM_CATALOG = "GET_ALL_COLLECTIONS_FROM_CATALOG",
  GET_DEPLOYED_CONTRACTS = "GET_DEPLOYED_CONTRACTS",
  GET_NFT_IN_COLLECTION = "GET_NFT_IN_COLLECTION",
}

export const getTransaction = (name: TransactionName): string | ((path: string) => string) => {
  const code = Object.values(txcodes).find(
    (value) => Object.keys(txcodes)[Object.values(txcodes).indexOf(value)] === name,
  );
  if (!code) {
    throw new Error(`Transaction code not found for ${name}`);
  }
  return code;
};

export const getScript = (name: ScriptName): string | ((path: string) => string) => {
  const code = Object.values(scriptCodes).find(
    (value) => Object.keys(scriptCodes)[Object.values(scriptCodes).indexOf(value)] === name,
  );
  if (!code) {
    throw new Error(`Transaction code not found for ${name}`);
  }
  return code;
}


export const getContractAddresses = () => {
  const testnetMap =  {
    NFTCatalog: config().testnet.nftCatalogAddress,
    MetadataViews: config().testnet.metadataViewsAddress,
    NonFungibleToken: config().testnet.nonFungibleTokenAddress
  };

  const mainnetMap = {
    NFTCatalog: config().mainnet.nftCatalogAddress,
    MetadataViews: config().mainnet.metadataViewsAddress,
    NonFungibleToken: config().mainnet.nonFungibleTokenAddress
  };

  if (config().flowNetwork == "testnet") return testnetMap
  else return mainnetMap
};
