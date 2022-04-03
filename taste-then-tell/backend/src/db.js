const mysql = require('mysql');

const host = process.env.LOCAL_DB === '1' ? 'localhost' : '34.135.3.152';
const pswd = process.env.LOCAL_DB === '1' ? process.env.PASSWORD : 'test123';

const db = mysql.createConnection({
  host: host,
  user: 'root',
  password: pswd,
  database: 'Taste_Then_Tell',
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(db.config);
  }
});

module.exports = db;
