const express = require('express');
const router = express.Router();

router.use('/foods', require('./foods'));
router.use('/reviews', require('./reviews'));
router.use('/students', require('./students'));
router.use('/schedules', require('./schedules'));
router.use('/food_allergens', require('./food_allergens'));

module.exports = router;
