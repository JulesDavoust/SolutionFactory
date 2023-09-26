-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: solutionfactory
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `authorID` int NOT NULL AUTO_INCREMENT,
  `firstNameAuthor` varchar(50) DEFAULT NULL,
  `lastNameAuthor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Halme','Kaarle'),(2,'Jean','Lurs'),(3,'Ryan','Ragan'),(4,'Michel','Miron'),(5,'Henri','Beyle'),(6,'Thimothée','Reid'),(7,'James Carlos','Blake'),(8,'Bruno','Nurmi'),(9,'Édouard','de Perrodil'),(10,'Phillipe','Bone'),(11,'Arthur','Rimbaud'),(12,'Jean','de La Fontaine'),(13,'Fred','Vargas'),(14,'Charles','Perrault'),(15,'Jorge','Luis Borges'),(16,'Zach','Weinersmith'),(17,'Andreï','Kourkov');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ebooks`
--

DROP TABLE IF EXISTS `ebooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ebooks` (
  `idEbook` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `editor` varchar(50) DEFAULT NULL,
  `publishDate` date DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `authorID` int NOT NULL,
  `descriptionEbook` varchar(500) DEFAULT NULL,
  `coverPage` varchar(100) DEFAULT NULL,
  `uploadDate` date DEFAULT NULL,
  PRIMARY KEY (`idEbook`),
  KEY `authorID` (`authorID`),
  CONSTRAINT `ebooks_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `authors` (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ebooks`
--

LOCK TABLES `ebooks` WRITE;
/*!40000 ALTER TABLE `ebooks` DISABLE KEYS */;
INSERT INTO `ebooks` VALUES (1,'Dans la nuit','editor1','2023-06-16','/Ebook/Dans_la_nuit.pdf',1,'Since 2004, Carter and Solomon have attempted to confirm if dark matter exists by identifying where all of the mass in the universe is located.\nSince that time, they have discovered significant discrepancies between the data and theoretical predictions. The results from the first decade were very interesting, but there were many hypotheses that were not able to explain the results as much','/coverPageEbook/Cover_Page_1.jpg','2023-06-27'),(2,'Le trésor perdu','editor1','2023-09-24','/Ebook/Le_trésor_perdu.pdf',1,'It doesn’t matter how bad you might have been before. You can’t go back and start again, no matter what you’ve done. But if you have the talent and the desire and you’ve got a big enough bank of experience that you can start again, then you should.Q. Has Jeter told you anything about what he might do?A. No, not yet. He never has talked to me about this. I always leave that to the general manager and the owner.Q. When the news broke, did you','/coverPageEbook/Cover_Page_2.jpg','2023-06-27'),(3,'La petite maison','Hachette','2020-02-12','/Ebook/La_Petite_Maison.epub',2,'Mohamed Sanu speaks up for his Muslim teammates in controversial McDonald\'s ad NEW ORLEANS – On Tuesday, Atlanta Falcons wide receiver Mohamed Sanu offered up a personal defense of his Muslim teammates.Speaking to the Atlanta Journal Constitution ahead of Super Bowl LI, Sanu said his message was not specifically for President Donald Trump, but rather for everyone in his locker room.It\'s really about unity and love, he said. I don\'t think it\'s too much to ask NFL players to come together','/coverPageEbook/Cover_Page_3.jpg','2023-06-27'),(4,'Escape from east Tennessee to the federal lines','Gallimard','2013-11-09','/Ebook/Escape_from_east_Tennessee_to_the_federal_lines.pdf',3,'The name \'Turoai\' is derived from the local indigenous language, Tasmaray, meaning \'enclosure\', and the valley is considered sacred to the Aborigines.In 1805, Thomas Mitchell passed Turoai during his explorations of central New South Wales.The nearest village is Wirgullah, the homestead of the country\'s richest privately owned station, Cobar Station, on the Darling River.Whilst taking supplies to John Oxley’s expedition in 1823, Daniel McGilvray had horses, two packshorses and several tons','/coverPageEbook/Cover_Page_4.jpg','2023-06-27'),(5,'Comment vivre pourchassé','Libella','2018-02-21','/Ebook/Comment_vivre_pourchassé.mobi',4,'Sometimes, if a bunch of things went wrong and they all got slammed, the user gets the blame. The consequences can be great – lots of apologies and lost trust. We also get what I like to call the “humpty dumpty effect”. When a bunch of data on a table or more gets added, the program will behave wildly, leading to a lot of manual intervention, lots of lost time. What kind of advice can you give to help avoid humpty dumpty results?Provide only the data the user needs. Say, for example, you','/coverPageEbook/Cover_Page_5.jpg','2023-06-27'),(6,'Le Rouge et le Noir','Aparis','1830-11-13','/Ebook/Le_Rouge_et_le_Noir.epub',5,'As only she could, Daisy leaned back in her chair and asked \'How old is Anna when she dies?\' David was quick to reply: \'Just short of three hundred. One minute younger than my mother. And she\'s lived almost as long as she\'s supposed to. \' It turned out they didn\'t have much else in common. Neither could sit still for long periods of time, preferring instead to stand. But there was a mutual admiration for nature and a passion for the sea. And when it came to music, well, that was another','/coverPageEbook/Cover_Page_6.jpg','2023-06-27'),(7,'Armance','Aparis','1827-08-27','/Ebook/Armance.mobi',5,'Even more important than solving these moral problems is the opportunity to get people to see the potential of private competition in reforming health care, education, housing and transport. The problem is that most people’s impressions of private competition and private ownership are so shaped by conventional thinking that they come to believe that competition is dangerous and that non-capitalist enterprises are inherently socially damaging and inefficient. They believe that the government is','/coverPageEbook/Cover_Page_7.jpg','2023-06-28'),(8,'The book of The Cheese','Editis','1958-05-17','/Ebook/The_book_of_The_Cheese.pdf',6,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_8.jpg','2023-06-28'),(9,'Crépuscule sanglant','Gallmeister','1997-09-21','/Ebook/Crépuscule_sanglant_FR.epub',7,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_9.jpg','2023-06-29'),(10,'Crépuscule sanglant','Gallmeister','1997-09-21','/Ebook/Crépuscule_sanglant_ENG.epub',7,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_10.jpg','2023-06-29'),(11,'Richard Wagner','Albin Michel','2006-12-01','/Ebook/RichardWagner.pdf',8,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_11.jpg','2023-06-29'),(12,'A vol de vélo','Albin Michel','2013-01-16','/Ebook/A_vol_de_vélo.pdf',9,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_12.jpg','2023-06-30'),(13,'Le Train','Actes Sud','2019-07-29','/Ebook/Le_train.pdf',10,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_13.jpg','2023-06-30'),(14,'Le Dormeur du val','Michel Lafon','1870-10-12','/Ebook/Le_Dormeur_du_val.epub',11,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_14.jpg','2023-06-30'),(15,'Les fables de La Fontaine','Gallimard','2000-03-18','/Ebook/Les_fables_de_La_Fontaine.epub',12,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_15.jpg','2023-07-01'),(16,'Sur la dalle','Flammarion','2023-05-17','https://www.gutenberg.org/files/70991/70991-h/70991-h.htm',13,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_11.jpg','2023-07-01'),(17,'Les Contes de ma mère l\'Oye','Flammarion','2018-01-14','https://www.gutenberg.org/cache/epub/70992/pg70992-images.html',14,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_11.jpg','2023-07-02'),(18,'Le Livre de sable','Gallimard','1983-04-22','https://www.gutenberg.org/cache/epub/70993/pg70993-images.html',15,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_11.jpg','2023-07-03'),(19,'Béa Wolf','Albin Michel','2023-03-22','https://www.gutenberg.org/cache/epub/70990/pg70990.html',16,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_11.jpg','2023-07-03'),(20,'Journal d\'une invasion','Gallimard','2023-02-08','https://www.gutenberg.org/cache/epub/70987/pg70987-images.html',17,'At least eight injuries in Tucson airport scare - Tucson News Now Tucson Fire Department officials said they received a call around 7:40 a.m. on Sunday about a fire in the upper terminal area of the Tucson International Airport. According to a spokesperson with Tucson Fire, crews responded and they found a fire in the women\'s restroom. It was extinguished and everyone was evacuated. Two people were treated at the scene by paramedics, and then transported to a local hospital for further','/coverPageEbook/Cover_Page_11.jpg','2023-07-04');
/*!40000 ALTER TABLE `ebooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `haves`
--

DROP TABLE IF EXISTS `haves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `haves` (
  `idEbook` int NOT NULL,
  `idTag` int NOT NULL,
  PRIMARY KEY (`idEbook`,`idTag`),
  KEY `idTag` (`idTag`),
  CONSTRAINT `haves_ibfk_1` FOREIGN KEY (`idEbook`) REFERENCES `ebooks` (`idEbook`),
  CONSTRAINT `haves_ibfk_2` FOREIGN KEY (`idTag`) REFERENCES `tags` (`idTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `haves`
--

LOCK TABLES `haves` WRITE;
/*!40000 ALTER TABLE `haves` DISABLE KEYS */;
INSERT INTO `haves` VALUES (1,1),(7,1),(1,2),(18,2),(18,3),(14,4),(2,6),(6,6),(7,6),(9,6),(10,6),(17,6),(18,6),(19,6),(5,7),(13,7),(16,7),(17,8),(18,8),(19,8),(17,9),(4,10),(19,10),(3,12),(4,12),(3,13),(4,14),(5,14),(15,15),(9,16),(10,16),(2,17),(16,18),(3,20),(7,20),(4,21),(11,22),(11,24),(12,24),(20,25),(8,27),(12,27),(20,27),(1,29),(2,29),(5,29),(6,29),(7,29),(9,29),(11,29),(12,29),(13,29),(14,29),(15,29),(16,29),(17,29),(18,29),(19,29),(20,29),(3,30),(4,30),(8,30),(10,30),(5,31),(6,31),(13,31),(16,31),(20,32);
/*!40000 ALTER TABLE `haves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likeebooks`
--

DROP TABLE IF EXISTS `likeebooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likeebooks` (
  `idEbook` int NOT NULL,
  `userID` int NOT NULL,
  PRIMARY KEY (`idEbook`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `likeebooks_ibfk_1` FOREIGN KEY (`idEbook`) REFERENCES `ebooks` (`idEbook`),
  CONSTRAINT `likeebooks_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likeebooks`
--

LOCK TABLES `likeebooks` WRITE;
/*!40000 ALTER TABLE `likeebooks` DISABLE KEYS */;
INSERT INTO `likeebooks` VALUES (2,1),(6,2),(2,4);
/*!40000 ALTER TABLE `likeebooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentedbooks`
--

DROP TABLE IF EXISTS `rentedbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentedbooks` (
  `idEbook` int NOT NULL,
  `userID` int NOT NULL,
  `dateRented` date DEFAULT NULL,
  PRIMARY KEY (`idEbook`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `rentedbooks_ibfk_1` FOREIGN KEY (`idEbook`) REFERENCES `ebooks` (`idEbook`),
  CONSTRAINT `rentedbooks_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentedbooks`
--

LOCK TABLES `rentedbooks` WRITE;
/*!40000 ALTER TABLE `rentedbooks` DISABLE KEYS */;
INSERT INTO `rentedbooks` VALUES (4,1,'2023-06-17'),(6,2,'2023-06-19'),(6,4,'2023-06-18'),(15,5,'2023-06-20'),(17,2,'2023-06-18');
/*!40000 ALTER TABLE `rentedbooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `idTag` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idTag`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'romance'),(2,'horreur'),(3,'nouvelle'),(4,'poème'),(5,'poésie'),(6,'fiction'),(7,'policier'),(8,'fantasy'),(9,'conte'),(10,'épopée'),(11,'comédie'),(12,'tragédie'),(13,'drame'),(14,'mystère'),(15,'fable'),(16,'western'),(17,'pirates'),(18,'thriller'),(19,'croisade'),(20,'romantic'),(21,'mythe'),(22,'biographie'),(23,'autobiographie'),(24,'chronique'),(25,'journal'),(26,'aventures'),(27,'historique'),(28,'essai'),(29,'français'),(30,'anglais'),(31,'roman'),(32,'bande dessinée');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `firstNameUser` varchar(50) DEFAULT NULL,
  `lastNameUser` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jean','Michel','MyPasswordSecure','jean.michel@gmail.com',0),(2,'Luc','Stan','LePasswordPourLeCompteEbook','luc.stan@gmail.com',0),(3,'Admin','Ebook','adminPassword','admin.ebook@gmail.com',1),(4,'Ryan','Hant','123','ryan.hant@gmail.com',0),(5,'Pierre','Satle','azerty','pierre.satle@yahoo.com',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-27 12:30:26
