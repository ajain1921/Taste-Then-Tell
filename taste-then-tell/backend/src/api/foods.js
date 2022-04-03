const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess } = require('../utils');

/* const COMPLEX_QUERY =
  'SELECT name, dining_hall_id, COUNT (DISTINCT food_id) FROM Schedules s NATURAL JOIN Food_Allergens f NATURAL JOIN Dining_Halls d WHERE s.food_id NOT IN (SELECT DISTINCT food_id FROM  Food_Allergens f1 WHERE f1.allergen LIKE "%wheat%") GROUP BY d.dining_hall_id';
 */

/* endpoint to get all the foods */
router.get(
  '/',
  errorWrap(async (req, res) => {
    const QUERY =
      'select food_id, name, GROUP_CONCAT(allergen) as allergens from Foods left join Food_Allergens using(food_id) group by food_id LIMIT 50';

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned food', results);
    });
  }),
);

module.exports = router;
