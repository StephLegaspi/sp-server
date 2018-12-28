const db = require('../../database');

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM order_rental;"

    db.query(queryString, (err, rows) =>{
      if (err){
        return reject(500);
      }
      if (!rows.length){
        return reject(404);
      }
      return resolve(rows);
    });
  });
};

exports.getOne = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM order_rental WHERE order_id = '" + id +"';"

    db.query(queryString, (err, rows) =>{
      if (err){
        return reject(500);
      }
      if (!rows.length){
        return reject(404);
      }
      return resolve(rows);
    });

  });
};

exports.edit = (id, status) => {
  return new Promise((resolve, reject) => {

      const queryString = "UPDATE order_rental SET rental_status = '"+status+"', returned_timestamp = CURDATE()  WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.remove = (id) => {
  return new Promise((resolve, reject) => {

      const queryString = "DELETE FROM order_rental WHERE id = '" + id +"';";

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