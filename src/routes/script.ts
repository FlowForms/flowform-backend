import express, { Request, Response } from 'express';
import { getAllCollectionsFromCatalog, getDeployedContracts, getNftInCollection } from '../cadence';

const router = express.Router();

router.get('/getCollections', async function (req: Request, res: Response, next: any) {
    const collectionName = req.query.key
    const allCollections = await getAllCollectionsFromCatalog()
    if(collectionName == null) return res.status(200).send(allCollections)
    const collections = allCollections.filter((data:any) => {
        const name: string = data.collectionData.name
        return name.replace(' ', '').toLowerCase().includes(`${collectionName}`.toLowerCase());
    })
    res.status(200).send(collections)
})

router.get('/getContracts', async function (req: Request, res: Response, next: any) {
    const address = req.query.address
    if(address == null) return res.status(200).send()
    const contracts = await getDeployedContracts(`${address}`)
    res.status(200).send(contracts.names)
})

router.get('/getNfts', async function (req: Request, res: Response, next: any) {
    const address = req.query.address
    const publicPath = req.query.publicPath
    if(address == null && publicPath == null) return []
    const allNfts = await getNftInCollection(`${address}`, `${publicPath}`)
    res.status(200).send(allNfts)
})

export default router;