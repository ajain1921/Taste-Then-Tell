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




module.exports = router;
