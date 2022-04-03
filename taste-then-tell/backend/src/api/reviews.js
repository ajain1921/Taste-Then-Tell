const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess } = require('../utils');

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
  '/food_id/',
  errorWrap(async (req, res) => {
    const {food_id} = req.query;
    console.log(food_id);

    const QUERY = 'SELECT * from Reviews WHERE food_id = ' + food_id;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned reviews that match + ' + food_id, results);
    });
  }),
);

/* endpoint to add a review */
router.post(
  '/add_review/',
  errorWrap(async (req, res) => {
    // (student_id == user_id) from the database
    // (review == feedback) from the database
    const {student_id, food_id, dining_hall_id, rating, review} = req.query;
    const review_id = Math.floor(Math.random() * 1000000);

    console.log("review_id: " + review_id + " student_id: " + student_id + " food_id: " + food_id + " dining_hall_id: " + dining_hall_id + " rating: " + rating + " review: " + review);

    const QUERY = `INSERT INTO Reviews VALUES (${review_id}, ${student_id}, ${food_id}, ${dining_hall_id}, ${rating}, \"${review}\")`;
    
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully added review with review_id: ' + review_id, results);
    });
  }),
);

/* endpoint to edit a reviews text */
router.put(
  '/edit_review_text/',
  errorWrap(async (req, res) => {
    const {review_id, review} = req.query;
    console.log("review_id: " + review_id + " review: " + review);

    const QUERY = `UPDATE Reviews SET feedback = \"${review}\" WHERE review_id = ${review_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully edited the TEXT of the review with review_id: ' + review_id, results);
    });
  }),
);


/* endpoint to edit a review's rating*/
router.put(
  '/edit_review_rating/',
  errorWrap(async (req, res) => {
    const {review_id, rating} = req.query;
    console.log("review_id: " + review_id + " rating: " + rating);

    const QUERY = `UPDATE Reviews SET rating = ${rating} WHERE review_id = ${review_id}`;
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully edited RATING of the review with review_id: ' + review_id, results);
    });
  }),
);

/* endpoint to delete a review */
router.delete(
  '/delete_review/',
  errorWrap(async (req, res) => {
    const {review_id} = req.query;
    console.log("review_id: " + review_id);

    const QUERY = `DELETE FROM Reviews WHERE review_id = ${review_id}`;
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully deleted review with review_id: ' + review_id, results);
    });
  }),
);


module.exports = router;