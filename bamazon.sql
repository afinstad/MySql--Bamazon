DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER (100) NOT NULL,
  primary key (item_id)
);

 SELECT * FROM bamazon.products; 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Striped Dress", "Womens", 12.50, 80),
	("Levi's Jeans", "Mens", 44.99, 80),
	("Black Yoga Pants", "Athletic", 26.00, 23),
	("Travel Coffee Mug", "Home", 19.99, 14),
	("PlaySkool Dolls", "Toys", 12.25, 90),
	("Catan Expantion Pack", "Games", 50.00, 12),
	("Bluetooth Headset", "Electronics", 129.99, 10),
	("Flower Power Stationary", "Office", 6.99, 20),
	("Covergirl Eyeliner", "Beauty", 7.65, 15),
	("Cool Ranch Doritos", "Grocery", 3.99, 80);
		

