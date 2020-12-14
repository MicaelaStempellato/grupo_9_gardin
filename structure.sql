CREATE DATABASE  IF NOT EXISTS `gardin_db`;
USE `gardin_db`;



--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(95) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `age_id` INT NOT NULL,
  `experience_id` INT NOT NULL,
  `environment_id` INT NOT NULL,
  `language` varchar(95) NOT NULL,
  `price` INT NOT NULL,
  `image` varchar(50) NOT NULL,
  `professor` varchar(50) NOT NULL,
  `duration` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` varchar(95) NOT NULL,
  `last_name` varchar(95) NOT NULL,
  `email` varchar(95) NOT NULL,
  `password` varchar(95) NOT NULL,
  `avatar` varchar(50) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;



--
-- Table structure for table `ages`
--

DROP TABLE IF EXISTS `ages`;
CREATE TABLE `ages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` varchar(95) NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
CREATE TABLE `experiences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` varchar(95) NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;

--
-- Table structure for table `environment`
--

DROP TABLE IF EXISTS `environments`;
CREATE TABLE `environments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` varchar(95) NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;


--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_name` varchar(95) NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;

--
-- Table structure for table `requirements`
--

DROP TABLE IF EXISTS `requirements`;
CREATE TABLE `requirements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `req_name` varchar(95) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;


--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
CREATE TABLE `units` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(95) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) CHARSET=utf8mb4;

ALTER TABLE `products`
ADD CONSTRAINT `fk_ages`
FOREIGN KEY (`age_id`)
REFERENCES ages(`id`);

ALTER TABLE `products`
ADD CONSTRAINT `fk_experiences`
FOREIGN KEY (`experience_id`)
REFERENCES experiences(`id`);

ALTER TABLE `products`
ADD CONSTRAINT `fk_environments`
FOREIGN KEY (`environment_id`)
REFERENCES environments(`id`);

ALTER TABLE `users`
ADD CONSTRAINT `fk_categories`
FOREIGN KEY (`category_id`)
REFERENCES categories (`id`);

ALTER TABLE `requirements`
ADD CONSTRAINT `fk_products_req`
FOREIGN KEY (`product_id`)
REFERENCES products(`id`);

ALTER TABLE `units`
ADD CONSTRAINT `fk_products_units`
FOREIGN KEY (`product_id`)
REFERENCES products(`id`);

--
-- Table structure for table `products_users`
--

DROP TABLE IF EXISTS `products_users`;
CREATE TABLE `products_users` (
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`product_id`,`user_id`)
) CHARSET=utf8mb4;

ALTER TABLE `products_users`
ADD CONSTRAINT `fk_products`
FOREIGN KEY (`product_id`)
REFERENCES products(`id`),
ADD CONSTRAINT `fk_users`
FOREIGN KEY (`user_id`)
REFERENCES users(`id`);