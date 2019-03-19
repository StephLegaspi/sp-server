const db = require('../../database');

exports.create = (session_id, consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, rental_duration) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL insertOrder('" +session_id+"','" +consignee_first_name+"', '" +consignee_middle_name+"', '" +consignee_last_name+"', '" +consignee_email+"', '" +consignee_contact_number+"', '" +delivery_address+"', '" +zip_code+"', '" +for_purchase+"', '" +shopping_cart_id+"', '" +rental_duration+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};


exports.getAllPurchase = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT order_information.id, order_information.delivery_address, order_information.zip_code, order_information.order_timestamp, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllRental = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT order_information.id, order_information.delivery_address, order_information.zip_code, order_information.order_timestamp, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=0;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllPendingPurchase = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT count(*) as count FROM order_information WHERE status='Pending' AND for_purchase=1;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllPendingRental = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT count(*) as count FROM order_information WHERE status='Pending' AND for_purchase=0;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM order_information;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getByStatPurchase = (delivery_status) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT order_information.id, order_information.delivery_address, order_information.zip_code, order_information.order_timestamp, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1 AND order_information.status = '" + delivery_status +"';";

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
    const queryString = "SELECT order_information.id, order_information.delivery_address, order_information.zip_code, order_information.order_timestamp, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1 AND order_information.id = '" + id +"';";
    
    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getByStatRental = (delivery_status, rental_status) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM order_information WHERE delivery_status = '" + delivery_status +"' AND rental_status = '" + delivery_status +"' AND  for_purchase=0;"

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

exports.remove = (session_id, id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteOrder('"+session_id+"', '"+id+"');";

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

exports.edit = (session_id, id, status) => {
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