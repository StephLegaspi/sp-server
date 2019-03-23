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
    password VARCHAR(256),
    contact_number VARCHAR(11),
    user_type VARCHAR(20)
);

CREATE TABLE administrator (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    image VARCHAR(256),
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
    name VARCHAR(64)
);

CREATE TABLE main_course (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(64),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id)
);

CREATE TABLE appetizer (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(64),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id)
);

CREATE TABLE dessert (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(64),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id)
);

CREATE TABLE soup (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(64),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id)
);

CREATE TABLE beverage (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(64),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id)
);

CREATE TABLE others (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(64),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES food_menu(id)
);

CREATE TABLE event_motif (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    description VARCHAR(256)
);

CREATE TABLE package (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    price FLOAT NOT NULL
);

CREATE TABLE package_inclusion (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    inclusion VARCHAR(256),
    package_id INT,
    FOREIGN KEY(package_id) REFERENCES package(id)
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
    status VARCHAR(64) DEFAULT 'Pending',
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
    display_product BOOLEAN,
    image VARCHAR(256)
);

CREATE TABLE inventory (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    total_quantity INT NOT NULL,
    remaining INT NOT NULL,
    renewal_timestamp TIMESTAMP NULL,
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
    for_purchase BOOLEAN,
    in_order BOOLEAN DEFAULT 0,
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE shopping_cart_products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_quantity INT NOT NULL DEFAULT 0,
    product_total_price FLOAT NOT NULL DEFAULT 0.0,
    product_color_name VARCHAR (64),
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
    for_purchase BOOLEAN,
    status VARCHAR(16) DEFAULT "Pending",
    order_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shopping_cart_id INT NOT NULL,
    FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart(id),
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE order_rental (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rental_duration INT,
    rental_status VARCHAR(16) DEFAULT "On-rent",
    returned_timestamp TIMESTAMP NULL,
    order_id INT,
    FOREIGN KEY(order_id) REFERENCES order_information(id)
);

CREATE TABLE log_record (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(256) NOT NULL,
    user_type VARCHAR(20) NOT NULL,
    user_id INT NOT NULL
);

CREATE TABLE contact_details (
    id INT NOT NULL PRIMARY KEY DEFAULT 1,
    telephone_number VARCHAR(20) NOT NULL,
    mobile_number VARCHAR(11) NOT NULL,
    email_address VARCHAR(64) NOT NULL,
    business_address VARCHAR(128) NOT NULL
);

CREATE TABLE FAQs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(256) NOT NULL,
    answer VARCHAR(256) NOT NULL
);


/*   PROCEDURES   */
DELIMITER GO

/*INSERT FAQ*/
CREATE PROCEDURE insertFAQ(session_id INT,
                        question2 VARCHAR(256),
                        answer2 VARCHAR(256))
BEGIN

    INSERT INTO FAQs(question, answer) VALUES(question2, answer2);
    CALL insertLog(concat('Added Frequently Asked Question: ', LAST_INSERT_ID()), 'Administrator', session_id);
END;
GO

/*EDIT FAQ*/
CREATE PROCEDURE editFAQ(id2 INT,
                        question2 VARCHAR(256),
                        answer2 VARCHAR(256))
BEGIN

    
    UPDATE FAQs SET question=question2, answer=answer2 WHERE id = id2;
END;
GO

/*DELETE FAQ*/
CREATE PROCEDURE deleteFAQ(id2 INT)
BEGIN

    DELETE FROM FAQs WHERE id=id2;
END;
GO

/*EDIT CONTACT*/
CREATE PROCEDURE editContact(telephone_number2 VARCHAR(20),
                        mobile_number2 VARCHAR(11),
                        email_address2 VARCHAR(64),
                        business_address2 VARCHAR(128))
BEGIN
    UPDATE contact_details SET telephone_number=telephone_number2, mobile_number=mobile_number2, email_address=email_address2, business_address=business_address2 WHERE id=1;
END;
GO

