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