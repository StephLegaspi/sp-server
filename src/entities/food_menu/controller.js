const db = require('../../database');

exports.create = (session_id, main_course, appetizer, dessert, soup, beverage, others) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL insertMenu('" +session_id+"', '" +main_course+"', '" +appetizer+"', '" +dessert+"', '" +soup+"', '" +beverage+"', '" +others+"');";

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
    const queryString = "SELECT * FROM food_menu;"

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
    const queryString = "SELECT * FROM food_menu WHERE id = '" + id +"';"

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

exports.getOneMainCourse = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM main_course WHERE menu_id = '" + id +"';"

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

exports.getOneAppetizer = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM appetizer WHERE menu_id = '" + id +"';"

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

exports.getOneDessert = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM dessert WHERE menu_id = '" + id +"';"

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

exports.getOneSoup = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM soup WHERE menu_id = '" + id +"';"

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

exports.getOneBeverage = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM beverage WHERE menu_id = '" + id +"';"

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

exports.getOneOthers = (id) =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM others WHERE menu_id = '" + id +"';"

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

      const queryString = "CALL deleteMenu('" +session_id+"', '" +id+"');";

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

exports.edit = (session_id, id, description) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editMenu('" +session_id+"', '" +id+"', '" +description+"');";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};