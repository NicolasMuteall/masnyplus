CREATE DATABASE  IF NOT EXISTS `masnyplus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `masnyplus`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: masnyplus
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `ID_ARTICLE` int NOT NULL AUTO_INCREMENT,
  `TITLE_ARTICLE` varchar(100) NOT NULL,
  `CONTENT_ARTICLE` longtext NOT NULL,
  `IMG_ARTICLE` varchar(45) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_ARTICLE`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Premier article','Contenu de 1er article','Avatar-LoL.jpeg','2023-10-24 17:52:24');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blacklist`
--

DROP TABLE IF EXISTS `blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist` (
  `ID_BLACKLIST` int NOT NULL AUTO_INCREMENT,
  `MAIL_BLACKLIST` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_BLACKLIST`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklist`
--

LOCK TABLES `blacklist` WRITE;
/*!40000 ALTER TABLE `blacklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `ID_COMMENT` int NOT NULL AUTO_INCREMENT,
  `CONTENT_COMMENT` varchar(500) NOT NULL,
  `ID_USER` int NOT NULL,
  `ID_ARTICLE` int NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_COMMENT`),
  KEY `userCommentsArticle_idx` (`ID_USER`),
  KEY `articleHasComments_idx` (`ID_ARTICLE`),
  CONSTRAINT `articleHasComments` FOREIGN KEY (`ID_ARTICLE`) REFERENCES `articles` (`ID_ARTICLE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userCommentsArticle` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'first',1,1,'2023-10-24 23:45:30');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `ID_EVENT` int NOT NULL AUTO_INCREMENT,
  `NAME_EVENT` varchar(45) NOT NULL,
  `DATE_EVENT` datetime NOT NULL,
  `PLACES` int NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_EVENT`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (2,'Sortie pêche 2','2023-10-18 18:00:00',47,'2023-10-16 13:01:26'),(3,'Sortie à Walibi','2023-10-31 07:00:00',15,'2023-10-16 21:49:12'),(4,'Concours de belotte','2023-10-18 16:00:00',50,'2023-10-16 21:51:25'),(5,'Repas halloween','2023-10-31 20:00:00',87,'2023-10-27 14:19:19');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `ID_LIKE` int NOT NULL AUTO_INCREMENT,
  `ID_USER` int NOT NULL,
  `ID_ARTICLE` int NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_LIKE`),
  KEY `userLikeArticle_idx` (`ID_USER`),
  KEY `likesForArticle_idx` (`ID_ARTICLE`),
  CONSTRAINT `likesForArticle` FOREIGN KEY (`ID_ARTICLE`) REFERENCES `articles` (`ID_ARTICLE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userLikeArticle` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (15,1,1,'2023-11-02 10:03:32');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `ID_REGISTER` int NOT NULL AUTO_INCREMENT,
  `ID_USER` int NOT NULL,
  `ID_EVENT` int NOT NULL,
  `NB_PLACES` int NOT NULL,
  `PAYED` tinyint NOT NULL DEFAULT '0',
  `NAMES_REGISTER` varchar(500) DEFAULT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_REGISTER`),
  KEY `USER REGISTER EVENT_idx` (`ID_USER`),
  KEY `EVENT HAS REGISTER_idx` (`ID_EVENT`),
  CONSTRAINT `EVENT HAS REGISTER` FOREIGN KEY (`ID_EVENT`) REFERENCES `events` (`ID_EVENT`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `USER REGISTER EVENT` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (5,1,3,3,0,'Dupont Sylvie, Delannoy Frédéric','2023-10-20 14:45:22'),(6,1,5,3,0,'Dupont Sylvie, Delannoy Frédéric','2023-10-27 14:21:00'),(7,1,2,3,0,'Dupont Sylvie, Delannoy Frédéric','2023-11-02 07:45:02');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID_USER` int NOT NULL AUTO_INCREMENT,
  `MAIL_USER` varchar(45) NOT NULL,
  `PASSWORD_USER` varchar(100) NOT NULL,
  `FIRSTNAME_USER` varchar(45) NOT NULL,
  `NAME_USER` varchar(45) NOT NULL,
  `CITY_USER` varchar(45) NOT NULL,
  `ROLE_USER` varchar(45) NOT NULL,
  `CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nicolas.dupont59176@gmail.com','$2a$10$Nc5aUnv4zHFxjv3MlnEBEengNz1BWRuEZHYsv1.br0r2V69PGu3aO','Dominique','Dupont','Masny','admin','2023-10-04 11:52:46'),(2,'cyril@gmail.com','$2a$10$q8LhB9L.F.cpUGhJr22eye0I8qwchvaaYk35yWd2wWYHBPH7HAgVa','Cyril','Garcia','Courchelettes','user','2023-10-04 13:10:42'),(3,'Fred@gmail.com','$2a$10$N3.Fl.NRMdnz41QKKcFCtOdVRckj2mFo1nnDima7BbmsjsyYJpiGG','Fredéric','Delannoy','Flers','user','2023-10-09 18:45:17');
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

-- Dump completed on 2023-11-03 14:50:15
