const db = require('../../database');

exports.create = (consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, customer_id) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL insertOrder('" +consignee_first_name+"', '" +consignee_middle_name+"', '" +consignee_last_name+"', '" +consignee_email+"', '" +consignee_contact_number+"', '" +delivery_address+"', '" +zip_code+"', '" +for_purchase+"', '" +shopping_cart_id+"', '" +customer_id+"');";

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
    const queryString = "SELECT * FROM order_information;"

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
    const queryString = "SELECT * FROM order_information WHERE id = '" + id +"';"

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

exports.remove = (id) => {
  return new Promise((resolve, reject) => {

      const queryString = "DELETE FROM order_information WHERE id = '" + id +"';";

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

exports.edit = (id, status) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL editOrder('"+id+"', '"+status+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};