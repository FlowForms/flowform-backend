import express, { Response } from 'express';
import { validatePayload } from '../utils/validate-payload';
import { createResponseSchema, CreateResponseRequestBody } from '../types/models/form';
import { db } from '../db/db';

const router = express.Router();

router.post('/create', async function ({ body }: any, res: Response, next: any) {
    try {
        const { formId, data }: CreateResponseRequestBody = validatePayload(body, createResponseSchema);
        await db.response.create(formId, data)
        return res.status(200).send("Response Submitted Successfully");
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

export default router;