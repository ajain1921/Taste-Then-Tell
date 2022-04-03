const express = require('express');
const router = express.Router();

router.use('/foods', require('./foods'));
router.use('/reviews', require('./reviews'));
router.use('/students', require('./students'));

module.exports = router;
