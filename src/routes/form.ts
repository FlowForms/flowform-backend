import express, { Response } from 'express';
import { validatePayload } from '../utils/validate-payload';
import { createFormSchema, CreateFormRequestBody, UpdateFormRequestBody, updateFormSchema } from '../types/models/form';
import { db } from '../db/db';
import { getAllCollectionsFromCatalog, getDeployedContracts, getNftInCollection} from '../cadence';


const router = express.Router();

router.get('/get', async function ({ body, user }: any, res: Response, next: any) {
    //const p = await getAllCollectionsFromCatalog()
   // const l = await getDeployedContracts("0x7c8995e83c4b1843")
   const m = await getNftInCollection()
    return res.status(200).send(m);
})

router.post('/create', async function ({ body, user }: any, res: Response, next: any) {
    try {
        const { form:formData, feilds }: CreateFormRequestBody = validatePayload(body, createFormSchema);
        await db.form.create(user.accountAddress, formData);
        await db.feild.createMany(formData.id, feilds)

        const form = await db.form.get(formData.id)
        return res.status(200).send(form);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

router.post('/update', async function ({ body, user }: any, res: Response, next: any) {
    try {
        const { form:formData, feilds }: UpdateFormRequestBody = validatePayload(body, updateFormSchema);
        //await db.form.create(user.accountAddress, formData);
        await db.feild.updateMany(formData.id, feilds)
        const form = await db.form.get(formData.id)
        return res.status(200).send(form);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

export default router;