/*INSERT LOG RECORD*/
CREATE PROCEDURE insertLog(action2 VARCHAR(256),
                        user_type2 VARCHAR(20),
                        user_id2 INT)
BEGIN
    IF user_type2 = 'Customer' THEN
        INSERT INTO log_record(action, user_type, user_id) VALUES(action2, user_type2, (SELECT id from customer WHERE user_id = user_id2));
    ELSE
        INSERT INTO log_record(action, user_type, user_id) VALUES(action2, user_type2, (SELECT id from administrator WHERE user_id = user_id2));
    END IF;
END;
GO

/*GET ALL PRODUCTS*/
CREATE PROCEDURE getAllProducts()
BEGIN
    SELECT * FROM product;
END;
GO
/*INSERT CART PRODUCT PURCHASE*/
CREATE PROCEDURE insertCartProductPurchase(product_quantity INT,
                                product_color_id INT,
                                shopping_cart_id INT,
                                product_id INT)
BEGIN
    DECLARE total_price FLOAT;
    SET total_price = product_quantity * (SELECT price FROM product WHERE id = product_id);

    INSERT INTO shopping_cart_products(product_quantity, product_total_price, product_color_name, shopping_cart_id, product_id)
        values (product_quantity, total_price, (SELECT product_color from product_color WHERE id=product_color_id), shopping_cart_id, product_id);

    UPDATE shopping_cart SET total_items = total_items+product_quantity, total_bill = total_bill+ total_price WHERE id = shopping_cart_id;
END;
GO
/*INSERT CART PRODUCT RENTAL*/
CREATE PROCEDURE insertCartProductRental(product_quantity INT,
                                product_color_id INT,
                                shopping_cart_id INT,
                                product_id INT)
BEGIN
    DECLARE price_total FLOAT;
    SET price_total = product_quantity * (SELECT price FROM product WHERE id = product_id);

    INSERT INTO shopping_cart_products(product_quantity, product_total_price, product_color_name, shopping_cart_id, product_id)
        values (product_quantity, price_total, (SELECT product_color from product_color WHERE id=product_color_id), shopping_cart_id, product_id);

    UPDATE shopping_cart SET total_items = total_items+product_quantity, total_bill = total_bill+ price_total WHERE id = shopping_cart_id;
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
    
    DECLARE old_total FLOAT;

    SET old_total = (SELECT product_total_price FROM shopping_cart_products WHERE id = shopping_cart_products_id);

    RETURN old_total;

END;
GO
/*GET NEW TOTAL PRICE*/
CREATE FUNCTION getNewTotalPrice(prod_quant INT, id INT ) RETURNS FLOAT
BEGIN
    
    DECLARE new_price_total FLOAT;

   
    SET new_price_total = prod_quant * (SELECT getProductPrice(id));

    RETURN new_price_total;

END;
GO
/*EDIT CART PRODUCT*/
CREATE PROCEDURE editCartProduct(ID_s INT,
                                product_quant INT,
                                product_color_id INT)
BEGIN
    
    /*SET @old_quantity = (SELECT product_quantity FROM shopping_cart_products WHERE id = id);

    SET @old_total_price = (SELECT product_total_price FROM shopping_cart_products WHERE id = id);*/

    

    /*SET @new_price_total = product_quant * (SELECT getProductPrice(id));*/
    UPDATE shopping_cart SET total_items = (total_items - (SELECT getOldQuantity(ID_s)))+product_quant, total_bill = (total_bill - (SELECT getOldTotalPrice(ID_s))) + (SELECT getNewTotalPrice(product_quant, ID_s)) WHERE id = (SELECT shopping_cart_id FROM shopping_cart_products WHERE id = ID_s);

    UPDATE shopping_cart_products SET product_quantity = product_quant, product_total_price =  (SELECT getNewTotalPrice(product_quant, ID_s)), product_color_name = (SELECT product_color FROM product_color WHERE id=product_color_id) WHERE id = ID_s;


    
END;
GO

