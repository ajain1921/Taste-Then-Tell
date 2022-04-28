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

/* endpoint to search food table by food name */
router.get(
  '/search/',
  errorWrap(async (req, res) => {
    const { q } = req.query;
    console.log(q);

    const QUERY = `select food_id, name, GROUP_CONCAT(allergen) as allergens from Foods left join Food_Allergens using(food_id) WHERE name LIKE "%${q}%" group by food_id LIMIT 50`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned foods that match ' + q, results);
    });
  }),
);

/* const COMPLEX_QUERY =
  'SELECT name, dining_hall_id, COUNT (DISTINCT food_id) FROM Schedules s NATURAL JOIN Food_Allergens f NATURAL JOIN Dining_Halls d WHERE s.food_id NOT IN (SELECT DISTINCT food_id FROM  Food_Allergens f1 WHERE f1.allergen LIKE "%wheat%") GROUP BY d.dining_hall_id';
 */
/* endpoint to get the counts per dining hall of foods that are free of a specific allergen*/
router.get(
  '/filter_out_allergen',
  errorWrap(async (req, res) => {
    const { allergen } = req.query;
    console.log(allergen);

    const QUERY = `SELECT name, COUNT (DISTINCT food_id) as nonAllergenCount FROM Schedules s NATURAL JOIN Food_Allergens f NATURAL JOIN Dining_Halls d WHERE s.food_id NOT IN (SELECT DISTINCT food_id FROM  Food_Allergens f1 WHERE f1.allergen LIKE "%${allergen}%") GROUP BY d.dining_hall_id order by nonAllergenCount DESC LIMIT 50`;

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

/* endpoint to get the average rating of a food given its food_id. Join with the Reviews table to figure this out*/
// NOTE that this is the average rating of that food_id accross ALL dining halls.
router.get(
  '/get_average_rating/:food_id',
  errorWrap(async (req, res) => {
    const { food_id } = req.params;

    const QUERY = `SELECT AVG(rating) as averageRating FROM Reviews WHERE food_id = ${food_id}`;

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned average rating', results);
      } else {
        sendNotFound(res, 'Food not found');
      }
    }
    );
  }),
);

/* endpoint to get the average rating of a food AT A SPECIFIC DINING HALL given it's food_id and dining_hall_id. Join with the Reviews table to figure this out*/

router.get(
  '/get_average_rating_given/dining_hall',
  errorWrap(async (req, res) => {
    const { food_id, dining_hall_id } = req.body;

    const QUERY = `SELECT AVG(rating) as averageRating FROM Reviews WHERE food_id = ${food_id} AND dining_hall_id = ${dining_hall_id}`;

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned average rating', results);
      } else {
        sendNotFound(res, 'Food & dining hall combo not found');
      }

    }
    );
  }),
);

/* endpoint to get a random food_id from the database */
router.get(
  '/get_random/food_id',
  errorWrap(async (req, res) => {
    const QUERY = `SELECT food_id FROM Foods ORDER BY RAND() LIMIT 1`;

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned random food_id', results);
      } else {
        sendNotFound(res, 'Food not found');
      }
    });
  }),
);


module.exports = router;
