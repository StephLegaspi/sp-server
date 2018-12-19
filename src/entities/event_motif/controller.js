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