/*INSERT PRODUCT AND INVENTORY*/
CREATE PROCEDURE insertProduct(user_id1 INT,
                                name1 varchar(64),
                                description1 varchar(128),
                                price1 FLOAT,
                                for_purchase1 BOOLEAN,
                                display_product1 BOOLEAN,
                                total_quantity1 INT,
                                color_list VARCHAR(256),
                                image1 VARCHAR(256))
BEGIN
    DECLARE prod_ID1 INT;

    INSERT INTO product(name, description, price, for_purchase, display_product, image)
        values (name1, description1, price1, for_purchase1, display_product1, image1);

    SET prod_ID1 = LAST_INSERT_ID();
    INSERT INTO inventory(total_quantity, remaining, product_id, admin_id) values (total_quantity1, total_quantity1, prod_ID1, (SELECT id from administrator WHERE user_id = user_id1));

    CALL insertProductColor(color_list, prod_ID1);

    CALL insertLog(concat('Added product: ', prod_ID1), 'Administrator', user_id1);
END;
GO
/*DELETE PRODUCT AND INVENTORY*/
CREATE PROCEDURE deleteProduct(id_2 INT)
BEGIN

    DELETE FROM inventory WHERE product_id = id_2;
    DELETE FROM product_color WHERE product_id = id_2;
    DELETE FROM product WHERE id = id_2;

END;
GO
/*UPDATE PRODUCT AND INVENTORY*/
CREATE PROCEDURE updateProduct(id2 INT, 
                            name2 VARCHAR(64), 
                            description2 VARCHAR(128), 
                            price2 FLOAT,
                            display_product2 BOOLEAN,
                            product_color2 VARCHAR(256))
BEGIN

    UPDATE product SET name = name2, description = description2, price = price2, display_product = display_product2 WHERE id = id2;
    CALL deleteProductColor(id2);
    CALL insertProductColor(product_color2, id2);

END;
GO

/*UPDATE REMAINING IN INVENTORY TABLE*/
CREATE PROCEDURE updateRemaining(cart_prod_count INT,
                                cart_id INT)
BEGIN

    DECLARE iterator INT DEFAULT 0;
    DECLARE id_prod INT;
    DECLARE quantity_prod INT;

    SET iterator = 0;

    WHILE iterator < cart_prod_count DO

        SET id_prod = (SELECT product_id FROM shopping_cart_products WHERE shopping_cart_id=cart_id LIMIT iterator,1);
        SET quantity_prod = (SELECT product_quantity FROM shopping_cart_products WHERE shopping_cart_id=cart_id LIMIT iterator,1);
        UPDATE inventory SET remaining = remaining - quantity_prod WHERE product_id = id_prod;

        SET iterator = iterator + 1;
    END WHILE;

END;
GO
/*INSERT ORDER INFO*/
CREATE PROCEDURE insertOrder(session_id INT,
                            consignee_first_name VARCHAR(64), 
                            consignee_middle_name VARCHAR(64), 
                            consignee_last_name VARCHAR(64), 
                            consignee_email VARCHAR(64), 
                            consignee_contact_number VARCHAR(11), 
                            delivery_address2 VARCHAR(128), 
                            zip_code VARCHAR(16),  
                            for_purchase BOOLEAN, 
                            shopping_cart_id2 INT,
                            rental_dur INT)
BEGIN

    DECLARE cart_prod_count INT DEFAULT 0;
    DECLARE ctr INT DEFAULT 0;
    DECLARE id_order INT;

    INSERT INTO order_information(consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, customer_id) VALUES (consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address2, zip_code, for_purchase, shopping_cart_id2, (SELECT id FROM customer WHERE user_id=session_id));

    SET id_order = LAST_INSERT_ID();

    CALL insertLog(concat('Added order: ', id_order), 'Customer', session_id);
    
    SET cart_prod_count = (SELECT count(*) from shopping_cart_products);
    SET ctr = 0;

    IF for_purchase = 0 THEN      
    
        INSERT INTO order_rental(rental_duration, order_id) VALUES(rental_dur, id_order);

    END IF;
   
    CALL updateRemaining(cart_prod_count, shopping_cart_id2);
    UPDATE shopping_cart SET in_order=1 WHERE id = shopping_cart_id2;
