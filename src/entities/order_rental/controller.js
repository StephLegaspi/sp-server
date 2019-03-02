const db = require('../../database');


exports.create = (session_id, consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, customer_id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL insertOrder('" +session_id+"','" +consignee_first_name+"', '" +consignee_middle_name+"', '" +consignee_last_name+"', '" +consignee_email+"', '" +consignee_contact_number+"', '" +delivery_address+"', '" +zip_code+"', '" +for_purchase+"', '" +shopping_cart_id+"', '" +customer_id+"');";
      console.log(session_id);

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

exports.edit = (session_id, id, status) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL returnOrder('"+session_id+"', '"+id+"', '"+status+"');";;

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