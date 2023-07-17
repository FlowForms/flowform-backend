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