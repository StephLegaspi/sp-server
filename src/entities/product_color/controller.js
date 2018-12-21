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

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM product_color;"

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

exports.remove = ( id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "DELETE FROM product_color WHERE id = '" + id +"';";

      db.query(queryString, (err, rows) =>{
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

exports.edit = ( id, product_color, product_id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE product_color SET product_color = '"+product_color+"', product_id = '"+product_id+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};