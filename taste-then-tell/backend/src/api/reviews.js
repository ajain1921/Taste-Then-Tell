const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess, sendNotFound } = require('../utils');

/* endpoint to get all the reviews */
router.get(
  '/',
  errorWrap(async (req, res) => {
    const QUERY = 'SELECT * from Reviews';

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned reviews', results);
    });
  }),
);

/* endpoint to get reviews by food id */
router.get(
  '/foods/:food_id',
  errorWrap(async (req, res) => {
    const { food_id } = req.params;
    console.log(food_id);

    const QUERY = `SELECT review_id, user_id, first_name, last_name, food_id, f.name as food_name, dining_hall_id, d.name as dining_hall_name, rating, feedback 
    FROM Reviews r LEFT JOIN Students s using(user_id) LEFT JOIN Foods f using(food_id) LEFT JOIN Dining_Halls d using(dining_hall_id) WHERE f.food_id= ${food_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        `Successfully returned reviews that match ${food_id}`,
        results,
      );
    });
  }),
);

/* endpoint to add a review */
router.post(
  '/add_review/',
  errorWrap(async (req, res) => {
    // (student_id == user_id) from the database
    // (review == feedback) from the database
    const { student_id, food_id, dining_hall_id, rating, review } = req.body;
    const review_id = Math.floor(Math.random() * 1000000) + 10000; //this is bad we're totally going to override old reviews by accident

    console.log(
      'review_id: ' +
        review_id +
        ' student_id: ' +
        student_id +
        ' food_id: ' +
        food_id +
        ' dining_hall_id: ' +
        dining_hall_id +
        ' rating: ' +
        rating +
        ' review: ' +
        review,
    );

    const QUERY = `INSERT INTO Reviews VALUES (${review_id}, ${student_id}, ${food_id}, ${dining_hall_id}, ${rating}, \"${review}\")`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        'Successfully added review with review_id: ' + review_id,
        results,
      );
    });
  }),
);

/* endpoint to edit a reviews text */
router.put(
  '/edit_review_text/',
  errorWrap(async (req, res) => {
    const { review_id, review } = req.body;
    console.log('review_id: ' + review_id + ' review: ' + review);

    const QUERY = `UPDATE Reviews SET feedback = \"${review}\" WHERE review_id = ${review_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }
      if (results.affectedRows == 0) {
        return sendNotFound(
          res,
          `No review text was edited because no review exists with review_id: ${review_id}`,
        );
      }

      sendSuccess(
        res,
        `Successfully edited the TEXT of the review with review_id: ${review_id}`,
        results,
      );
    });
  }),
);

/* endpoint to edit a review's rating*/
router.put(
  '/edit_review_rating/',
  errorWrap(async (req, res) => {
    const { review_id, rating } = req.body;
    console.log('review_id: ' + review_id + ' rating: ' + rating);

    const QUERY = `UPDATE Reviews SET rating = ${rating} WHERE review_id = ${review_id}`;
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }
      if (results.affectedRows == 0) {
        return sendNotFound(
          res,
          `No review rating was edited because no review exists with review_id: ${review_id}`,
        );
      }

      sendSuccess(
        res,
        `Successfully edited RATING of the review with review_id: ${review_id}`,
        results,
      );
    });
  }),
);

/* endpoint to delete a review */
router.delete(
  '/delete/:review_id',
  errorWrap(async (req, res) => {
    const { review_id } = req.params;
    console.log('review_id: ' + review_id);

    const QUERY = `DELETE FROM Reviews WHERE review_id = ${review_id}`;
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }
      if (results.affectedRows == 0) {
        return sendSuccess(
          res,
          `No review deleted because no review exists with review_id: ${review_id}`,
          results,
        );
      }

      sendSuccess(
        res,
        `Successfully deleted review with review_id: ${review_id}`,
        results,
      );
    });
  }),
);

//advanced query
// SELECT u.name, dh.name, AVG(r.rating) as avgRating FROM Reviews r NATURAL JOIN Dining_Halls dh JOIN Universities u USING(university_id) GROUP BY dh.dining_hall_id ORDER BY avgRating DESC;

/* endpoint to get the average review rating for all foods within all dining halls */
router.get(
  '/average_ratings/',
  errorWrap(async (req, res) => {
    const QUERY =
      'SELECT u.name, dh.name, AVG(r.rating) as avgRating FROM Reviews r NATURAL JOIN Dining_Halls dh JOIN Universities u USING(university_id) GROUP BY dh.dining_hall_id ORDER BY avgRating DESC';
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        'Successfully returned average rating for all foods within all dining halls',
        results,
      );
    });
  }),
);

module.exports = router;
