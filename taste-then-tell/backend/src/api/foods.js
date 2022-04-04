const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess, sendNotFound } = require('../utils');

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

/* get food by food_id */
router.get(
  '/:food_id',
  errorWrap(async (req, res) => {
    const { food_id } = req.params;

    const QUERY = `SELECT food_id, name, GROUP_CONCAT(allergen) as allergen FROM Foods LEFT JOIN Food_Allergens using(food_id) WHERE food_id = ${food_id} GROUP BY food_id`;

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned food', results);
      } else {
        sendNotFound(res, 'Food not found');
      }
    });
  }),
);

/* endpoint to search food table by food name */
router.get(
  '/search_by_name/',
  errorWrap(async (req, res) => {
    const { food_name } = req.body;
    console.log(food_name);

    const QUERY = `SELECT * FROM Foods WHERE name LIKE "%${food_name}%"`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        'Successfully returned foods that match ' + food_name,
        results,
      );
    });
  }),
);

/* const COMPLEX_QUERY =
  'SELECT name, dining_hall_id, COUNT (DISTINCT food_id) FROM Schedules s NATURAL JOIN Food_Allergens f NATURAL JOIN Dining_Halls d WHERE s.food_id NOT IN (SELECT DISTINCT food_id FROM  Food_Allergens f1 WHERE f1.allergen LIKE "%wheat%") GROUP BY d.dining_hall_id';
 */

/* endpoint to get the counts per dining hall of foods that are free of a specific allergen*/
router.get(
  '/filter_out_allergen/',
  errorWrap(async (req, res) => {
    const { allergen } = req.body;
    console.log(allergen);

    const QUERY = `SELECT name, dining_hall_id, COUNT (DISTINCT food_id) FROM Schedules s NATURAL JOIN Food_Allergens f NATURAL JOIN Dining_Halls d WHERE s.food_id NOT IN (SELECT DISTINCT food_id FROM  Food_Allergens f1 WHERE f1.allergen LIKE "%${allergen}%") GROUP BY d.dining_hall_id`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        'Successfully returned foods that do not contain ' + allergen,
        results,
      );
    });
  }),
);

module.exports = router;
