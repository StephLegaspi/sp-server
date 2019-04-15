const mysql = require('mysql');
const dbase = require('../config.json');

const db = mysql.createConnection({
  host: dbase.db.host,
  user: dbase.db.user,
  password: dbase.db.password,
  database: dbase.db.database,
  multipleStatements: true
});

console.log("HELOOOOOO");

var connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db); // Recreate the connection, since
                          // the old one cannot be reused.

    connection.connect(function(err) {                // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                       // to avoid a hot loop, and to allow our node script to
    });                                       // process asynchronous requests in the meantime.
                          // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {  // Connection to the MySQL server is usually
            handleDisconnect();                       // lost due to either server restart, or a
        } else {                                        // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

db.on('ready', () => console.log('Database is connected')).on('error', err => {
  console.log('Error in connecting to database111');
  console.log(err.message);
});

db.connect(err => {
  if (err) {
    console.log('Error in connecting to database2222');
    console.log(err.message);
  } else {
    console.log('Success in connecting to database');
  }
});
db.query('USE transactionserver');

module.exports = db;