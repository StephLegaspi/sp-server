const db = require('../../database');

exports.create = (session_id, name, inclusion, price) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL insertPackage('" +session_id+"', '" +name+"', '" +inclusion+"', '" +price+"');";

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
    const queryString = "select * from package where LOWER(name)=LOWER('"+name+"');"

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

exports.getThree = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM package LIMIT 3;"

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
    const queryString = "SELECT id, name FROM package;"

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

exports.getOneInclusion = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM package_inclusion WHERE package_id = '" + id +"';"

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

      const queryString = "CALL deletePackage('" +id+"');";
      const queryString2= "CALL insertLog(concat('Deleted Package: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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

exports.edit = (session_id, name, inclusion, price, id) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editPackage('" +name+"', '" +inclusion+"', '" +price+"', '" +id+"');";
      const queryString2= "CALL insertLog(concat('Edited Package: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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