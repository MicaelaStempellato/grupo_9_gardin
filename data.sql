USE `gardin_db`;

--
-- Dumping data for table `ages`
--



INSERT INTO `ages` VALUES (DEFAULT,'Niños'),(DEFAULT,'Jóvenes Adultos'),(DEFAULT,'Adultos');



--
-- Dumping data for table `experiences`
--


INSERT INTO `experiences` VALUES (DEFAULT,'Empezando'),(DEFAULT,'Con conocimiento'),(DEFAULT,'Avanzado');


--
-- Dumping data for table `environments`
--


INSERT INTO `environments` VALUES (DEFAULT,'Interior'),(DEFAULT,'Patios y balcones'),(DEFAULT,'Jardín');


--
-- Dumping data for table `categories`
--


INSERT INTO `categories` VALUES (DEFAULT,'Docente'),(DEFAULT,'Usuario');




--
-- Dumping data for table `products`
--


INSERT INTO `products` VALUES (DEFAULT,'Jardineria 101', 'Enseñamos lo básico de la jardinería para empezar.', 2, 1, 2, 'Español', '2500', 'image-1603155381115.jpg', 'Gonza', '4 meses'),(DEFAULT,'Crear bonsais desde cero', 'Aprende el antiguo arte oriental de crear bonsais.El arte del bonsái se originó en China hace unos dos mil años, en donde se conoce como Penjing, como objeto de culto para los monjes taoístas. Para ellos era símbolo de eternidad, el árbol representaba un puente entre lo divino y lo humano, el cielo y la tierra.', 3, 3, 1, 'Japonés', '5000', 'image-1603158889872.jpg', 'Guille', '6 meses'),(DEFAULT,'Armar una huerta en tu jardín', 'Aprenderán a armar una huerta casera desde cero y sobre el cuidado de una gran variedad de frutas y vegetales.', 2, 2, 3, 'Inglés', '2000', 'image-1603160114061.png', 'Pablo', '4 meses'),(DEFAULT,'Tener tu propio limonero', 'Aprende cómo conseguir y cuidar de tu propio árbol de limones.', 2, 1, 3, 'Español', '1500', 'image-1603160939825.jpg', 'Elsa', '5 meses'),(DEFAULT,'Tomaría nivel 1', 'Conviértete en el maestro del tomate, partiendo desde las bases, podrás sembrar hermosos árboles de tomates muy coloridos y saludables. En este primer nivel nos centraremos en qué tipo de tierras son necesarias y como hidratarlas para lograr una cosecha exitosa.', 1, 1, 3, 'Español', '650', 'image-1605046797869.jpg', 'Tomás', '3 meses'),(DEFAULT,'Rosas rositas', 'En este curso aprenderás todo lo esencial sobre sembrado de rosas color rosa, desde el tipo de tierra que necesitaremos, como el abono para la misma, riegos y cuidados.', 2, 2, 3, 'Español', '2300', 'image-1605140123781.jpg', 'Marta', '3 meses');


--
-- Dumping data for table `users`
--


