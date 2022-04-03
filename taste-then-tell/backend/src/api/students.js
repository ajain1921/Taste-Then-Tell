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

module.exports = router;
