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

exports.searchNamePurchase = (name) => {
	return new Promise((resolve, reject) => {
	   const queryString = "select *, CONCAT(DATE_FORMAT(renewal_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(renewal_timestamp, '%H:%i:%s')) as date_time FROM inventory, product WHERE inventory.product_id = product.id AND LOWER(product.name) REGEXP LOWER('.*" + name +".*') AND product.for_purchase=1 order by name asc;"

	    db.query(queryString, (err, rows) => {
	      if (err) {
	      	return reject(500);
	      }
	      return resolve(rows);
	      
	    });
	});
};

exports.searchNameRental = (name) => {
	return new Promise((resolve, reject) => {
	   const queryString = "select *, CONCAT(DATE_FORMAT(renewal_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(renewal_timestamp, '%H:%i:%s')) as date_time FROM inventory, product WHERE inventory.product_id = product.id AND LOWER(product.name) REGEXP LOWER('.*" + name +".*') AND product.for_purchase=0 order by name asc;"

	    db.query(queryString, (err, rows) => {
	      if (err) {
	      	return reject(500);
	      }
	      return resolve(rows);
	      
	    });
	});
};

exports.getAllPurchase = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "select *, CONCAT(DATE_FORMAT(renewal_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(renewal_timestamp, '%H:%i:%s')) as date_time FROM inventory, product WHERE inventory.product_id = product.id AND product.for_purchase=1 order by name asc;"

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

exports.getAllRental = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "select *, CONCAT(DATE_FORMAT(renewal_timestamp, '%e %b, %Y'),' ', TIME_FORMAT(renewal_timestamp, '%H:%i:%s')) as date_time FROM inventory, product WHERE inventory.product_id = product.id AND product.for_purchase=0 order by name asc;"

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

/*exports.getByProdNamePurchase = (name) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM inventory, product WHERE inventory.product_id=product.id AND LOWER(product.name) = LOWER('" + name +"') AND product.for_purchase=1;"

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

exports.getByProdNameRental = (name) =>{
	return new Promise((resolve, reject) => {
		const queryString = "SELECT * FROM inventory, product WHERE inventory.product_id=product.id AND LOWER(product.name) = LOWER('" + name +"') AND product.for_purchase=0;"

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
};*/

exports.getOutOfStockPurchaseCount = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "select count(*) as count from inventory, product WHERE inventory.product_id=product.id AND inventory.remaining<=(0.30*inventory.total_quantity) AND product.for_purchase=1;"

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

exports.getOutOfStockRentalCount = () =>{
	return new Promise((resolve, reject) => {
		const queryString = "select count(*) as count from inventory, product WHERE inventory.product_id=product.id AND inventory.remaining<=0 AND product.for_purchase=0;"

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
		const queryString = "select product.name, product.id, inventory.total_quantity, inventory.remaining from inventory, product where inventory.product_id=product.id AND product.for_purchase=1 AND inventory.remaining<=(0.30*inventory.total_quantity);";

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
		const queryString = "select product.name, product.id, inventory.total_quantity, inventory.remaining from inventory, product where inventory.product_id=product.id AND product.for_purchase=0 AND inventory.remaining<=0;";

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

exports.editPurchase = (session_id, id, total_quantity) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editInventory('"+id+"', '"+total_quantity+"')";
      const queryString2= "CALL insertLog(concat('Edited Inventory: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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

exports.editRental = (session_id, id, total_quantity) => {
	return new Promise((resolve, reject) => {

      const queryString = "CALL editInventoryRental('"+id+"', '"+total_quantity+"')";
      const queryString2= "CALL insertLog(concat('Edited Inventory: ', '"+id+"'), 'Administrator', '"+session_id+"');";

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