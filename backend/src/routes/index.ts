import express from 'express';
import serviceRouter from './service';

const router = express.Router();

router.use('/services', serviceRouter);

export default router;
