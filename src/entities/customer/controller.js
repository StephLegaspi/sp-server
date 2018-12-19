const db = require('../../database');


exports.create = ( address, zip_code, user_id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO customer(address, zip_code, user_id ) VALUES ('" + address+"', '" +zip_code+"', '" +user_id+"');";

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
		const queryString = "SELECT * FROM customer;"

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
		const queryString = "SELECT * FROM customer WHERE id = '" + id +"';"

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

exports.edit = ( id, address, zip_code, user_id ) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE customer SET address = '"+address+"', zip_code = '"+zip_code+"', user_id = '"+user_id+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};