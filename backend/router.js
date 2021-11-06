const express = require('express');
const { service } = require('./routes');
const { product } = require('./routes');

const router = express.Router();

router.use('/services', service);
router.use('/products', product);

module.exports = router;
