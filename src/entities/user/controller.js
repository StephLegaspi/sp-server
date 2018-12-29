const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

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

exports.create = ( first_name, middle_name, last_name, email_address, password, contact_number ) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, function(err, hash) {
	    	const queryString = "INSERT INTO user(first_name, middle_name, last_name, email_address, password, contact_number) VALUES ('" + first_name+"', '" +middle_name+"', '" +last_name+"', '" +email_address+"', '" +hash+"', '" +contact_number+"');";

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


exports.edit = ( id, first_name, middle_name, last_name, email_address, password, contact_number ) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE user SET first_name = '"+first_name+"', middle_name = '"+middle_name+"', last_name = '"+last_name+"', email_address = '"+email_address+"', password = '"+password+"', contact_number = '"+contact_number+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};

exports.login = ( email, password ) => {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * from user where email_address = '" + email+"'";
    db.query(queryString, email, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      bcrypt.compare(password, rows[0].password, (error, isMatch) => {
        if (error) return reject(500);
        else if (!isMatch){
        	console.log(rows[0].password);
        	return reject(401);
        } 
        
        let user = rows[0];
        /*jwt.sign({user}, 'secretkey', { expiresIn: '10000s' }, (err, token) => {
		    return resolve("Bearer " + token);
		});*/
		const token = "Bearer " + jwt.sign({user}, 'secretkey', {'expiresIn': '10000s'});
		return resolve(token);
      });
    });
  });
};