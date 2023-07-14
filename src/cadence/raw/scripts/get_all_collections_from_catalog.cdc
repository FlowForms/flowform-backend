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

