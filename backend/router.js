const express = require('express');
const { service, product, combo, services_employees } = require('./routes');

const router = express.Router();

router.use('/services', service);
router.use('/products', product);
router.use('/combos', combo);
router.use('/services_employees', services_employees);

module.exports = router;
