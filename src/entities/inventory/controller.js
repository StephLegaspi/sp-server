const db = require('../../database');

exports.getAll = () => {
	return new Promise((resolve, reject) => {
	    const queryString = "SELECT * from inventory";

	    db.query(queryString, (err, rows) => {
	      if (err) {
	      	return reject(500);
	      }
	      return resolve(rows);
	      
	    });
	});
};

exports.getByID = (id) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM inventory WHERE id = '" + id +"';"

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

exports.getByProdName = (name) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM inventory, product WHERE inventory.product_id=product.id AND LOWER(product.name) = LOWER('" + name +"');"

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

exports.getOutOfStockPurchase = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "CALL getInventoryOutOfStockPurchase();"

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

exports.getOutOfStockRental = (id) =>{
	return new Promise((resolve, reject) => {
		const queryString = "select * from inventory, product where inventory.product_id=product.id AND product.for_purchase=0 AND inventory.remaining=0;";

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

exports.edit = (session_id, id, total_quantity, remaining) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editInventory('"+session_id+"', '"+id+"', '"+total_quantity+"', '"+remaining+"')";

      db.query(queryString, (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results);
      });
    });
};