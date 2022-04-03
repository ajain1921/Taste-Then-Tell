const express = require('express');
const router = express.Router();

router.use('/foods', require('./foods'));

module.exports = router;
