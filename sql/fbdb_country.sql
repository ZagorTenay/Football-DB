-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: fbdb
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `country` (
  `idCountry` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `flag` mediumtext,
  PRIMARY KEY (`idCountry`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (31,'Turkey','data:image/png;base64,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'),(32,'England','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABWklEQVR42u3cMRGEQAxA0SwOrqGhxtZSUiABARiiwwMS8ICCnIrb4vY9A5nJ/EmZkpkZHXnqFu95NZ87HXuM69LNnocAYSEshAXCQlgIC4SFsBAWCAthISwQFsJCWCAshIWwQFgIC2GBsBAWwgJhISyEBcJCWAgLhIWwEBYIC2EhLBAWwkJYICyEhbBAWAgLYYGwEBbCAmEhLIQFwkJYCAuEhbAQFgiLxsr9mdMacLEQFsICYSEshAXCQlgIC4SFsBAWCAthISwQFsJCWCAshIWwQFgIC2GBsBAWwgJhISz+XMnMrr7NPHWL97yaz52OPcZ1cbFAWAgLYYGwEBbCAmEhLIQFwkJYCAuEhbAQFggLYSEsEBbCQlggLISFsEBYCAthgbAQFsICYSEshAXCQlgIC4SFsBAWCAthISwQFsJCWCAshIWwQFgIC2GBsBAWwgJhISyEBcLiV76kLhclcQVRPgAAAABJRU5ErkJggg==');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-24 22:05:13
