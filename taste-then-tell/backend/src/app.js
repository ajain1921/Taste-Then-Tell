const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./api');
const mysql = require('mysql');
const { errorHandler } = require('./middleware');

const app = express();

const host = process.env.LOCAL_DB === '1' ? 'localhost' : '1';
const pswd = process.env.LOCAL_DB === '1' ? process.env.PASSWORD : 'test123';

const pool = mysql.createPool({
  connectionLimit: 100,
  multipleStatements: true,
  waitForConnections: true,
  queueLimit: 0,
  host: host,
  user: 'root',
  password: pswd,
  database: 'Taste_Then_Tell',
});

const COMPLEX_QUERY =
  'SELECT name, dining_hall_id, COUNT (DISTINCT food_id) FROM Schedules s NATURAL JOIN Food_Allergens f NATURAL JOIN Dining_Halls d WHERE s.food_id NOT IN (SELECT DISTINCT food_id FROM  Food_Allergens f1 WHERE f1.allergen LIKE "%wheat%") GROUP BY d.dining_hall_id';

app.use(helmet());
app.use(cors({ origin: /localhost:\d{4}/, credentials: true }));

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '2.1mb' }));
app.use(bodyParser.urlencoded({ limit: '2.1mb', extended: false }));

// Routes
app.use('/api', apiRoutes);
app.get('/', (req, res) => res.json('API working!'));
app.get('/test', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      if (connection) {
        connection.release();
      }
      return res.send(err);
    }

    connection.query(COMPLEX_QUERY, (err, results) => {
      connection.release();
      if (err) {
        return res.send(err);
      }
      return res.json({ data: results });
    });
  });
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
