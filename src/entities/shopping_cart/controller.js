const db = require('../../database');

exports.create = (session_id, for_purchase) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO shopping_cart(customer_id, for_purchase) VALUES ((SELECT id FROM customer WHERE user_id ='" +session_id+"'), '" +for_purchase+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM shopping_cart;"

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
    const queryString = "SELECT * FROM shopping_cart WHERE id = '" + id +"';"

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

exports.getOnePurchase = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM shopping_cart WHERE customer_id = '" + id +"' AND for_purchase=1 AND in_order=0;"

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

exports.getOneRental = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM shopping_cart WHERE customer_id = '" + id +"' AND for_purchase=0 AND in_order=0;"

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

exports.editRentalDuration = (id, rental_duration) => {
  return new Promise((resolve, reject) => {

      const queryString = "UPDATE shopping_cart SET total_bill = total_bill * '" + rental_duration +"' WHERE id= '" + id +"';";

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

      const queryString = "CALL deleteCart('" + id +"')";

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