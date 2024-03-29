const db = require('../../database');

exports.create = (session_id, name, main_course, appetizer, dessert, soup, beverage, others) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL insertMenu('" +session_id+"', '" +name+"', '" +main_course+"', '" +appetizer+"', '" +dessert+"', '" +soup+"', '" +beverage+"', '" +others+"');";

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
    const queryString = "SELECT * FROM food_menu order by name asc;"

      db.query(queryString, (err, rows) => {
        if (err) {
          return reject(500);
        }
        return resolve(rows);
        
      });
  });
};

exports.getAllThree = () =>{
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM food_menu LIMIT 3;"

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
    const queryString = "SELECT id, name FROM food_menu;"

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

exports.searchName = (name) =>{
  return new Promise((resolve, reject) => {
    const queryString = "select * from food_menu where LOWER(name) REGEXP LOWER('.*" + name +".*') order by name asc;"

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

      const queryString = "CALL deleteMenu('" +id+"');";
      const queryString2= "CALL insertLog(concat('Deleted Food Menu: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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

exports.edit = (session_id, name, main_course, appetizer, dessert, soup, beverage, others, id) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editMenu('" +name+"', '" +main_course+"','" +appetizer+"', '" +dessert+"', '" +soup+"', '" +beverage+"', '" +others+"', '" +id+"');";
      const queryString2= "CALL insertLog(concat('Edited Food Menu: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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