END;
GO

/*EDIT ORDER_INFO*/
CREATE PROCEDURE editOrder(id_ord INT,
                        stat_ord VARCHAR(16))
BEGIN

    UPDATE order_information SET status=stat_ord WHERE id=id_ord;
END;
GO

/*RETURN ORDER RENTAL*/
CREATE PROCEDURE returnOrder(id_ord INT,
                        rental_stat VARCHAR(16))
BEGIN
    
    DECLARE id_cart INT;
    DECLARE counter INT;
    DECLARE count_cart_prod INT;
    DECLARE id_prod INT;
    DECLARE quantity_prod INT;
    DECLARE is_for_purchase BOOLEAN;

    SET counter = 0;
    SET count_cart_prod = (SELECT count(*) FROM shopping_cart_products);
    SET id_cart = (SELECT shopping_cart_id FROM order_information WHERE id = id_ord);
    SET is_for_purchase = (SELECT for_purchase FROM order_information WHERE id = id_ord);

    UPDATE order_rental SET rental_status=rental_stat WHERE order_id=id_ord;

        WHILE counter < count_cart_prod DO

            SET id_prod = (SELECT product_id FROM shopping_cart_products WHERE shopping_cart_id=id_cart LIMIT counter,1);
            SET quantity_prod = (SELECT product_quantity FROM shopping_cart_products WHERE shopping_cart_id=id_cart LIMIT counter,1);
            UPDATE inventory SET remaining = remaining + quantity_prod WHERE product_id = id_prod;

            SET counter = counter + 1;
        END WHILE;
END;
GO

/*DELETE ORDER*/
CREATE PROCEDURE deleteOrder(session_id INT,
                            id3 INT)
BEGIN

    DELETE FROM order_information WHERE id=id3;
    CALL insertLog(concat('Deleted order: ', id3), 'Administrator', session_id);
END;
GO
/*INSERT USER*/
CREATE PROCEDURE insertUser(first_name2 VARCHAR(64),
                            middle_name2 VARCHAR(64),
                            last_name2 VARCHAR(64),
                            email_address2 VARCHAR(64),
                            password2 VARCHAR(256),
                            contact_number2 VARCHAR(11),
                            user_type2 VARCHAR(20))
BEGIN

    INSERT INTO user(first_name, middle_name, last_name, email_address, password, contact_number, user_type) VALUES (first_name2, middle_name2, last_name2, email_address2, password2, contact_number2, user_type2);
END;
GO
/*INSERT ADMINISTRATOR*/
CREATE PROCEDURE insertAdmin(session_id INT,
                            first_name2 VARCHAR(64),
                            middle_name2 VARCHAR(64),
                            last_name2 VARCHAR(64),
                            email_address2 VARCHAR(64),
                            password2 VARCHAR(256),
                            contact_number2 VARCHAR(11),
                            user_type2 VARCHAR(20),
                            image2 VARCHAR(256))
BEGIN
    CALL insertUser(first_name2, middle_name2, last_name2, email_address2, password2, contact_number2, user_type2);
    INSERT INTO administrator(user_id, image) VALUES (LAST_INSERT_ID(), image2);
    CALL insertLog(concat('Added administrator: ', LAST_INSERT_ID()), 'Administrator', session_id);
END;
GO
/*EDIT ADMIN*/
CREATE PROCEDURE editAdmin(admin_id2 INT,
                            user_id2 INT,
                            first_name2 VARCHAR(64),
                            middle_name2 VARCHAR(64),
                            last_name2 VARCHAR(64),
                            email_address2 VARCHAR(64),
                            contact_number2 VARCHAR(11))
BEGIN
    UPDATE user SET first_name=first_name2, middle_name=middle_name2, last_name=last_name2, email_address=email_address2, contact_number=contact_number2 WHERE id=user_id2;
