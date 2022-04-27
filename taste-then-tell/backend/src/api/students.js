const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess, sendNotFound } = require('../utils');

/* endpoint to get all the students */
router.get(
  '/',
  errorWrap(async (req, res) => {
    const QUERY = 'SELECT * from Students';

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned Students', results);
    });
  }),
);

/* endpoint to login */
router.post(
  '/login',
  errorWrap(async (req, res) => {
    const { email, password } = req.body;

    const QUERY = `SELECT * from Students WHERE email = \"${email}\" and password = \"${password}\"`;
    console.log(QUERY);

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }
      if (results.length > 0) {
        sendSuccess(res, 'Successfully returned user', results);
      } else {
        sendNotFound(res, 'Email and password did not match');
      }
    });
  }),
);

/* endpoint to add a student/user */
router.post(
  '/add_student/',
  errorWrap(async (req, res) => {
      const { university_id, first_name, last_name, email, password } = req.body;

    console.log("university_id: " + university_id + " first_name: " + first_name + " last_name: " + last_name + " email: " + email + " password: " + password);

    const QUERY = `INSERT INTO Students (university_id, first_name, last_name, email, password) VALUES (${university_id}, \"${first_name}\", \"${last_name}\", \"${email}\", \"${password}\")`;
    db.query(QUERY, (err, results) => {
      console.log(QUERY);
      if (err) {
        return res.send(err);
      }
      
      sendSuccess(res, "Successfully added student", results);
    });
  }),
);

/* endpoint to get a student/user by user_id */
router.get(
  '/get_student/:user_id',
  errorWrap(async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);

    const QUERY = `SELECT * from Students WHERE user_id = ${user_id}`;

    db.query(QUERY, (err, results) => {
      console.log(QUERY);

      if (err) {
        return res.send(err);
      }

      sendSuccess(res, `Successfully returned user with user_id ${user_id}`, results);
    });
  }),
);

module.exports = router;
