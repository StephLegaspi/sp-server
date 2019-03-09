const db = require('../../database');


exports.getAllAdmin = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM log_record WHERE user_type='Administrator';";

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllCustomer = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM log_record WHERE user_type='Customer';";

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.remove = (id) => {
  return new Promise((resolve, reject) => {

      const queryString = "DELETE from log_record WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        if (!results.affectedRows) {
          return reject(404);
        }
        return resolve(id);
      });

    });
};