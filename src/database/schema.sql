DROP USER IF EXISTS 'transactionserver'@'localhost';
CREATE USER 'transactionserver'@'localhost' IDENTIFIED BY 'transactionserver';

DROP DATABASE IF EXISTS transactionserver;
CREATE DATABASE transactionserver;

GRANT ALL PRIVILEGES ON transactionserver.* TO 'transactionserver'@'localhost';
GRANT EXECUTE ON transactionserver.* TO 'transactionserver'@'localhost';

USE transactionserver;

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
	price FLOAT NOT NULL
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
    product_quantity INT NOT NULL DEFAULT 1,
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
	consignee_first_name VARCHAR(64),
    consignee_middle_name VARCHAR(64),
    consignee_last_name VARCHAR(64),
    consignee_email VARCHAR(64),
    consignee_contact_number VARCHAR(11),
    delivery_address VARCHAR(128),
    zip_code VARCHAR(16),
    status VARCHAR(16),
    order_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shopping_cart_id INT NOT NULL,
    FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart(id),
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE inventory (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	total_quantity INT NOT NULL,
	remaining INT NOT NULL,
	is_rented BOOLEAN,
	is_purchased BOOLEAN,
	date_purchased DATE,
	date_rented DATE,
	rental_address VARCHAR(128),
    outofstock_date TIMESTAMP NULL,
    renewal_date TIMESTAMP NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(id),
    admin_id INT,
    FOREIGN KEY(admin_id) REFERENCES administrator(id)
);


/*   PROCEDURES   */
DROP PROCEDURE IF EXISTS insert_product;
DELIMITER GO

/*INSERT PRODUCT*/
CREATE PROCEDURE insertProduct(name varchar(64),
                                description varchar(128),
                                price INT)
BEGIN
    INSERT INTO product(name, description, price)
        values (name, description, price);
END;
GO
/*GET ALL PRODUCTS*/
CREATE PROCEDURE getAllProducts()
BEGIN
    SELECT * FROM product;
END;
GO
/*INSERT CART PRODUCT*/
CREATE PROCEDURE insertCartProduct(product_quantity INT,
                                product_color_id INT,
                                shopping_cart_id INT,
                                product_id INT)
BEGIN
    INSERT INTO shopping_cart_products(product_quantity, product_color_id, shopping_cart_id, product_id)
        values (product_quantity, product_color_id, shopping_cart_id, product_id);

    UPDATE shopping_cart_products SET product_total_price = product_quantity * (SELECT price FROM product WHERE id = product_id);

    UPDATE shopping_cart SET total_items = total_items+product_quantity, total_bill = total_bill+product_total_price WHERE id = shopping_cart_id;
END;
GO

DELIMITER ;

call insertProduct("Circle-shaped Balloon", "Balloons perfect for any type of event.", 6);
call insertProduct("Heart-shaped Balloon", "Balloons perfect for any type of event.", 10);
call insertProduct("Party Hat", "Party hats for kiddie party.", 15);
