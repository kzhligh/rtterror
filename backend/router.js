const express = require('express');
const { service } = require('./routes');
const { product } = require('./routes');
const { services_employees } = require('./routes');

const router = express.Router();

router.use('/services', service);
router.use('/products', product);
router.use('/services_employees', services_employees);

module.exports = router;