END;
GO
/*ACTIVATE ADMINISTRATOR*/
CREATE PROCEDURE activateAdmin(id2 INT)
BEGIN
    UPDATE administrator SET active=TRUE WHERE id=id2;
END;
GO
/*DEACTIVATE ADMINISTRATOR*/
CREATE PROCEDURE deactivateAdmin(id2 INT)
BEGIN
    UPDATE administrator SET active=FALSE WHERE id=id2;
END;
GO
/*INSERT ROOT ADMINISTRATOR*/
CREATE PROCEDURE insertRootAdmin(first_name2 VARCHAR(64),
                            middle_name2 VARCHAR(64),
                            last_name2 VARCHAR(64),
                            email_address2 VARCHAR(64),
                            password2 VARCHAR(256),
                            contact_number2 VARCHAR(11),
                            user_type2 VARCHAR(20),
                            image2 VARCHAR(256))
BEGIN
    CALL insertUser(first_name2, middle_name2, last_name2, email_address2, password2, contact_number2, user_type2);
    INSERT INTO administrator(user_id, image) VALUES (LAST_INSERT_ID(), image2);
END;
GO
/*DELETE ADMINISTRATOR*/
CREATE PROCEDURE deleteAdmin(id3 INT)
BEGIN

    DELETE FROM administrator WHERE id = id3;
END;
GO
/*INSERT CUSTOMER*/
CREATE PROCEDURE insertCustomer(session_id INT,
                            first_name2 VARCHAR(64),
                            middle_name2 VARCHAR(64),
                            last_name2 VARCHAR(64),
                            email_address2 VARCHAR(64),
                            password2 VARCHAR(256),
                            contact_number2 VARCHAR(11),
                            user_type2 VARCHAR(20),

                            address2 VARCHAR(128),
                            zip_code2 VARCHAR(16))
BEGIN
    CALL insertUser(first_name2, middle_name2, last_name2, email_address2, password2, contact_number2, user_type2);
    INSERT INTO customer(address, zip_code, user_id) VALUES (address2, zip_code2, LAST_INSERT_ID());
END;
GO
/*EDIT CUSTOMER*/
CREATE PROCEDURE editCustomer(session_id INT,
                        id3 INT,
                        address3 VARCHAR(128),
                        zip_code3 VARCHAR(16))
BEGIN

    UPDATE customer SET address=address3, zip_code=zip_code3 WHERE id=id3;
    CALL insertLog(concat('Updated customer: ', id3), 'Administrator', session_id);
END;
GO
/*INSERT EVENT MOTIF*/
CREATE PROCEDURE insertMotif(session_id INT,
                        name3 VARCHAR(64),
                        description3 VARCHAR(256))
BEGIN

    INSERT INTO event_motif(name, description) VALUES(name3, description3);
    CALL insertLog(concat('Added event motif: ', LAST_INSERT_ID()), 'Administrator', session_id);
END;
GO
/*EDIT EVENT MOTIF*/
CREATE PROCEDURE editMotif(id3 INT,
                        name3 VARCHAR(64),
                        description3 VARCHAR(256))
BEGIN

    UPDATE event_motif SET name=name3, description=description3 WHERE id=id3;
END;
GO
/*DELETE EVENT MOTIF*/
CREATE PROCEDURE deleteMotif(id3 INT)
BEGIN

    DELETE FROM event_motif WHERE id=id3;
END;
GO
/*INSERT FOOD MENU*/
CREATE PROCEDURE insertMenu(session_id INT,
                        name2 VARCHAR(64),
                        main_course2 VARCHAR(256),
                        appetizer2 VARCHAR(256),
                        dessert2 VARCHAR(256),
                        soup2 VARCHAR(256),
                        beverage2 VARCHAR(256),
                        others2 VARCHAR(256))
