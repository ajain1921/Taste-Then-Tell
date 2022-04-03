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

module.exports = router;
