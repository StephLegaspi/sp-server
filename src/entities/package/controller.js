const db = require('../../database');

exports.create = (inclusion) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO package(inclusion) VALUES ('" +inclusion+"');";

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
    const queryString = "SELECT * FROM package;"

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
    const queryString = "SELECT * FROM package WHERE id = '" + id +"';"

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

      const queryString = "DELETE FROM package WHERE id = '" + id +"';";

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

exports.edit = (id, inclusion) => {
	return new Promise((resolve, reject) => {

      const queryString = "UPDATE package SET inclusion = '"+inclusion+"' WHERE id = '"+id+"';";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};