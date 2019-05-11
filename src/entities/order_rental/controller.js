const db = require('../../database');

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM order_rental;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getOne = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT order_rental.id, order_rental.rental_duration, order_rental.rental_status, CONCAT(DATE_FORMAT(returned_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(returned_timestamp, '%H:%i:%s')) as returned_timestamp2, DATE_FORMAT(DATE_ADD(order_information.order_timestamp, INTERVAL order_rental.rental_duration DAY), '%e %b, %Y') as due_date FROM order_rental, order_information WHERE order_rental.order_id=order_information.id AND  order_rental.order_id = '" + id +"';"

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

exports.getRentalDueCount = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT COUNT(*) as count FROM order_rental, order_information WHERE order_rental.order_id=order_information.id AND DATE_FORMAT(DATE_ADD(order_information.order_timestamp, INTERVAL order_rental.rental_duration DAY), '%e %b, %Y') >= NOW() AND order_rental.rental_status = 'On-rent';"

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });

  });
};


exports.edit = (session_id, id, status) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL returnOrder('"+id+"', '"+status+"');";
      const queryString2= "CALL insertLog(concat('Edited rental order status: ', '"+id+"'), 'Administrator', '"+session_id+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        db.query(queryString2, (err2, results2) => {
          if (err) {
            console.log(err);
            return reject(500);
          }
        });
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