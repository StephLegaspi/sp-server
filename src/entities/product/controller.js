const db = require('../../database');

exports.getAll = () => {
	return new Promise((resolve, reject) => {
	    const queryString = "SELECT * FROM product;";

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

exports.create = (name, description, price, for_purchase, display_product, total_quantity,admin_id) => {
	return new Promise((resolve, reject) => {

      	const queryString = "CALL insertProduct('" + name +"', '" + description +"', '" + price+"', '" + for_purchase +"', '" + display_product+"', '" + total_quantity +"', '" + admin_id+"');";

	    db.query(queryString, (err, results) => {
	        if (err) {
	          console.log(err);
	          return reject(500);
	        }
	        return resolve(results);
	    });
    });
};

exports.edit = ( id, name, description, price, for_purchase ) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE product SET name = '"+name+"', description = '"+description+"', price = '"+price+"', for_purchase = '"+for_purchase+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.disable = (id, display_product) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE product SET display_product = '"+display_product+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.enable = (id, display_product) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE product SET display_product = '"+display_product+"' WHERE id = '"+id+"';";

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

      const queryString = "CALL deleteProduct('" + id +"');";

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