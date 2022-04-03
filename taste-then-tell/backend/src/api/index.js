const express = require('express');
const router = express.Router();

router.use('/foods', require('./foods'));
router.use('/reviews', require('./reviews'));

module.exports = router;
