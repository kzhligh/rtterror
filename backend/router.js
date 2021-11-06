const express = require('express');
const { service, product, combo } = require('./routes');

const router = express.Router();

router.use('/services', service);
router.use('/products', product);
router.use('/combos', combo);

module.exports = router;
