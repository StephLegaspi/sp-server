const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.editPassword = (session_id, id, new_password, confirm_password) => {
  return new Promise((resolve, reject) => {

    if(new_password === confirm_password){
      bcrypt.hash(new_password, salt, function(err, hash) {
          const queryString = "CALL changePassword('" + session_id +"', '" + hash +"');";

          db.query(queryString, (err, results) => {
              if (err) {
                console.log(err);
                return reject(500);
              }
              return resolve(results);
          });
      });
  }else{ return reject(401); }
  });
};

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

      const queryString = "CALL editUser('" + id +"', '" + first_name +"', '" + middle_name +"', '" + last_name +"', '" + email_address +"', '" + contact_number +"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

