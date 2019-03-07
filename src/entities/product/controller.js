const db = require('../../database');

exports.getAllPurchase = () => {
	return new Promise((resolve, reject) => {
	    const queryString = "SELECT * FROM product WHERE for_purchase=1;";

	    db.query(queryString, (err, rows) => {
	      if (err) {
	      	return reject(500);
	      }
	      return resolve(rows);
	      
	    });
	});
};

exports.getAllRental = () => {
	return new Promise((resolve, reject) => {
	    const queryString = "SELECT * FROM product WHERE for_purchase=0;";

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
		const queryString = "SELECT * FROM product WHERE id = '" + id +"';"

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


exports.create = (user_id, name, description, price, for_purchase, display_product, total_quantity) => {
	return new Promise((resolve, reject) => {

      	const queryString = "CALL insertProduct('" + user_id +"', '" + name +"', '" + description +"', '" + price+"', '" + for_purchase +"', '" + display_product+"', '" + total_quantity +"');";

	    db.query(queryString, (err, results) => {
	        if (err) {
	          console.log(err);
	          return reject(500);
	        }
	        return resolve(results);
	    });
    });
};

exports.edit = (user_id, id, name, description, price, display_product) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL updateProduct('"+user_id+"', '"+id+"', '"+name+"', '"+description+"', '"+price+"', '"+display_product+"')";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.remove = (user_id, id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteProduct('" + user_id +"', '" + id +"');";

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