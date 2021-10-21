const express = require('express');
const {customer} = require('./routes/');
const {service} = require('./routes');

const router = express.Router();

router.use('/customers', customer);
router.use('/services', service);


module.exports = router;