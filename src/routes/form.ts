import express, { Response } from 'express';
import { validatePayload } from '../utils/validate-payload';
import { createFormSchema, CreateFormRequestBody, UpdateFormRequestBody, updateFormSchema, getFormSchema, GetFormRequestBody } from '../types/models/form';
import { db } from '../db/db';

const router = express.Router();

router.get('/getAll', async function ({ user }: any, res: Response, next: any) {
    try {
        const forms = await db.form.getAll(user.accountAddress)
        return res.status(200).send(forms);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

router.get('/get/:id', async function ({ params }: any, res: Response, next: any) {
    try {
        const { id }: GetFormRequestBody = validatePayload({ id: params.id }, getFormSchema);
        const form = await db.form.get(id)

        return res.status(200).send(form);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

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
        const { id, form:formData, feilds }: UpdateFormRequestBody = validatePayload({
            id: body.id,
            form: {id: body.id, ...body.form },
            feilds: body.feilds
        }, updateFormSchema);
        if(formData) await db.form.upsert(user.accountAddress, formData)
        if(feilds) await db.feild.updateMany(id, feilds)
        const form = await db.form.get(id)
        return res.status(200).send(form);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

router.get('/delete/:id', async function ({ params, user }: any, res: Response, next: any) {
    try {
        const { id }: GetFormRequestBody = validatePayload({ id: params.id }, getFormSchema);
        await db.form.delete(id, user.accountAddress);
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

export default router;
