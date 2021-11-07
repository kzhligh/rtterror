const express = require('express');
const { service, product, combo, servicesEmployees } = require('./routes');

const router = express.Router();

router.use('/services', service);
router.use('/products', product);
router.use('/combos', combo);
router.use('/services_employees', servicesEmployees);

module.exports = router;
