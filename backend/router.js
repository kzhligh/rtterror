const express = require('express');
const { service } = require('./routes');

const router = express.Router();

router.use('/services', service);

module.exports = router;
