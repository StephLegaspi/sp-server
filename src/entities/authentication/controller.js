const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


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
        	return reject(404);
        } 
        return resolve(rows[0]);
      });
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