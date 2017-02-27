Use Bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,4) NOT NULL,
	stock_quanity INTEGER(20),
	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products
    VALUES (1,'Diamond Earrings',499.99,200);

INSERT INTO products
    VALUES (2,'CZ Earrings',21.00,400); 
    
INSERT INTO products
    VALUES (3,'Ruby Stud Earrings',1924,800); 
