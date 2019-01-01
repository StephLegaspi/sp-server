const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


exports.getAll = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM user;"

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
		const queryString = "SELECT * FROM user WHERE id = '" + id +"';"

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

exports.edit = (session_id, id, first_name, middle_name, last_name, email_address, contact_number ) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editUser('" + session_id+"', '" + id +"', '" + first_name +"', '" + middle_name +"', '" + last_name +"', '" + email_address +"', '" + contact_number +"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};