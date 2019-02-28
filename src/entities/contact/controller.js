const db = require('../../database');

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM contact_details;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.edit = (session_id, telephone_number, mobile_number, email_address, business_address) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editContact('"+session_id+"', '"+telephone_number+"', '"+mobile_number+"', '"+email_address+"', '"+business_address+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};