const express = require('express');
const {customer} = require('./routes');

const router = express.Router();

router.use('/customers', customer);

module.exports = router;