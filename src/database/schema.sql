DROP USER IF EXISTS 'transactionserver'@'localhost';
CREATE USER 'transactionserver'@'localhost' IDENTIFIED BY 'transactionserver';

DROP DATABASE IF EXISTS transactionserver;
CREATE DATABASE transactionserver;

GRANT ALL PRIVILEGES ON transactionserver.* TO 'transactionserver'@'localhost';
GRANT EXECUTE ON transactionserver.* TO 'transactionserver'@'localhost';

USE transactionserver;
/*SET GLOBAL sql_mode = '';*/

CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(64),
    middle_name VARCHAR(64),
    last_name VARCHAR(64),
    email_address VARCHAR(64),
    password VARCHAR(64),
    contact_number VARCHAR(11)
);

CREATE TABLE administrator (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id)
);

CREATE TABLE customer (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(128),
    zip_code VARCHAR(16),
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id)
);

CREATE TABLE food_menu (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(256)
);

CREATE TABLE event_motif (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(256)
);

CREATE TABLE package (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(256)
);

CREATE TABLE request_information (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_first_name VARCHAR(64),
    customer_middle_name VARCHAR(64),
    customer_last_name VARCHAR(64),
    customer_email VARCHAR(64),
    customer_contact_number VARCHAR(11),
    event_date DATE NOT NULL,
    event_location VARCHAR(128),
    number_of_persons INT NOT NULL,
    request_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    package_id INT NOT NULL,
    FOREIGN KEY(package_id) REFERENCES package(id),
    motif_id INT NOT NULL,
    FOREIGN KEY(motif_id) REFERENCES event_motif(id),
    menu_id INT NOT NULL,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id),
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE product (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NOT NULL,
    price FLOAT NOT NULL,
    for_purchase BOOLEAN,
    display_product BOOLEAN
);

CREATE TABLE inventory (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    total_quantity INT NOT NULL,
    remaining INT NOT NULL,
    renewal_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(id),
    admin_id INT,
    FOREIGN KEY(admin_id) REFERENCES administrator(id)
);

CREATE TABLE product_color (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_color VARCHAR(64) NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(id)
);

CREATE TABLE shopping_cart (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    total_items INT NOT NULL DEFAULT 0,
    total_bill FLOAT NOT NULL DEFAULT 0.0,
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE shopping_cart_products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_quantity INT NOT NULL DEFAULT 0,
    rental_duration INT,
    product_total_price FLOAT NOT NULL DEFAULT 0.0,
    product_color_id INT NOT NULL,
    FOREIGN KEY(product_color_id) REFERENCES product_color(id),
    shopping_cart_id INT NOT NULL,
    FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart(id),
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(id)
);

