import express from 'express';
import { checkAuthenticated } from '../utils/auth';
import authRoutes from './auth';
import responderAuthRoutes from './responder-auth';
import formRoutes from './form';
import scriptRoutes from './script';
import responseRoutes from './response';
import { GetFormRequestBody, getFormSchema } from '../types';
import { validatePayload } from '../utils/validate-payload';
import { db } from '../db/db';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/responder-auth', responderAuthRoutes);
router.use('/form', checkAuthenticated, formRoutes);

router.get('/view-form/:id', async (req: any, res: any, next: any) => {
    try {
        const { id }: GetFormRequestBody = validatePayload({ id: req.params.id }, getFormSchema);
        const form = await db.form.get(id)
        delete form["response"]
        return res.status(200).send(form);
    } catch (err) {
        console.log(err);
        return next(err);
    }
})

router.use('/script', scriptRoutes);
router.use('/response', responseRoutes);

export default router;

