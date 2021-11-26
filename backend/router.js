const express = require('express');
const { service, product, customer } = require('./routes');

const router = express.Router();

router.use('/services', service);
router.use('/products', product);
router.use('/customer', customer);

module.exports = router;
