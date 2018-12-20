const db = require('../../database');

exports.create = (customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO request_information(customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id) VALUES ('" +customer_first_name+"', '" +customer_middle_name+"', '" +customer_last_name+"', '" +customer_email+"', '" +customer_contact_number+"', '" +event_date+"', '" +event_location+"', '" +number_of_persons+"', '" +package_id+"', '" +motif_id+"', '" +menu_id+"', '" +customer_id+"');";

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

exports.remove = (id) => {
  return new Promise((resolve, reject) => {

      const queryString = "DELETE FROM request_information WHERE id = '" + id +"';";

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

exports.edit = (id, customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE request_information SET customer_first_name = '"+customer_first_name+"', customer_middle_name = '"+customer_middle_name+"', customer_last_name = '"+customer_last_name+"', customer_email = '"+customer_email+"', customer_contact_number = '"+customer_contact_number+"', event_date = '"+event_date+"', event_location = '"+event_location+"', number_of_persons = '"+number_of_persons+"', package_id = '"+package_id+"', motif_id = '"+motif_id+"', menu_id = '"+menu_id+"', customer_id = '"+customer_id+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};