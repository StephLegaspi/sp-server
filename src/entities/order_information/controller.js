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
    const queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number,  order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1;"

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
    const queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id, order_rental.rental_status FROM order_information, shopping_cart, order_rental WHERE order_information.shopping_cart_id=shopping_cart.id AND order_information.id=order_rental.order_id AND order_information.for_purchase=0;"

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

    var queryString;
    if(delivery_status==='Delivered'){
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1 AND order_information.status = '" + delivery_status +"' ORDER BY order_timestamp DESC;";
    }else{
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1 AND order_information.status = '" + delivery_status +"';";
    }

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getByRentalStatus = (rental_status) =>{
  return new Promise((resolve, reject) => {

    var queryString;
    if(rental_status==='Returned'){
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart, order_rental WHERE order_information.shopping_cart_id=shopping_cart.id AND order_information.id=order_rental.order_id AND  order_information.for_purchase=0 AND order_rental.rental_status = '" + rental_status +"' ORDER BY order_timestamp DESC;";
    }else{
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart, order_rental WHERE order_information.shopping_cart_id=shopping_cart.id AND order_information.id=order_rental.order_id AND  order_information.for_purchase=0 AND order_rental.rental_status = '" + rental_status +"';";
    }

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getOnePurchase = (id, status) =>{
  return new Promise((resolve, reject) => {
    
    var queryString
    if(status==='All'){
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1 AND order_information.id = '" + id +"';";
    }else{

      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=1 AND order_information.id = '" + id +"' AND order_information.status='" + status +"';";
    }

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getOneRental = (id, rental_status) =>{
  return new Promise((resolve, reject) => {
    var queryString;
    if(rental_status==='All'){
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart WHERE order_information.shopping_cart_id=shopping_cart.id AND  order_information.for_purchase=0 AND order_information.id = '" + id +"';";
    }else{
      queryString = "SELECT order_information.consignee_first_name, order_information.consignee_middle_name, order_information.consignee_last_name, order_information.consignee_email, consignee_contact_number, order_information.id, order_information.delivery_address, order_information.zip_code, CONCAT(DATE_FORMAT(order_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(order_timestamp, '%H:%i:%s')) as order_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2, shopping_cart.total_items, shopping_cart.total_bill, order_information.status, order_information.shopping_cart_id, order_information.customer_id FROM order_information, shopping_cart, order_rental WHERE order_information.shopping_cart_id=shopping_cart.id AND order_information.id=order_rental.order_id AND  order_information.for_purchase=0 AND order_rental.rental_status = '" + rental_status +"' AND order_information.id = '" + id +"';";
    }


      db.query(queryString, (err, rows) => {
        if (err) {
          console.log(err);
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

exports.removeOrderPurchase = (session_id, id) => {
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

exports.removeOrderRental = (session_id, id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteOrderRental('"+session_id+"', '"+id+"');";

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
      const queryString2= "CALL insertLog(concat('Edited Order Status: ', '"+id+"'), 'Administrator', '"+session_id+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        if (!results.affectedRows) {
          return reject(404);
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