INSERT INTO categories (name, image_url) VALUES
('Electronics', '/images/electronics.jpg'),
('Clothing', '/images/clothing.jpg'),
('Home & Kitchen', '/images/home_kitchen.jpg'),
('Beauty Products', '/images/beauty_products.jpg'),
('Sports & Outdoors', '/images/sports_outdoors.jpg'),
('Books', '/images/books.jpg'),
('Toys & Games', '/images/toys_games.jpg'),
('Groceries', '/images/groceries.jpg'),
('Canned Goods', '/images/canned_goods.jpg'),
('Condiments & Sauces', '/images/condiments_sauces.jpg'),
('Frozen Foods', '/images/frozen_foods.jpg'),
('Household Items', '/images/household_items.jpg');

INSERT INTO products (name, category_id, price, description, image_url, featured) VALUES
('Smartphone', 1, 699.00, 'Latest model smartphone', '/images/smartphone.jpg', true),
('Laptop', 1, 999.00, 'High-performance laptop', '/images/laptop.jpg', true),
('Headphones', 1, 99.00, 'Wireless headphones', '/images/headphones.jpg', false),
('T-Shirt', 2, 19.00, 'Comfortable cotton t-shirt', '/images/tshirt.jpg', false),
('Yoga Mat', 5, 29.00, 'Non-slip yoga mat', '/images/yoga_mat.jpg', true),
('Fiction Novel', 6, 15.00, 'Bestselling fiction novel', '/images/fiction_novel.jpg', false),
('Rice', 8, 10.00, 'Premium basmati rice', '/images/rice.jpg', false),
('Canned Tomatoes', 9, 1.49, 'Organic canned tomatoes', '/images/canned_tomatoes.jpg', false),
('Frozen Pizza', 11, 5.99, 'Delicious frozen pizza', '/images/frozen_pizza.jpg', true),
('Paper Towels', 12, 3.99, 'Absorbent paper towels', '/images/paper_towels.jpg', false);
