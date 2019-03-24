const db = require('../../database');
const nodemailer = require("nodemailer");

exports.sendMessage = (full_name, email_address, contact_number, message) =>{
  return new Promise((resolve, reject) => {

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
          user: 'steph061099@gmail.com',
          pass: 'twilightsaga1' 
        }
      });
      let mailOptions = {
        from: '"Stephanie Legaspi" <steph061099@gmail.com>', 
        to: email_address, 
        subject: "(LJPNCS) Inquiry from: " + full_name, 
        text: full_name +'\n'+ contact_number +'\n'+ '\n'+ message, 
        html: "<b>" +full_name +'<br/>' +contact_number +'<br/>'+ '<br/>'+ message+ "</b>" 
      };
     
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(500);
        }
        return resolve(info); 
      });
  });
};

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