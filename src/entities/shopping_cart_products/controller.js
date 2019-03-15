const db = require('../../database');

exports.create = (product_quantity, rental_duration, product_color_id, shopping_cart_id, product_id) => {
	return new Promise((resolve, reject) => {

      var queryString;

      if(rental_duration > 0){
        queryString = "CALL insertCartProductRental('" +product_quantity+"', '" +rental_duration+"', '" +product_color_id+"', '"+shopping_cart_id+"', '" +product_id+"');";
      }else{
        queryString = "CALL insertCartProductPurchase('" +product_quantity+"', '" +rental_duration+"', '" +product_color_id+"', '"+shopping_cart_id+"', '" +product_id+"');";
      }

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
    const queryString = "SELECT * FROM shopping_cart_products;"

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
    const queryString = "SELECT product.id, product.name, product.price, shopping_cart_products.id as sc_id, shopping_cart_products.product_quantity, shopping_cart_products.product_color_name FROM shopping_cart_products, product WHERE shopping_cart_products.product_id=product.id AND shopping_cart_id = '" + id +"';"

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.remove = ( id ) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteCartProduct('" + id +"');";

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

exports.edit = (id, product_quantity, rental_duration, product_color_id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL editCartProduct('" + id +"', '" + product_quantity +"','" + rental_duration +"', '" + product_color_id +"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};