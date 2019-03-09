const db = require('../../database');

exports.create = (session_id, customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO request_information(customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id) VALUES ('" +customer_first_name+"', '" +customer_middle_name+"', '" +customer_last_name+"', '" +customer_email+"', '" +customer_contact_number+"', (STR_TO_DATE('" +event_date+"', '%d-%m-%Y')), '" +event_location+"', '" +number_of_persons+"', '" +package_id+"', '" +motif_id+"', '" +menu_id+"', '" +customer_id+"');";

      

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
    const queryString = "SELECT * FROM request_information;"

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
    const queryString = "SELECT event_motif.name AS 'Event Motif', food_menu.name AS 'Food Menu', package.name AS 'Package' FROM request_information, event_motif, food_menu, package WHERE request_information.package_id=package.id AND request_information.motif_id=event_motif.id AND request_information.menu_id=food_menu.id AND request_information.id = '"+id+"';"

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
    const queryString = "SELECT * FROM request_information WHERE status = '" + status +"';"

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

exports.getOne = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM request_information WHERE id = '" + id +"';"

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

      const queryString = "CALL deleteRequest('" + session_id +"', '" + id +"');";

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

exports.edit = (session_id, id, status) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editRequest('" + session_id +"', '" + id +"', '" + status +"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};