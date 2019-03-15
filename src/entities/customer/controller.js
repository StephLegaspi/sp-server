const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


exports.create = (session_id, first_name, middle_name, last_name, email_address, password, contact_number, user_type, address, zip_code) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, function(err, hash) {
	        const queryString = "CALL insertCustomer('" + session_id+"', '" + first_name+"', '" + middle_name+"', '" + last_name+"', '" + email_address+"', '" + hash+"', '" + contact_number+"', '" + user_type+"','" + address+"', '" +zip_code+"');";

	        db.query(queryString, (err, results) => {
	            if (err) {
	              console.log(err);
	              return reject(500);
	            }
	            return resolve(results);
	        });
	    });

	});
};

exports.getAll = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT user.first_name, user.middle_name, user.last_name, user.email_address, user.contact_number, customer.id, customer.user_id FROM user, customer WHERE user.id=customer.user_id;";

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

exports.getByUserID = (id) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM customer WHERE user_id = '" + id +"';"

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
		const queryString = "SELECT customer.id, user.first_name, user.middle_name, user.last_name, user.email_address, user.contact_number FROM customer, user WHERE customer.id = '" + id +"' AND customer.user_id=user.id;"

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

exports.edit = (session_id, id, address, zip_code) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editCustomer('"+session_id+"', '"+id+"', '"+address+"', '"+zip_code+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};