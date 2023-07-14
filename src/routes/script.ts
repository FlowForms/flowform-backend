import express, { Request, Response } from 'express';
import { getAllCollectionsFromCatalog} from '../cadence';

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

router.get('/getNfts', async function (req: Request, res: Response, next: any) {
    const collectionName = req.query.key
    const allCollections = await getAllCollectionsFromCatalog()
    if(collectionName == null) return res.status(200).send(allCollections)
    const collections = allCollections.filter((data:any) => {
        const name: string = data.collectionData.name
        return name.replace(' ', '').toLowerCase().includes(`${collectionName}`.toLowerCase());
    })
    res.status(200).send(collections)
})

export default router;