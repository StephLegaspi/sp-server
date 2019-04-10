const db = require('../../database');

const bcrypt    = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const nodemailer = require("nodemailer");

exports.resetPassword = (email_address, new_password) =>{
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
        subject: "Reset Password", 
        text: "New Password: " +new_password +'\n', 
        html: "<p>"+ "New Password: " +new_password+ '<br/>' + "Please make sure to change your password immediately." + "</p>"
      };
     
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(500);
        }
        return resolve(mailOptions); 
      });
  });
};


exports.findEmail = (email_address) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM user WHERE email_address = '" + email_address +"';"

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

exports.editPasswordByEmail = (email_address, new_password) => {
  return new Promise((resolve, reject) => {

      bcrypt.hash(new_password, salt, function(err, hash) {
          const queryString = "UPDATE user SET password='" + hash +"' WHERE email_address = '" + email_address +"';";

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

exports.loginAdmin = ( email, password ) => {
  const type = "Administrator";

  return new Promise((resolve, reject) => {
    const queryString = "SELECT * from user where email_address = '" + email+"' AND user_type = '" + type+"' ";
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

exports.loginCustomer = ( email, password ) => {
  const type = "Customer";

  return new Promise((resolve, reject) => {
    const queryString = "SELECT * from user where email_address = '" + email+"' AND user_type = '" + type+"' ";
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

exports.checkValidContact =  (contact_number) =>  {
  return new Promise((resolve, reject) => {
    let re = /^09[0-9]{9}$/;
    if(!re.test(contact_number)){
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

exports.checkEmailPass = ( email, password, session_id ) => {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * from user where email_address = '" + email+"' AND id='" + session_id+"';";
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