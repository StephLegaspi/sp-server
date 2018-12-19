const db = require('../../database');


exports.create = ( product_color, product_id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO product_color(product_color, product_id) VALUES ('" + product_color+"', '" +product_id+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};