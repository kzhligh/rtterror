import express from 'express';
import { customerRouter } from './customer.route';
import serviceRouter from './service';
import comboRouter from './combo';

const router = express.Router();

router.use('/services', serviceRouter);
router.use('/customer', customerRouter);
router.use('/combos', comboRouter);
router.use('/combos', comboRouter);
router.get('/', (_req, res) => {
  res.send('OK');
});

export default router;
