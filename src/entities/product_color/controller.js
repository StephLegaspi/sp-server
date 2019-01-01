const db = require('../../database');


exports.create = (session_id, product_color, product_id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL insertProductColor('" + session_id+"', '" + product_color+"', '" +product_id+"');";

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

exports.remove = (session_id, id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL deleteProductColor('" + session_id+"', '" +id+"');";

      db.query(queryString, (err, results) =>{
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

exports.edit = (session_id, id, product_color) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editProductColor('" + session_id+"', '" +id+"', '" +product_color+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};