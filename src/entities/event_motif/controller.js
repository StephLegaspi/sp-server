const db = require('../../database');

exports.create = (session_id, name, description, image_files) => {
	return new Promise((resolve, reject) => {
      const queryString = "CALL insertMotif('" +session_id+"', '" +name+"', '" +description+"', '" +image_files+"');";

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

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllFour = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM event_motif LIMIT 4;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllNames = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT id, name FROM event_motif;"

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
    const queryString = "SELECT event_motif.name, event_motif.description, event_motif_image.image FROM event_motif, event_motif_image WHERE event_motif_image.motif_id = '" + id +"' AND event_motif_image.motif_id = event_motif.id;"

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });
  });
};

exports.searchName = (name) =>{
  return new Promise((resolve, reject) => {
    const queryString = "select * from event_motif where LOWER(name) REGEXP LOWER('.*" + name +".*');"

    db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
    });
  });
};

exports.remove = (session_id, id) => {
  return new Promise((resolve, reject) => {

      const queryString = "CALL deleteMotif('" + id +"');";
      const queryString2= "CALL insertLog(concat('Deleted Event Motif: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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

exports.edit = (session_id, id, name, description) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editMotif('"+id+"', '"+name+"', '"+description+"');";
      const queryString2= "CALL insertLog(concat('Edited Event Motif: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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