BEGIN
    DECLARE fm_id INT;

    INSERT INTO food_menu(name) VALUES(name2);
    SET fm_id = LAST_INSERT_ID();
    CALL insertMainCourse(fm_id, main_course2);
    CALL insertAppetizer(fm_id, appetizer2);
    CALL insertDessert(fm_id, dessert2);
    CALL insertSoup(fm_id, soup2);
    CALL insertBeverage(fm_id, beverage2);
    CALL insertOthers(fm_id, others2);
    CALL insertLog(concat('Added food menu: ', fm_id), 'Administrator', session_id);
END;
GO
/*INSERT MAIN COURSE*/
CREATE PROCEDURE insertMainCourse(fm_id2 INT,
                        inclusion_list2 VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list2;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO main_course(inclusion, menu_id) VALUES(TRIM(string), fm_id2);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO main_course(inclusion, menu_id) VALUES(TRIM(listcopy), fm_id2);
END;
GO
/*INSERT APPETIZER*/
CREATE PROCEDURE insertAppetizer(fm_id3 INT,
                        inclusion_list3 VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list3;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO appetizer(inclusion, menu_id) VALUES(TRIM(string), fm_id3);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO appetizer(inclusion, menu_id) VALUES(TRIM(listcopy), fm_id3);
END;
GO
/*INSERT DESSERT*/
CREATE PROCEDURE insertDessert(fm_id4 INT,
                        inclusion_list4 VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list4;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO dessert(inclusion, menu_id) VALUES(TRIM(string), fm_id4);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO dessert(inclusion, menu_id) VALUES(TRIM(listcopy), fm_id4);
END;
GO
/*INSERT SOUP*/
CREATE PROCEDURE insertSoup(fm_id5 INT,
                        inclusion_list5 VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list5;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO soup(inclusion, menu_id) VALUES(TRIM(string), fm_id5);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO soup(inclusion, menu_id) VALUES(TRIM(listcopy), fm_id5);
END;
GO
/*INSERT BEVERAGE*/
CREATE PROCEDURE insertBeverage(fm_id6 INT,
                        inclusion_list6 VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list6;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO beverage(inclusion, menu_id) VALUES(TRIM(string), fm_id6);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO beverage(inclusion, menu_id) VALUES(TRIM(listcopy), fm_id6);
END;
GO
/*INSERT OTHERS*/
CREATE PROCEDURE insertOthers(fm_id7 INT,
                        inclusion_list7 VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list7;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO others(inclusion, menu_id) VALUES(TRIM(string), fm_id7);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO others(inclusion, menu_id) VALUES(TRIM(listcopy), fm_id7);
END;
GO
/*EDIT FOOD MENU*/
CREATE PROCEDURE editMenu(name3 VARCHAR(64),
                        main_course2 VARCHAR(256),
                        appetizer2 VARCHAR(256),
                        dessert2 VARCHAR(256),
                        soup2 VARCHAR(256),
                        beverage2 VARCHAR(256),
                        others2 VARCHAR(256),
                        id3 INT)
BEGIN

    UPDATE food_menu SET name=name3 WHERE id=id3;
    CALL deleteMainCourse(id3);
    CALL deleteAppetizer(id3);
    CALL deleteDessert(id3);
    CALL deleteSoup(id3);
    CALL deleteBeverage(id3);
    CALL deleteOthers(id3);

    CALL insertMainCourse(id3, main_course2);
    CALL insertAppetizer(id3, appetizer2);
    CALL insertDessert(id3, dessert2);
    CALL insertSoup(id3, soup2);
    CALL insertBeverage(id3, beverage2);
    CALL insertOthers(id3, others2);

END;
GO
/*DELETE FOOD MENU*/
CREATE PROCEDURE deleteMenu(id3 INT)
BEGIN

    CALL deleteMainCourse(id3);
    CALL deleteAppetizer(id3);
    CALL deleteDessert(id3);
    CALL deleteSoup(id3);
    CALL deleteBeverage(id3);
    CALL deleteOthers(id3);
    DELETE FROM food_menu WHERE id=id3;
END;
GO
/*DELETE MAIN COURSE*/
CREATE PROCEDURE deleteMainCourse(id2 INT)
BEGIN

    DELETE FROM main_course WHERE menu_id=id2;
END;
GO
/*DELETE APPETIZER*/
CREATE PROCEDURE deleteAppetizer(id2 INT)
BEGIN

    DELETE FROM appetizer WHERE menu_id=id2;
END;
GO
/*DELETE DESSERT*/
CREATE PROCEDURE deleteDessert(id2 INT)
BEGIN

    DELETE FROM dessert WHERE menu_id=id2;
END;
GO
/*DELETE SOUP*/
CREATE PROCEDURE deleteSoup(id2 INT)
BEGIN

    DELETE FROM soup WHERE menu_id=id2;
END;
GO
/*DELETE BEVERAGE*/
CREATE PROCEDURE deleteBeverage(id2 INT)
BEGIN

    DELETE FROM beverage WHERE menu_id=id2;
END;
GO
/*DELETE OTHERS*/
CREATE PROCEDURE deleteOthers(id2 INT)
BEGIN

    DELETE FROM others WHERE menu_id=id2;
END;
GO
/*EDIT INVENTORY*/
CREATE PROCEDURE editInventory(id3 INT,
                        total_quantity3 INT)
BEGIN

    UPDATE inventory SET total_quantity=total_quantity3, remaining=total_quantity3, renewal_timestamp=CURDATE() WHERE id=id3;
END;
GO
/*INSERT PACKAGE*/
CREATE PROCEDURE insertPackage(session_id INT,
                        name2 VARCHAR(64),
                        inclusion3 VARCHAR(256),
                        price2 FLOAT)
BEGIN
    DECLARE pkg_id INT;

    INSERT INTO package(name, price) VALUES(name2, price2);
    SET pkg_id = LAST_INSERT_ID();
    CALL insertPackageInclusion(pkg_id, inclusion3);
    CALL insertLog(concat('Added package: ', pkg_id), 'Administrator', session_id);
END;
GO
/*INSERT PACKAGE INCLUSION*/
CREATE PROCEDURE insertPackageInclusion(package_id2 INT,
                        inclusion_list VARCHAR(256))
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = inclusion_list;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO package_inclusion(inclusion, package_id) VALUES(TRIM(string), package_id2);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO package_inclusion(inclusion, package_id) VALUES(TRIM(listcopy), package_id2);
END;
GO
/*EDIT PACKAGE*/
CREATE PROCEDURE editPackage(name2 VARCHAR(64),
                        inclusion2 VARCHAR(256),
                        price2 FLOAT,
                        id3 INT)
BEGIN

    UPDATE package SET name=name2, price=price2 WHERE id=id3;
    CALL deletePackageInclusion(id3);
    CALL insertPackageInclusion(id3, inclusion2);
END;
GO
/*DELETE PACKAGE*/
CREATE PROCEDURE deletePackage(id3 INT)
BEGIN

    CALL deletePackageInclusion(id3);
    DELETE FROM package WHERE id=id3;
END;
GO
/*DELETE PACKAGE INCLUSION*/
CREATE PROCEDURE deletePackageInclusion(pkg_id3 INT)
BEGIN

    DELETE FROM package_inclusion WHERE package_id=pkg_id3;
END;
GO
/*DELETE SHOPPING CART*/
CREATE PROCEDURE deleteCart(id2 INT)
BEGIN

    DELETE FROM shopping_cart WHERE id=id2;
END;
GO
/*INSERT PRODUCT COLOR*/
CREATE PROCEDURE insertProductColor(color_list VARCHAR(256),
                        product_id2 INT)
BEGIN
    DECLARE listcopy varchar(255);
    DECLARE string varchar(255);
    DECLARE i INT;
    SET listcopy = color_list;
    SET i = INSTR(listcopy, ',');
    SET string = '';

    WHILE i != 0 DO
        SET string = SUBSTRING(listcopy, 1, i - 1);
        INSERT INTO product_color(product_color, product_id) VALUES(TRIM(string), product_id2);
        SET string = CONCAT(string, ',');
        SET listcopy = TRIM(LEADING string FROM listcopy);
        SET i = INSTR(listcopy, ',');
    END WHILE;
    INSERT INTO product_color(product_color, product_id) VALUES(TRIM(listcopy), product_id2);
    
END;
GO

/*DELETE PRODUCT COLOR*/
CREATE PROCEDURE deleteProductColor(id2 INT)
BEGIN

    DELETE FROM product_color WHERE product_id=id2;
END;
GO
/*ADD REQUEST*/
CREATE PROCEDURE addRequest(session_id INT,
                        first_name2 VARCHAR(64),
                        middle_name2 VARCHAR(64),
                        last_name2 VARCHAR(64),
                        email_address2 VARCHAR(64),
                        contact_number2 VARCHAR(11),
                        event_date2 DATE,
                        event_location2 VARCHAR(128),
                        number_of_persons2 INT,
                        package_id2 INT,
                        motif_id2 INT,
                        menu_id2 INT)
BEGIN

    INSERT INTO request_information(customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id) VALUES(first_name2, middle_name2, last_name2, email_address2, contact_number2, event_date2, event_location2, number_of_persons2, package_id2, motif_id2, menu_id2, (SELECT id FROM customer WHERE user_id=session_id));
    CALL insertLog(concat('Added request: ', LAST_INSERT_ID()), 'Customer', session_id);
END;
GO
/*EDIT PACKAGE*/
CREATE PROCEDURE editRequest(id3 INT,
                        status3 VARCHAR(256))
BEGIN

    UPDATE request_information SET status=status3 WHERE id=id3;
END;
GO
/*DELETE REQUEST*/
CREATE PROCEDURE deleteRequest(id3 INT)
BEGIN

    DELETE FROM request_information WHERE id=id3;
END;
GO
/*EDIT USER*/
CREATE PROCEDURE editUser(session_id INT,
                        id2 INT,
                        first_name2 VARCHAR(64),
                        middle_name2 VARCHAR(64),
                        last_name2 VARCHAR(64),
                        email_address2 VARCHAR(64),
                        contact_number2 VARCHAR(11))
BEGIN

    UPDATE user SET first_name=first_name2, middle_name=middle_name2, last_name=last_name2, email_address=email_address2, contact_number=contact_number2 WHERE id=id2;
    CALL insertLog(concat('Updated user: ', id2), 'Administrator', session_id);
END;
GO
/*CHANGE USER PASSWORD*/
CREATE PROCEDURE changePassword(session_id INT,
                        id2 INT,
                        new_password VARCHAR(256))
BEGIN

    UPDATE user SET password = new_password WHERE id=id2;
    CALL insertLog(concat('Changed account password: ', id2), 'Administrator', session_id);
END;
GO

/*GET INVENTORY OUT OF STOCK PURCHASE*/
CREATE PROCEDURE getInventoryOutOfStockPurchase()
BEGIN

    select product.name, product.id, inventory.total_quantity from inventory, product where inventory.product_id=product.id AND product.for_purchase=1 AND inventory.remaining=0;
END;
GO


DELIMITER ;

CALL insertRootAdmin("Janette", "Asido", "Salvador", "janette@gmail.com", "$2b$10$7TnMnRj7Yy8pLE9.YlGGjuOiCgsJuHhVE5T3pNhUNxqV8I8PQ8J3S", "09087145509", "Administrator", "uploads/2019-03-23T09:01:09.107Zballoon.jpg");
INSERT INTO contact_details(telephone_number, mobile_number, email_address, business_address) VALUES("09087145509", "09498812448", "janette@gmail.com", "Pembo, Makati City");

CALL insertCustomer(1, "Stephanie", "Yambot", "Legaspi", "tep@gmail.com", "$2b$10$1UhBDUqD.7arg/CpfgH8luSX.R8tp4MPXJvzVKg2.vpxDNDDs77sa", "09498812448", "Customer", "Palar", "1200");