CREATE TABLE order_information (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    consignee_first_name VARCHAR(64) NOT NULL,
    consignee_middle_name VARCHAR(64),
    consignee_last_name VARCHAR(64) NOT NULL,
    consignee_email VARCHAR(64) NOT NULL,
    consignee_contact_number VARCHAR(11) NOT NULL,
    delivery_address VARCHAR(128) NOT NULL,
    zip_code VARCHAR(16),
    status VARCHAR(16) DEFAULT "Pending",
    for_purchase BOOLEAN,
    order_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shopping_cart_id INT NOT NULL,
    FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart(id),
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE order_rental (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(id),
    product_quantity INT,
    order_timestamp TIMESTAMP,
    rental_duration INT,
    delivery_address VARCHAR(128),
    delivery_status VARCHAR(16) DEFAULT "Pending",
    rental_status VARCHAR(16) DEFAULT "On-rent",
    returned_timestamp DATE,
    order_id INT,
    FOREIGN KEY(order_id) REFERENCES order_information(id)
);


/*   PROCEDURES   */
DROP PROCEDURE IF EXISTS insert_product;
DELIMITER GO

/*GET ALL PRODUCTS*/
CREATE PROCEDURE getAllProducts()
BEGIN
    SELECT * FROM product;
END;
GO
/*INSERT CART PRODUCT*/
CREATE PROCEDURE insertCartProduct(product_quantity INT,
                                rental_duration INT,
                                product_color_id INT,
                                shopping_cart_id INT,
                                product_id INT)
BEGIN
    
    IF rental_duration > 0 THEN
        SET @price_total = product_quantity * rental_duration * (SELECT price FROM product WHERE id = product_id);
    ELSE
         SET @price_total = product_quantity * (SELECT price FROM product WHERE id = product_id);
    END IF;

    INSERT INTO shopping_cart_products(product_quantity, rental_duration, product_total_price, product_color_id, shopping_cart_id, product_id)
        values (product_quantity, rental_duration, (SELECT @price_total), product_color_id, shopping_cart_id, product_id);


    UPDATE shopping_cart SET total_items = total_items+product_quantity, total_bill = total_bill+ (SELECT @price_total) WHERE id = shopping_cart_id;
END;
GO
/*DELETE CART PRODUCT*/
CREATE PROCEDURE deleteCartProduct(ID2 INT)
BEGIN
    
    UPDATE shopping_cart SET total_items = total_items - (SELECT product_quantity FROM shopping_cart_products WHERE id = ID2), total_bill = total_bill - (SELECT product_total_price FROM shopping_cart_products WHERE id = ID2) WHERE id = (SELECT shopping_cart_id FROM shopping_cart_products WHERE id = ID2);

    DELETE FROM shopping_cart_products WHERE id = ID2;

END;
GO
/*GET PRODUCT PRICE*/
CREATE FUNCTION getProductPrice(shopping_cart_products_id INT) RETURNS FLOAT
BEGIN
    
    DECLARE prod_id INT;
    DECLARE price_prod FLOAT;

    SET prod_id = (SELECT product_id FROM shopping_cart_products WHERE id = shopping_cart_products_id);
    SET price_prod = (SELECT price FROM product WHERE id = prod_id);

    RETURN price_prod;

END;
GO
/*GET OLD QUANTITY*/
CREATE FUNCTION getOldQuantity(shopping_cart_products_id INT) RETURNS INT
BEGIN
    
    DECLARE old_quant INT;

    SET old_quant = (SELECT product_quantity FROM shopping_cart_products WHERE id = shopping_cart_products_id);

    RETURN old_quant;

END;
GO
/*GET OLD TOTAL PRICE*/
CREATE FUNCTION getOldTotalPrice(shopping_cart_products_id INT) RETURNS FLOAT
BEGIN
    
    DECLARE old_total INT;

    SET old_total = (SELECT product_total_price FROM shopping_cart_products WHERE id = shopping_cart_products_id);

    RETURN old_total;

END;
GO
/*GET NEW TOTAL PRICE*/
CREATE FUNCTION getNewTotalPrice(prod_quant INT, id INT, dur_rental INT) RETURNS FLOAT
BEGIN
    
    DECLARE new_price_total FLOAT;

    IF dur_rental > 0 THEN
        SET new_price_total = prod_quant * dur_rental * (SELECT getProductPrice(id));
    ELSE
        SET new_price_total = prod_quant * (SELECT getProductPrice(id));
    END IF;

    RETURN new_price_total;

END;
GO
/*EDIT CART PRODUCT*/
CREATE PROCEDURE editCartProduct(ID_s INT,
                                product_quant INT,
                                rental_dur INT,
                                product_color_id INT)
BEGIN
    
    /*SET @old_quantity = (SELECT product_quantity FROM shopping_cart_products WHERE id = id);

    SET @old_total_price = (SELECT product_total_price FROM shopping_cart_products WHERE id = id);*/

    

    /*SET @new_price_total = product_quant * (SELECT getProductPrice(id));*/
    UPDATE shopping_cart SET total_items = (total_items - (SELECT getOldQuantity(ID_s)))+product_quant, total_bill = (total_bill - (SELECT getOldTotalPrice(ID_s))) + (SELECT getNewTotalPrice(product_quant, ID_s, rental_dur)) WHERE id = (SELECT shopping_cart_id FROM shopping_cart_products WHERE id = ID_s);

    UPDATE shopping_cart_products SET product_quantity = product_quant, rental_duration = rental_dur, product_total_price =  (SELECT getNewTotalPrice(product_quant, ID_s, rental_dur)), product_color_id = product_color_id WHERE id = ID_s;


    
END;
GO
/*INSERT PRODUCT AND INVENTORY*/
CREATE PROCEDURE insertProduct(name1 varchar(64),
                                description1 varchar(128),
                                price1 INT,
                                for_purchase1 BOOLEAN,
                                display_product1 BOOLEAN,
                                total_quantity1 INT,
                                admin_id1 INT)
BEGIN
    INSERT INTO product(name, description, price, for_purchase, display_product)
        values (name1, description1, price1, for_purchase1, display_product1);

    INSERT INTO inventory(total_quantity, remaining, product_id, admin_id) values (total_quantity1, total_quantity1, LAST_INSERT_ID(), admin_id1);
END;
GO
/*(SELECT id FROM product WHERE name=name1 AND description=description1 AND price=price1 AND for_purchase=for_purchase1 AND display_product=display_product1)*/

/*DELETE PRODUCT AND INVENTORY*/
CREATE PROCEDURE deleteProduct(id_2 INT)
BEGIN

    DELETE FROM inventory WHERE product_id = id_2;
    DELETE FROM product_color WHERE product_id = id_2;
    DELETE FROM product WHERE id = id_2;

END;
GO
/*INSERT ORDER INFO*/
CREATE PROCEDURE insertOrder(consignee_first_name VARCHAR(64), 
                            consignee_middle_name VARCHAR(64), 
                            consignee_last_name VARCHAR(64), 
                            consignee_email VARCHAR(64), 
                            consignee_contact_number VARCHAR(11), 
                            delivery_address2 VARCHAR(128), 
                            zip_code VARCHAR(16),  
                            for_purchase BOOLEAN, 
                            shopping_cart_id2 INT, 
                            customer_id INT)
BEGIN

    DECLARE cart_prod_count INT DEFAULT 0;
    DECLARE ctr INT DEFAULT 0;
    DECLARE id_order INT;

    INSERT INTO order_information(consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, customer_id) VALUES (consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address2, zip_code, for_purchase, shopping_cart_id2, customer_id);

    SET id_order = LAST_INSERT_ID();
    SET cart_prod_count = (SELECT count(*) FROM shopping_cart_products);
    SET ctr = 0;

    IF for_purchase = 0 THEN
        WHILE ctr < cart_prod_count DO

            INSERT INTO order_rental(product_id, product_quantity, rental_duration) SELECT product_id, product_quantity, rental_duration FROM shopping_cart_products WHERE shopping_cart_id = shopping_cart_id2 LIMIT ctr,1;

            UPDATE order_rental SET delivery_address=delivery_address2, order_id= id_order WHERE id = LAST_INSERT_ID();

            SET ctr = ctr + 1;
        END WHILE;
    END IF;
   

END;
GO
/*EDIT ORDER_INFO*/
CREATE PROCEDURE editOrder(id_ord INT,
                        stat_ord VARCHAR(16))
BEGIN

    UPDATE order_information SET status=stat_ord WHERE id=id_ord;
    UPDATE order_rental SET delivery_status=stat_ord WHERE order_id=id_ord;
END;
GO
/*yo*/
DELIMITER ;