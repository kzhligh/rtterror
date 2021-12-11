import express from 'express';
import { customerRouter } from './customer.route';
import serviceRouter from './service';

const router = express.Router();

router.use('/services', serviceRouter);
router.use('/customer', customerRouter);

export default router;
