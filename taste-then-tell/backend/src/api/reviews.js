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

    const QUERY = `SELECT review_id, user_id, first_name, last_name, food_id, f.name as food_name, dining_hall_id, d.name as dining_hall_name, rating, feedback, contains_profanity
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
    const { student_id, food_id, dining_hall_id, rating, review } = req.body;

    console.log(
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

    const QUERY = `INSERT INTO Reviews (user_id, food_id, dining_hall_id, rating, feedback) VALUES (${student_id}, ${food_id}, ${dining_hall_id}, ${rating}, \"${review}\")`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully added review', results);
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
      'SELECT u.name as university_name, dh.name as dining_hall_name, AVG(r.rating) as avgRating FROM Reviews r NATURAL JOIN Dining_Halls dh JOIN Universities u USING(university_id) GROUP BY dh.dining_hall_id ORDER BY avgRating DESC LIMIT 50';
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

/* endppoint to get the reviews for a user given that user's email and password */ //note this is ultra-secure
router.get(
  '/user_reviews',
  errorWrap(async (req, res) => {
    const { email, password } = req.body;

    const QUERY = `CALL getYourReviews(\"${email}\", \"${password}\")`;
    console.log(QUERY);

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }
      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned user review(s)', results);
      } else {
        sendNotFound(res, 'Could not retrieve reviews for this user');
      }
    });
  }),
);

/* endpoint to get the reviews for a user given that user's email and password, but using params instead. */
router.get(
  '/user_reviews/:email/:password',
  errorWrap(async (req, res) => {
    const { email, password } = req.params;

    const QUERY = `CALL getYourReviews(\"${email}\", \"${password}\")`;
    console.log(QUERY);

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }
      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned user review(s)', results);
      } else {
        sendNotFound(res, `could not retrieve reviews for this user: ${email}`);
      }
    });
  }),
);


//endpoint to return the following things given a food_id
// the "num_five_stars" the number of reviews with a rating of 5
// the "num_four_stars" the number of reviews with a rating >= 4 and < 5
// the "num_three_stars" the number of reviews with a rating >= 3 and <4
// the "num_two_stars" the number of reviews with a rating >= 2 and <3
// the "num_one_stars" the number of reviews with a rating >= 1 and <2
// the "num_zero_stars" the number of reviews with a rating < 1

router.get(
  '/get_food_review_stars/:food_id',
  errorWrap(async (req, res) => {
    const { food_id } = req.params;
    console.log('food_id: ' + food_id);

    const QUERY = `SELECT 
      MAX(subquery.num_zero_stars) as num_zero_stars,
      MAX(subquery.num_one_stars) as num_one_stars,
      MAX(subquery.num_two_stars) as num_two_stars,
      MAX(subquery.num_three_stars) as num_three_stars,
      MAX(subquery.num_four_stars) as num_four_stars,
      MAX(subquery.num_five_stars) as num_five_stars
    FROM 
        (SELECT -1 AS num_zero_stars, -1 AS num_one_stars, -1 AS num_two_stars, -1 AS num_three_stars, -1 AS num_four_stars, COUNT(*) AS num_five_stars
        FROM Reviews
        WHERE rating = 5 AND food_id = ${food_id}

        UNION

        SELECT -1 AS num_zero_stars, -1 AS num_one_stars, -1 AS num_two_stars, -1 AS num_three_stars, COUNT(*) AS num_four_stars, -1 AS num_five_stars
        FROM Reviews
        WHERE rating >= 4 AND rating < 5 AND food_id = ${food_id}

        UNION

        SELECT -1 AS num_zero_stars, -1 AS num_one_stars, -1 AS num_two_stars, COUNT(*) AS num_three_stars, -1 AS num_four_stars, -1 AS num_five_stars
        FROM Reviews
        WHERE rating >= 3 AND rating < 4 AND food_id = ${food_id}

        UNION

        SELECT -1 AS num_zero_stars, -1 AS num_one_stars, COUNT(*) AS num_two_stars, -1 AS num_three_stars, -1 AS num_four_stars, -1 AS num_five_stars
        FROM Reviews
        WHERE rating >= 2 AND rating < 3 AND food_id = ${food_id}

        UNION 

        SELECT -1 AS num_zero_stars, COUNT(*) AS num_one_stars, -1 AS num_two_stars, -1 AS num_three_stars, -1 AS num_four_stars, -1 AS num_five_stars
        FROM Reviews
        WHERE rating >= 1 AND rating < 2 AND food_id = ${food_id}

        UNION

        SELECT COUNT(*) AS num_zero_stars, -1 AS num_one_stars, -1 AS num_two_stars, -1 AS num_three_stars, -1 AS num_four_stars, -1 AS num_five_stars
        FROM Reviews
        WHERE rating < 1 AND food_id = ${food_id}) AS subquery`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }

      sendSuccess(
        res,
        'Successfully returned food review star counts',
        results,
      );
    });
  }),
);

module.exports = router;
