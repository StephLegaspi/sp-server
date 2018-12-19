const db = require('../../database');


exports.create = (user_id) => {
	return new Promise((resolve, reject) => {

      const queryString = "INSERT INTO administrator(user_id) VALUES ('" +user_id+"');";

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
    const queryString = "SELECT * FROM administrator;"

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
    const queryString = "SELECT * FROM administrator WHERE id = '" + id +"';"

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

      const queryString = "DELETE FROM administrator WHERE id = '" + id +"';";

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