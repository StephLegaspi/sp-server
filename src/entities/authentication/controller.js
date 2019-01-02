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

exports.create = ( first_name, middle_name, last_name, email_address, password, contact_number, user_type) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
        const queryString = "INSERT INTO user(first_name, middle_name, last_name, email_address, password, contact_number, user_type) VALUES ('" + first_name+"', '" +middle_name+"', '" +last_name+"', '" +email_address+"', '" +hash+"', '" +contact_number+"', '" +user_type+"');";

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

exports.checkValidEmail =  (email) =>  {
  return new Promise((resolve, reject) => {
    let re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    if(!re.test(email)){
      return reject(400);
    }else{
      
      return resolve();
    } 
  });
};

exports.checkEmailExists = (email) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM user WHERE email_address = '" +email+"';"

    db.query(queryString, email, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (res.length) return reject(406);

      return resolve();
    });
  });
};