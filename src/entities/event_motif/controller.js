const db = require('../../database');

exports.create = (description) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO event_motif(description) VALUES ('" +description+"');";

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
    const queryString = "SELECT * FROM event_motif;"

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
    const queryString = "SELECT * FROM event_motif WHERE id = '" + id +"';"

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

      const queryString = "DELETE FROM event_motif WHERE id = '" + id +"';";

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