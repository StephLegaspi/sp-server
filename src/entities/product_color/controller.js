const db = require('../../database');


exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM product_color;"

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
		const queryString = "SELECT * FROM product_color WHERE product_id = '" + id +"';"

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

exports.getQuantityByID = (id) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT product_quantity FROM product_color WHERE product_id = '" + id +"';"

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


exports.edit = (product_id, product_quantity, product_color, user_id) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL updateProductColorQuantity('"+product_id+"', '"+product_quantity+"', '"+product_color+"')";
      const queryString2= "CALL insertLog(concat('Edited Product Quantity: ', '"+product_id+"'), 'Administrator', '"+user_id+"');";

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