USE `gardin_db`;

--
-- Dumping data for table `ages`
--



INSERT INTO `ages` VALUES (1,'Niños'),(2,'Jóvenes Adultos'),(3,'Adultos');



--
-- Dumping data for table `experiences`
--


INSERT INTO `experiences` VALUES (1,'Empezando'),(2,'Con conocimiento'),(3,'Avanzado');


--
-- Dumping data for table `environments`
--


INSERT INTO `environments` VALUES (1,'Interior'),(2,'Patios y balcones'),(3,'Jardín');


--
-- Dumping data for table `categories`
--


INSERT INTO `categories` VALUES (1,'Docente'),(2,'Usuario');


--
-- Dumping data for table `units`
--


INSERT INTO `units` VALUES (1,'Dónde conseguir los elementos básicos', 1),(2,'Armado de macetas', 1),(3,'Cuidado de capullos', 1),(4,'Mantenimiento de plantas', 1),(5,'El Lugar Correcto', 2),(6,'Especies Fáciles de Cultivar', 2),(7,'Conseguir un Tiesto Adecuado', 2),(8,'Tierra o Sustrato para Bonsái', 2),(9,'Preparar el Tiesto', 2),(10,'Poda de Ramas y Raíces', 2),(11,'Cuidado y Mantenimiento', 2),(12,'Los bancales', 3),(13,'La tierra', 3),(14,'El abono', 3),(15,'La siembra', 3),(16,'El mantenimiento', 3),(17,'La cosecha', 3),(18,'Conseguir el árbol perfecto', 4),(19,'Necesidades de los cítricos', 4),(20,'Cuidados del árbol', 4),(21,'Cuándo se cultiva', 4),(22,'Germinación de semillas', 5),(23,'Cuidados del tomate', 5),(24,'Mantenimiento importante', 5),(25,'Cuándo se cosecha', 5),(26,'Tierra para rosas', 6),(27,'Abono para tierra', 6),(28,'Cuidados del sembrado', 6),(29,'Control de plagas', 6),(30,'Riego', 6),(31,'Mantenimiento', 6);


--
-- Dumping data for table `requirements`
--


INSERT INTO `requirements` VALUES (1, 'Pala ancha o plana', 1),(2, 'Rastrillo de jardín', 1),(3, 'Rastillo Metálico', 1),(4, 'Tenedor de jardín', 2),(5, 'Rastrillo plástico', 2),(6, 'Rastillo Metálico', 2),(7, 'Rastrillo de jardín', 3),(8, 'Regadera', 3),(9, 'Tijera de Podar Setos', 3),(10, 'Pala de Punta', 4),(11, 'Rastrillo plástico', 4),(12, 'Pala de Punta', 5),(13, 'Rastrillo plástico', 5),(14, 'Tenedor de jardín', 5),(15, 'Tenedor de jardín', 6),(16, 'Tijera de Podar Setos', 6);


--
-- Dumping data for table `products`
--


INSERT INTO `products` VALUES (1,'Jardineria 101', 'Enseñamos lo básico de la jardinería para empezar.', 2, 1, 2, 'Español', '2500', 'image-1603155381115.jpg', 'Gonza', '4 meses'),(2,'Crear bonsais desde cero', 'Aprende el antiguo arte oriental de crear bonsais.El arte del bonsái se originó en China hace unos dos mil años, en donde se conoce como Penjing, como objeto de culto para los monjes taoístas. Para ellos era símbolo de eternidad, el árbol representaba un puente entre lo divino y lo humano, el cielo y la tierra.', 3, 3, 1, 'Japonés', '5000', 'image-1603158889872.jpg', 'Guille', '6 meses'),(3,'Armar una huerta en tu jardín', 'Aprenderán a armar una huerta casera desde cero y sobre el cuidado de una gran variedad de frutas y vegetales.', 2, 2, 3, 'Inglés', '2000', 'image-1603160114061.png', 'Pablo', '4 meses'),(4,'Tener tu propio limonero', 'Aprende cómo conseguir y cuidar de tu propio árbol de limones.', 2, 1, 3, 'Español', '1500', 'image-1603160939825.jpg', 'Elsa', '5 meses'),(5,'Tomaría nivel 1', 'Conviértete en el maestro del tomate, partiendo desde las bases, podrás sembrar hermosos árboles de tomates muy coloridos y saludables. En este primer nivel nos centraremos en qué tipo de tierras son necesarias y como hidratarlas para lograr una cosecha exitosa.', 1, 1, 3, 'Español', '650', 'image-1605046797869.jpg', 'Tomás', '3 meses'),(6,'Rosas rositas', 'En este curso aprenderás todo lo esencial sobre sembrado de rosas color rosa, desde el tipo de tierra que necesitaremos, como el abono para la misma, riegos y cuidados.', 2, 2, 3, 'Español', '2300', 'image-1605140123781.jpg', 'Marta', '3 meses');


--
-- Dumping data for table `users`
--


INSERT INTO `users` VALUES (1, 'Millicent', 'Matthaus', 'mmatthaus0@ebay.co.uk', 'nolEDg5h', null, 2),(2, 'Fanchette', 'Hurry', 'fhurry1@smh.com.au', 'IWfd9ldDWq', null, 1),(3, 'Lilia', 'Borge', 'lborge2@typepad.com', '1yeYEaxamJ', null, 2),(4, 'Kaye', 'Forsey', 'kforsey3@umn.edu', '1sLBcKOD', null, 2),(5, 'Lynde', 'Side', 'lside4@xing.com', 'F0YEGM8', null, 2),(6, 'Belva', 'Fullerton', 'bfullerton5@w3.org', 'MjA9GhrI', null, 1),(7, 'Selinda', 'Gianullo', 'sgianullo6@twitter.com', 'IrsCRx', null, 2),(8, 'Kingsley', 'Gonnard', 'kgonnard7@state.tx.us', 'oF2bOTTw2W6Q', null, 2),(9, 'Ann', 'Dunrige', 'adunrige8@auda.org.au', 'CXqzWsgGerF', null, 1),(10, 'Astrid', 'MacGorley', 'amacgorley9@webs.com', 'VuSp8tUzfx', null, 1),(11, 'Gusty', 'Seyers', 'gseyersa@ucoz.ru', '9lKSBJ5j', null, 1),(12, 'Nilson', 'Osbourn', 'nosbournb@purevolume.com', '9C3p21upFR', null, 2),(13, 'Evelin', 'McBrearty', 'emcbreartyc@rambler.ru', '1PEYZ5l', null, 2),(14, 'Tally', 'Petasch', 'tpetaschd@xrea.com', 'hc8hbnT', null, 2),(15, 'Stevie', 'Firmage', 'sfirmagee@meetup.com', 'gRXbqQK', null, 1);


