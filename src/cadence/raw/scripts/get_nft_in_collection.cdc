import NonFungibleToken from 0xNonFungibleToken

pub fun main(): &NonFungibleToken.NFT {
    let account = getAccount(0x99bd48c8036e2876)

    let collectionRef = account
        .getCapability(/public/FLOATCollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection at specified path")

    let ids = collectionRef.getIDs()
 
    for id in ids {

    }
    let nft = collectionRef.borrowNFT(id: ids[0])
 
    return nft
}