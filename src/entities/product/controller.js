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

exports.getOneModal = (id) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT id, description, price FROM product WHERE id = '" + id +"';"

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

exports.create = (user_id, name, description, price, for_purchase, display_product, total_quantity,admin_id) => {
	return new Promise((resolve, reject) => {

      	const queryString = "CALL insertProduct('" + user_id +"', '" + name +"', '" + description +"', '" + price+"', '" + for_purchase +"', '" + display_product+"', '" + total_quantity +"', '" + admin_id+"');";

	    db.query(queryString, (err, results) => {
	        if (err) {
	          console.log(err);
	          return reject(500);
	        }
	        return resolve(results);
	    });
    });
};

exports.edit = (user_id, id, name, description, price, for_purchase, display_product, total_quantity ) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL updateProduct('"+user_id+"', '"+id+"', '"+name+"', '"+description+"', '"+price+"', '"+for_purchase+"', '"+display_product+"', '"+total_quantity+"')";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.disable = (user_id, id, display_product) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL disableProduct('"+user_id+"', '"+id+"', '"+display_product+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.enable = (user_id, id, display_product) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL enableProduct('"+user_id+"', '"+id+"', '"+display_product+"');";

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