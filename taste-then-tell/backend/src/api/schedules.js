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

/* endpoint to get Schedlues that match a given "days" and "dining_hall_id". Order by meal_type*/
router.get(
  '/dining_halls',
  errorWrap(async (req, res) => {
    const { days, dining_hall_id } = req.query;
    console.log(req.query);

    const QUERY = `SELECT * FROM Schedules s LEFT JOIN Reviews r USING(dining_hall_id, food_id) JOIN Foods USING(food_id) NATURAL JOIN (Select food_id, avg(rating) as avg_rating FROM Reviews group by food_id) avg_score where days="${days}" and dining_hall_id=${dining_hall_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        `Successfully returned Schedules that match days: "${days}" and dining_hall_id: "${dining_hall_id}"`,
        results,
      );
    });
  }),
);
module.exports = router;
