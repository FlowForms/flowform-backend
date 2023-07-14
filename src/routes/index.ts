import express from 'express';
import { checkAuthenticated } from '../utils/auth';
import authRoutes from './auth';
import formRoutes from './form';
import scriptRoutes from './script';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/form', checkAuthenticated, formRoutes);
router.use('/script', scriptRoutes);

export default router;