INSERT INTO `users` VALUES (DEFAULT, 'Millicent', 'Matthaus', 'mmatthaus0@ebay.co.uk', 'nolEDg5h', null, 2),(DEFAULT, 'Fanchette', 'Hurry', 'fhurry1@smh.com.au', 'IWfd9ldDWq', null, 1),(DEFAULT, 'Lilia', 'Borge', 'lborge2@typepad.com', '1yeYEaxamJ', null, 2),(DEFAULT, 'Kaye', 'Forsey', 'kforsey3@umn.edu', '1sLBcKOD', null, 2),(DEFAULT, 'Lynde', 'Side', 'lside4@xing.com', 'F0YEGM8', null, 2),(DEFAULT, 'Belva', 'Fullerton', 'bfullerton5@w3.org', 'MjA9GhrI', null, 1),(DEFAULT, 'Selinda', 'Gianullo', 'sgianullo6@twitter.com', 'IrsCRx', null, 2),(DEFAULT, 'Kingsley', 'Gonnard', 'kgonnard7@state.tx.us', 'oF2bOTTw2W6Q', null, 2),(DEFAULT, 'Ann', 'Dunrige', 'adunrige8@auda.org.au', 'CXqzWsgGerF', null, 1),(DEFAULT, 'Astrid', 'MacGorley', 'amacgorley9@webs.com', 'VuSp8tUzfx', null, 1),(DEFAULT, 'Gusty', 'Seyers', 'gseyersa@ucoz.ru', '9lKSBJ5j', null, 1),(DEFAULT, 'Nilson', 'Osbourn', 'nosbournb@purevolume.com', '9C3p21upFR', null, 2),(DEFAULT, 'Evelin', 'McBrearty', 'emcbreartyc@rambler.ru', '1PEYZ5l', null, 2),(DEFAULT, 'Tally', 'Petasch', 'tpetaschd@xrea.com', 'hc8hbnT', null, 2),(DEFAULT, 'Stevie', 'Firmage', 'sfirmagee@meetup.com', 'gRXbqQK', null, 1);


--
-- Dumping data for table `units`
--


INSERT INTO `units` VALUES (DEFAULT,'Dónde conseguir los elementos básicos', 1),(DEFAULT,'Armado de macetas', 1),(DEFAULT,'Cuidado de capullos', 1),(DEFAULT,'Mantenimiento de plantas', 1),(DEFAULT,'El Lugar Correcto', 2),(DEFAULT,'Especies Fáciles de Cultivar', 2),(DEFAULT,'Conseguir un Tiesto Adecuado', 2),(DEFAULT,'Tierra o Sustrato para Bonsái', 2),(DEFAULT,'Preparar el Tiesto', 2),(DEFAULT,'Poda de Ramas y Raíces', 2),(DEFAULT,'Cuidado y Mantenimiento', 2),(DEFAULT,'Los bancales', 3),(DEFAULT,'La tierra', 3),(DEFAULT,'El abono', 3),(DEFAULT,'La siembra', 3),(DEFAULT,'El mantenimiento', 3),(DEFAULT,'La cosecha', 3),(DEFAULT,'Conseguir el árbol perfecto', 4),(DEFAULT,'Necesidades de los cítricos', 4),(DEFAULT,'Cuidados del árbol', 4),(DEFAULT,'Cuándo se cultiva', 4),(DEFAULT,'Germinación de semillas', 5),(DEFAULT,'Cuidados del tomate', 5),(DEFAULT,'Mantenimiento importante', 5),(DEFAULT,'Cuándo se cosecha', 5),(DEFAULT,'Tierra para rosas', 6),(DEFAULT,'Abono para tierra', 6),(DEFAULT,'Cuidados del sembrado', 6),(DEFAULT,'Control de plagas', 6),(DEFAULT,'Riego', 6),(DEFAULT,'Mantenimiento', 6);


--
-- Dumping data for table `requirements`
--


INSERT INTO `requirements` VALUES (DEFAULT, 'Pala ancha o plana', 1),(DEFAULT, 'Rastrillo de jardín', 1),(DEFAULT, 'Rastillo Metálico', 1),(DEFAULT, 'Tenedor de jardín', 2),(DEFAULT, 'Rastrillo plástico', 2),(DEFAULT, 'Rastillo Metálico', 2),(DEFAULT, 'Rastrillo de jardín', 3),(DEFAULT, 'Regadera', 3),(DEFAULT, 'Tijera de Podar Setos', 3),(DEFAULT, 'Pala de Punta', 4),(DEFAULT, 'Rastrillo plástico', 4),(DEFAULT, 'Pala de Punta', 5),(DEFAULT, 'Rastrillo plástico', 5),(DEFAULT, 'Tenedor de jardín', 5),(DEFAULT, 'Tenedor de jardín', 6),(DEFAULT, 'Tijera de Podar Setos', 6);
