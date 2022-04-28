const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess, sendNotFound } = require('../utils');

/* endpoint to get all the Universities */
router.get(
  '/',
  errorWrap(async (req, res) => {
    const QUERY = 'SELECT * from Universities';

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned Universities', results);
    });
  }),
);

/* endpoint to get all dining_halls and their average ratings given a university_id */
router.get(
  '/get_average_ratings_for_dining_halls/:university_id',
  errorWrap(async (req, res) => {
    const { university_id } = req.params;
    console.log(university_id);

    const QUERY = `SELECT d.dining_hall_id, d.name as dining_hall_name, AVG(r.rating) as average_rating FROM Dining_Halls d LEFT JOIN Reviews r USING(dining_hall_id) WHERE d.university_id = ${university_id} GROUP BY d.dining_hall_id`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        `Successfully returned dining_halls and their average ratings given a university_id: ${university_id}`,
        results,
      );
    });
  }),
);

/* endpoint to get a university_name given a university_id */
router.get(
  '/get_university_name/:university_id',
  errorWrap(async (req, res) => {
    const { university_id } = req.params;

    const QUERY = `SELECT name from Universities WHERE university_id = ${university_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      if (results.length === 0) {
        return sendNotFound(
          res,
          `No university found with university_id: ${university_id}`,
        );
      } else {
        sendSuccess(
          res,
          `Successfully returned a university_name given a university_id: ${university_id}`,
          results,
        );
      }
    });
  }),
);

/* endpoint to get the average rating and names of Universities by getting the average ratings of all dining halls in that university.*/
router.get(
  '/get_average_ratings_for_universities/',
  errorWrap(async (req, res) => {
    const QUERY = `SELECT u.name, AVG(r.rating) as average_rating FROM Reviews r NATURAL JOIN Dining_Halls d JOIN Universities u USING(university_id) GROUP BY u.university_id ORDER BY average_rating DESC`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        `Successfully returned average rating and names of Universities.`,
        results,
      );
    });
  }),
);

router.get(
  '/dining_halls/:university_id',
  errorWrap(async (req, res) => {
    const { university_id } = req.params;
    const QUERY = `SELECT d.name as dining_Hall, u.name as university, university_id, dining_Hall_id, location FROM Dining_Halls d Join Universities u using(university_id) where university_id=${university_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      sendSuccess(res, `Successfully returned dining halls.`, results);
    });
  }),
);

module.exports = router;
