import { readFileSync } from "fs";
import { join } from "path";
export const read = (path: string): string => {
  return readFileSync(join(__dirname, path), "utf8");
};

const GET_ALL_COLLECTIONS_FROM_CATALOG = read("./scripts/get_all_collections_from_catalog.cdc");
const GET_DEPLOYED_CONTRACTS = read("./scripts/get_deployed_contracts.cdc");
const GET_NFT_IN_COLLECTION = read("./scripts/get_nft_in_collection.cdc");
const GET_FIND_PROFILE = read("./scripts/get_find_profile.cdc");

export {
    GET_ALL_COLLECTIONS_FROM_CATALOG,
    GET_DEPLOYED_CONTRACTS,
    GET_NFT_IN_COLLECTION,
    GET_FIND_PROFILE
};
