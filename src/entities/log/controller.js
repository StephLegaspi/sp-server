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

