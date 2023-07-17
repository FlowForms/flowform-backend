"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_FIND_PROFILE = exports.GET_NFT_IN_COLLECTION = exports.GET_DEPLOYED_CONTRACTS = exports.GET_ALL_COLLECTIONS_FROM_CATALOG = exports.read = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const read = (path) => {
    return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, path), "utf8");
};
exports.read = read;
//const GET_ALL_COLLECTIONS_FROM_CATALOG = read("./scripts/get_all_collections_from_catalog.cdc");
//const GET_DEPLOYED_CONTRACTS = read("./scripts/get_deployed_contracts.cdc");
//const GET_NFT_IN_COLLECTION = read("./scripts/get_nft_in_collection.cdc");
//const GET_FIND_PROFILE = read("./scripts/get_find_profile.cdc");
const GET_ALL_COLLECTIONS_FROM_CATALOG = `
import NFTCatalog from 0xNFTCatalog
import MetadataViews from 0xMetadataViews

pub struct NFTCatalogMetadata {
    pub let catalogKey: String
    pub let contractName : String
    pub let contractAddress : Address
    pub let storagePath : StoragePath
    pub let publicPath : PublicPath
    pub let privatePath: PrivatePath
    pub let collectionData: MetadataViews.NFTCollectionDisplay

    init(
        catalogKey: String,
        contractName : String,
        contractAddress : Address,
        storagePath : StoragePath,
        publicPath : PublicPath,
        privatePath: PrivatePath,
        collectionData: MetadataViews.NFTCollectionDisplay
    ) {
        self.catalogKey = catalogKey
        self.contractName = contractName
        self.contractAddress = contractAddress
        self.storagePath = storagePath
        self.publicPath = publicPath
        self.privatePath = privatePath
        self.collectionData = collectionData
    }
}

pub fun main(): [NFTCatalogMetadata] {
    let catalogKeys = NFTCatalog.getCatalogKeys();
    let items: [NFTCatalogMetadata] = [];
    for key in catalogKeys {
        let value = NFTCatalog.getCatalogEntry(collectionIdentifier: key)!
        let data = NFTCatalogMetadata(
            catalogKey: key,
            contractName: value.contractName,
            contractAddress: value.contractAddress,
            storagePath: value.collectionData.storagePath,
            publicPath : value.collectionData.publicPath,
            privatePath: value.collectionData.privatePath,
            collectionData: value.collectionDisplay
        )
        items.append(data)
    }

    return items
}
`;
exports.GET_ALL_COLLECTIONS_FROM_CATALOG = GET_ALL_COLLECTIONS_FROM_CATALOG;
const GET_DEPLOYED_CONTRACTS = `
pub fun main(address: Address): PublicAccount.Contracts {
  let account = getAccount(address)
  return account.contracts
}
`;
exports.GET_DEPLOYED_CONTRACTS = GET_DEPLOYED_CONTRACTS;
const GET_NFT_IN_COLLECTION = `
import NonFungibleToken from 0xNonFungibleToken
import MetadataViews from 0xMetadataViews

pub struct NFTMetadata {
    pub let id: UInt64
    pub let name: String?
    pub let description: String?
    pub let thumbnail: String?

    init(id: UInt64, name: String?, description: String?, thumbnail: String?) {
        self.id = id
        self.name = name
        self.description = description
        self.thumbnail = thumbnail
    }
}

pub fun main(address: Address, path: String): [NFTMetadata] {
    let account = getAccount(address)
    let data : [NFTMetadata] = []
    let publicPath = PublicPath(identifier: path)!

    let collectionRef = account
        .getCapability(publicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        
    if collectionRef == nil {
        return data
    }

    let viewsRef = account
        .getCapability(publicPath)
        .borrow<&{MetadataViews.ResolverCollection}>()

    let ids = collectionRef!.getIDs()

    for id in ids {
        if viewsRef != nil {
            let nft = viewsRef!.borrowViewResolver(id: id)
            let display = MetadataViews.getDisplay(nft)
            let nftData = NFTMetadata(id: id, name: display?.name, description: display?.description, thumbnail: display?.thumbnail?.uri())
            data.append(nftData)
        } else {
            data.append(NFTMetadata(id: id, name: nil, description: nil, thumbnail: nil))
        }
    }

    return data
}
`;
exports.GET_NFT_IN_COLLECTION = GET_NFT_IN_COLLECTION;
const GET_FIND_PROFILE = `
import Profile from 0xProfile
import FIND from 0xFIND

pub fun main(address: Address) : Profile.UserReport? {
	let account = getAccount(address)
	if account.balance == 0.0 {
        log("Zero balance profile return")
		return nil
	}

	var profileReport = account
		.getCapability<&{Profile.Public}>(Profile.publicPath)
		.borrow()?.asReport()

	if profileReport != nil && profileReport!.findName != FIND.reverseLookup(address) {
		profileReport = Profile.UserReport(
			findName: "",
			address: profileReport!.address,
			name: profileReport!.name,
			gender: profileReport!.gender,
			description: profileReport!.description,
			tags: profileReport!.tags,
			avatar: profileReport!.avatar,
			links: profileReport!.links,
			wallets: profileReport!.wallets, 
			following: profileReport!.following,
			followers: profileReport!.followers,
			allowStoringFollowers: profileReport!.allowStoringFollowers,
			createdAt: profileReport!.createdAt
		)
	}

	return profileReport
}
 
`;
exports.GET_FIND_PROFILE = GET_FIND_PROFILE;
//# sourceMappingURL=scriptcodes.js.map