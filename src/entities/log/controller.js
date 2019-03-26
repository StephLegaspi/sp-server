const db = require('../../database');


exports.getAllAdmin = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "select id, action, user_type, user_id, CONCAT(DATE_FORMAT(log_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(log_timestamp, '%h:%i:%s')) as log_timestamp from log_record WHERE user_type='Administrator' ORDER BY log_timestamp DESC";
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
    const queryString = "select id, action, user_type, user_id, CONCAT(DATE_FORMAT(log_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(log_timestamp, '%h:%i:%s')) as log_timestamp from log_record WHERE user_type='Customer' ORDER BY log_timestamp DESC";

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getOneAdmin = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "select id, action, user_type, user_id, CONCAT(DATE_FORMAT(log_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(log_timestamp, '%h:%i:%s')) as log_timestamp from log_record WHERE user_id = '" +id+"' AND user_type='Administrator' ORDER BY log_timestamp DESC;";

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getOneCustomer = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "select id, action, user_type, user_id, CONCAT(DATE_FORMAT(log_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(log_timestamp, '%h:%i:%s')) as log_timestamp from log_record WHERE user_id = '" +id+"' AND user_type='Customer' ORDER BY log_timestamp DESC;";

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