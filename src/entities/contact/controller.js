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

      const queryString = "CALL editContact('"+telephone_number+"', '"+mobile_number+"', '"+email_address+"', '"+business_address+"');";
      const queryString2= "CALL insertLog(concat('Edited Contact Details: ', 1), 'Administrator', '"+session_id+"');";

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