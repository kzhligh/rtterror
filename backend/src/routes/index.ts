import express from 'express';
import serviceRouter from './service';
import comboRouter from './combo';

const router = express.Router();

router.use('/services', serviceRouter);
router.use('/combos', comboRouter);

export default router;
