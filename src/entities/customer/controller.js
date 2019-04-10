const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


exports.createSocial = (full_name, email_address, user_type) => {
	return new Promise((resolve, reject) => {
		var name = full_name.split(" ");
		var first_name = '';	
		var middle_name = '';
		var last_name = '';
		const name_len = name.length;

		
		for(i=0; i<name_len; i++){
			if(i===(name_len-1)){
				last_name = name[i];
			}else{
				first_name = first_name+name[i];
			}
		}
		

		const queryString = "CALL insertCustomerSocial('" + first_name+"', '" + middle_name+"', '" + last_name+"', '" + email_address+"', '" + user_type+"');";

		db.query(queryString, (err, rows) => {
	        if (err) {
	          console.log(err);
	          return reject(500);
	        }
	        return resolve(rows);
      });
	});
};

exports.create = (first_name, middle_name, last_name, email_address, password, contact_number, user_type, address, zip_code) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, function(err, hash) {
	        const queryString = "CALL insertCustomer('" + first_name+"', '" + middle_name+"', '" + last_name+"', '" + email_address+"', '" + hash+"', '" + contact_number+"', '" + user_type+"','" + address+"', '" +zip_code+"');";

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

exports.getByEmail = (email_address) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM user WHERE email_address='" + email_address+"' AND user_type='Customer';";

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getProfile = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT user.first_name, user.middle_name, user.last_name, user.email_address, user.contact_number, customer.id, customer.address, customer.zip_code, customer.image FROM user, customer WHERE customer.user_id = '" + id +"' AND  user.id=customer.user_id;";

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAll = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT user.first_name, user.middle_name, user.last_name, user.email_address, user.contact_number, customer.id, customer.user_id, customer.image FROM user, customer WHERE user.id=customer.user_id;";

		db.query(queryString, (err, rows) => {
	      if (err) {
	      	return reject(500);
	      }
	      return resolve(rows);
	      
	    });
	});
};

exports.getOneByName = (name) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT user.first_name, user.middle_name, user.last_name, user.email_address, user.contact_number, customer.id, customer.image FROM user, customer WHERE LOWER(CONCAT(user.first_name, user.middle_name, user.last_name)) REGEXP LOWER('.*" + name +".*') AND  user.id=customer.user_id;";

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


exports.edit = (session_id, id, address, zip_code, first_name, middle_name, last_name, email_address, contact_number, image) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editCustomer('"+session_id+"', '"+address+"', '"+zip_code+"', '"+first_name+"', '"+middle_name+"', '"+last_name+"', '"+email_address+"', '"+contact_number+"', '"+image+"');";
      const queryString2= "CALL insertLog(concat('Edited customer profile: ', '"+id+"'), 'Customer', '"+session_id+"');";

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