import express from 'express';
import { customerRouter } from './customer.route';
import serviceRouter from './service';
import comboRouter from './combo';
import employeeRouter from './employee';

const router = express.Router();

router.use('/services', serviceRouter);
router.use('/customer', customerRouter);
router.use('/combos', comboRouter);
router.use('/employees', employeeRouter);
router.get('/', (_req, res) => {
  res.send('OK');
});

export default router;
