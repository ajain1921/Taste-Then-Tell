const express = require('express');
const router = express.Router();
const db = require('../db');
const { errorWrap } = require('../middleware');
const { sendSuccess, sendNotFound } = require('../utils');

/* endpoint to get all the allergens */
router.get(
  '/',
  errorWrap(async (req, res) => {
    const QUERY =
      'select DISTINCT allergen from Food_Allergens where allergen != " "';

    db.query(QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      }

      sendSuccess(res, 'Successfully returned allergens', results);
    });
  }),
);

module.exports = router;
