const mysql = require('mysql');
const dbase = require('../config.json');

const db = mysql.createConnection({
  host: dbase.db.host,
  user: dbase.db.user,
  password: dbase.db.password,
  db: dbase.db.database,
  multipleStatements: true
});

db.on('ready', () => console.log('Database is connected')).on('error', err => {
  console.log('Error in connecting to database');
  console.log(err.message);
});

db.connect(err => {
  if (err) {
    console.log('Error in connecting to database');
    console.log(err.message);
  } else {
    console.log('Success in connecting to database');
  }
});
db.query('USE transactionserver');

module.exports = db;