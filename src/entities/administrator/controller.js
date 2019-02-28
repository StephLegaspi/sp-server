const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


exports.create = (session_id, first_name, middle_name, last_name, email_address, password, contact_number, user_type) => {
	return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, function(err, hash) {
        const queryString = "CALL insertAdmin('" + session_id +"', '" + first_name +"', '" + middle_name +"', '" + last_name +"', '" + email_address +"', '" + hash +"', '" + contact_number +"', '" + user_type +"');";

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
    const queryString = "SELECT * FROM administrator;"

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
    const queryString = "SELECT * FROM administrator WHERE id = '" + id +"';"

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

exports.remove = (session_id, id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteAdmin('" + session_id +"', '" + id +"');";

      db.query(queryString, (err, results) => {
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