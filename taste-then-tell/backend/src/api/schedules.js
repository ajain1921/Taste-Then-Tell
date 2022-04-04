const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess } = require('../utils');

/* endpoint to get dining_halls that serve a food_id */
router.get(
    '/foods/:food_id',
    errorWrap(async (req, res) => {
        const { food_id } = req.params;

        const QUERY = `SELECT dining_hall_id, d.name as dining_hall_name from Schedules LEFT JOIN Dining_Halls d USING(dining_hall_id) WHERE food_id = ${food_id}`;

        db.query(QUERY, (err, results) => {
            if (err) {
                return res.send(err);
            }

            sendSuccess(res, 'Successfully returned dining_halls', results);
        });
    }),
);

module.exports = router;
