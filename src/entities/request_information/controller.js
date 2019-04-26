const db = require('../../database');
const nodemailer = require("nodemailer");

exports.sendRequest = (email_address, package_id, motif_id, menu_id) =>{
  return new Promise((resolve, reject) => {

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
          user: 'leirajanecatering@gmail.com',
          pass: 'arielsalvador123.' 
        }
      });
      let mailOptions = {
        from: '"Leira Jane Party Needs and Catering Services" <leirajanecatering@gmail.com>', 
        to: email_address, 
        subject: "Request for Catering Package sent", 
        text: "You have successfully sent your request for catering package with the following inclusions: \nPackage ID: " +package_id+ "\nMotif ID: " +motif_id+ "\nMenu ID: "+menu_id+ "Thank you for trusting Leira Jane Party Needs and Catering Services. We will get back to you as soon as we can.", 
        html: "<p>" +
                "You have successfully sent your request for catering package with the following inclusions:" +'<br/>'+ 
                "Package ID: " +package_id+ '<br/>'+
                "Motif ID: " +motif_id+ '<br/>'+
                "Menu ID: " +menu_id+ '<br/>'+
                "Thank you for trusting Leira Jane Party Needs and Catering Services. We will get back to you as soon as we can."+
              "</p>" 
      };
     
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(500);
        }
        return resolve(info); 
      });
  });
};

exports.create = (session_id, customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_time, event_location, number_of_persons, package_id, motif_id, menu_id,additional_request) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL addRequest('" +session_id+"','" +customer_first_name+"', '" +customer_middle_name+"', '" +customer_last_name+"', '" +customer_email+"', '" +customer_contact_number+"', (STR_TO_DATE('" +event_date+"', '%d-%m-%Y')), '" +event_time+"', '" +event_location+"', '" +number_of_persons+"', '" +package_id+"', '" +motif_id+"', '" +menu_id+"', '" +additional_request+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
  });
};

exports.getAll = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT *, CONCAT(DATE_FORMAT(event_date, '%e %b, %Y'),' ', TIME_FORMAT(event_time, '%H:%i:%s')) as date_time, CONCAT(DATE_FORMAT(request_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(request_timestamp, '%H:%i:%s')) as request_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2 FROM request_information;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getPendingCount = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT count(*) as count FROM request_information WHERE status='Pending';"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getInclusion = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT event_motif.name AS 'EventMotif', food_menu.name AS 'FoodMenu', package.name AS 'Package' FROM request_information, event_motif, food_menu, package WHERE request_information.package_id=package.id AND request_information.motif_id=event_motif.id AND request_information.menu_id=food_menu.id AND request_information.id = '"+id+"';"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};


exports.getByStatus = (status) =>{
  return new Promise((resolve, reject) => {

    var queryString;

    if(status==='All'){
      queryString = "SELECT *, CONCAT(DATE_FORMAT(event_date, '%e %b, %Y'),' ', TIME_FORMAT(event_time, '%H:%i:%s')) as date_time, CONCAT(DATE_FORMAT(request_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(request_timestamp, '%H:%i:%s')) as request_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2 FROM request_information;"
    }else{
      queryString = "SELECT *, CONCAT(DATE_FORMAT(event_date, '%e %b, %Y'),' ', TIME_FORMAT(event_time, '%h:%i:%s')) as date_time, CONCAT(DATE_FORMAT(request_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(request_timestamp, '%H:%i:%s')) as request_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2 FROM request_information WHERE status = '" + status +"';"
    }

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getOne = (id, status) =>{
  return new Promise((resolve, reject) => {

    var queryString;

    if(status==='All'){
      queryString = "SELECT *, CONCAT(DATE_FORMAT(event_date, '%e %b, %Y'),' ', TIME_FORMAT(event_time, '%H:%i:%s')) as date_time, CONCAT(DATE_FORMAT(request_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(request_timestamp, '%H:%i:%s')) as request_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2 FROM request_information WHERE id = '" + id +"';"
    }else{
      queryString = "SELECT *, CONCAT(DATE_FORMAT(event_date, '%e %b, %Y'),' ', TIME_FORMAT(event_time, '%H:%i:%s')) as date_time, CONCAT(DATE_FORMAT(request_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(request_timestamp, '%H:%i:%s')) as request_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2 FROM request_information WHERE id = '" + id +"' AND status='" + status +"';"
    }

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });

  });
};

exports.getOneSimple = (id) =>{
  return new Promise((resolve, reject) => {

    var queryString;

    queryString = "SELECT *, CONCAT(DATE_FORMAT(event_date, '%e %b, %Y'),' ', TIME_FORMAT(event_time, '%H:%i:%s')) as date_time, CONCAT(DATE_FORMAT(request_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(request_timestamp, '%H:%i:%s')) as request_timestamp2, CONCAT(DATE_FORMAT(update_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(update_timestamp, '%H:%i:%s')) as update_timestamp2 FROM request_information WHERE id = '" + id +"';"

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

      const queryString = "CALL deleteRequest('" + id +"');";
      const queryString2= "CALL insertLog(concat('Deleted Request: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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

exports.edit = (session_id, id, status) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editRequest('" + id +"', '" + status +"');";
      const queryString2= "CALL insertLog(concat('Edited Request Status: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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