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


exports.searchNamePurchase = (name) =>{
  return new Promise((resolve, reject) => {
    const queryString = "select * from product where LOWER(name) REGEXP LOWER('.*" + name +".*') AND for_purchase=1;"

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });
  });
};

exports.searchNameRental = (name) =>{
  return new Promise((resolve, reject) => {
    const queryString = "select * from product where LOWER(name) REGEXP LOWER('.*" + name +".*') AND for_purchase=0;"

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


exports.create = (user_id, name, description, price, for_purchase, display_product, total_quantity, product_color, image) => {
	return new Promise((resolve, reject) => {

      	const queryString = "CALL insertProduct('" + user_id +"', '" + name +"', '" + description +"', '" + price+"', '" + for_purchase +"', '" + display_product+"', '" + total_quantity +"', '" + product_color +"', '" + image +"');";

	    db.query(queryString, (err, results) => {
	        if (err) {
	          console.log(err);
	          return reject(500);
	        }
	        return resolve(results);
	    });
    });
};

exports.edit = (user_id, id, name, description, price, display_product, product_color) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL updateProduct('"+id+"', '"+name+"', '"+description+"', '"+price+"', '"+display_product+"', '"+product_color+"')";
      const queryString2= "CALL insertLog(concat('Edited Product: ', '"+id+"'), 'Administrator', '"+user_id+"');";

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

exports.remove = (user_id, id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteProduct('" + id +"');";
      const queryString2= "CALL insertLog(concat('Deleted Product: ', '"+id+"'), 'Administrator', '"+user_id+"');";

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