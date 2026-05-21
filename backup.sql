-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: student_health_database
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mental_health_scores`
--

DROP TABLE IF EXISTS `mental_health_scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mental_health_scores` (
  `score_id` int NOT NULL AUTO_INCREMENT,
  `app_user_id` int NOT NULL,
  `reg_mental_health_rating` float DEFAULT NULL,
  `class_mental_health_rating` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`score_id`),
  KEY `app_user_id` (`app_user_id`),
  CONSTRAINT `app_user_id` FOREIGN KEY (`app_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mental_health_scores`
--

LOCK TABLES `mental_health_scores` WRITE;
/*!40000 ALTER TABLE `mental_health_scores` DISABLE KEYS */;
INSERT INTO `mental_health_scores` VALUES (1,1,0.745037,NULL,'2026-04-30 04:28:03'),(2,1,0.745037,NULL,'2026-04-30 04:29:08'),(3,1,NULL,NULL,'2026-04-30 04:30:01'),(4,1,0.704032,NULL,'2026-04-30 04:33:20'),(5,1,0.79807,'Good','2026-04-30 04:35:55'),(6,2,0.600783,'Fair','2026-05-09 03:10:19'),(7,1,0.584479,'Fair','2026-05-12 22:17:03'),(8,1,0.488,'Fair','2026-05-16 20:37:46'),(9,1,0.665495,'Fair','2026-05-18 21:49:21'),(10,1,0.665495,'Fair','2026-05-18 22:07:54'),(11,1,NULL,'Low','2026-05-18 22:20:15'),(12,1,0.482797,'Low','2026-05-18 22:28:55'),(13,1,0.567278,'Fair','2026-05-19 20:15:23'),(14,1,0.680018,'Fair','2026-05-19 22:44:46'),(15,1,6.28669,NULL,'2026-05-19 23:31:51'),(16,1,6.3,'Fair','2026-05-19 23:39:46'),(17,1,5.22,'Fair','2026-05-19 23:40:09'),(18,1,6.8,'Fair','2026-05-19 23:40:27'),(19,1,6.3,'Fair','2026-05-19 23:40:41'),(20,1,4.47,'Low','2026-05-19 23:41:42'),(21,1,6.8,'Fair','2026-05-19 23:46:52'),(22,1,6.8,'Fair','2026-05-19 23:57:40'),(23,1,6.47,'Fair','2026-05-19 23:58:29');
/*!40000 ALTER TABLE `mental_health_scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_habits`
--

DROP TABLE IF EXISTS `user_habits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_habits` (
  `habit_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sleep_hours` float NOT NULL,
  `tv_hours` float NOT NULL,
  `diet_quality` varchar(45) NOT NULL,
  `exercise_frequency_weekly` int NOT NULL,
  `daily_study_hours` float NOT NULL,
  `social_media_hours` float NOT NULL,
  `part_time_job` varchar(45) NOT NULL,
  `extracurricular_participation` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`habit_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_habits`
--

LOCK TABLES `user_habits` WRITE;
/*!40000 ALTER TABLE `user_habits` DISABLE KEYS */;
INSERT INTO `user_habits` VALUES (2,1,8,1,'Fair',5,5,1,'Yes','Yes','2026-04-30 04:04:55'),(3,1,8,1,'Fair',5,5,1,'Yes','Yes','2026-04-30 04:09:17'),(4,1,8,1,'Fair',5,5,1,'No','Yes','2026-04-30 04:09:36'),(5,1,8,1,'Fair',5,5,1,'No','Yes','2026-04-30 04:18:20'),(6,1,8,1,'Fair',5,5,1,'No','Yes','2026-04-30 04:22:40'),(7,1,8,1,'Good',5,5,1,'Yes','No','2026-04-30 04:22:55'),(8,1,8,1,'Good',5,5,1,'Yes','No','2026-04-30 04:23:13'),(9,1,8,1,'Fair',5,5,1,'No','Yes','2026-04-30 04:28:03'),(10,1,8,1,'Fair',5,5,1,'No','Yes','2026-04-30 04:29:08'),(11,1,8,1,'Fair',5,5,1,'No','Yes','2026-04-30 04:30:01'),(12,1,8,1,'Fair',5,5,1,'Yes','Yes','2026-04-30 04:33:20'),(13,1,8,1,'Good',5,5,1,'No','Yes','2026-04-30 04:35:55'),(14,2,8,1,'Fair',2,6,2,'No','Yes','2026-05-09 03:10:19'),(15,1,8,1,'Poor',2,6,2,'No','Yes','2026-05-12 22:17:03'),(16,1,8,1,'Good',2,6,2,'Yes','No','2026-05-16 20:37:46'),(17,1,8,1,'Good',2,6,2,'No','Yes','2026-05-18 21:49:20'),(18,1,8,1,'Good',2,6,2,'No','Yes','2026-05-18 22:07:54'),(19,1,8,1,'Fair',2,6,2,'Yes','No','2026-05-18 22:20:15'),(20,1,2,1,'Fair',2,6,2,'No','No','2026-05-18 22:28:55'),(21,1,6,1,'Poor',2,6,2,'No','Yes','2026-05-19 20:15:23'),(22,1,6,1,'Good',2,3,2,'No','Yes','2026-05-19 22:44:46'),(23,1,6,1,'Fair',2,3,2,'No','Yes','2026-05-19 23:31:51'),(24,1,6,1,'Fair',2,3,2,'No','Yes','2026-05-19 23:36:09'),(25,1,6,1,'Fair',2,3,2,'No','Yes','2026-05-19 23:36:48'),(26,1,6,1,'Fair',2,3,2,'No','Yes','2026-05-19 23:39:46'),(27,1,6,1,'Poor',2,3,2,'No','No','2026-05-19 23:40:09'),(28,1,6,1,'Good',2,3,2,'No','Yes','2026-05-19 23:40:27'),(29,1,6,1,'Fair',2,3,2,'No','Yes','2026-05-19 23:40:41'),(30,1,6,1,'Fair',2,3,2,'Yes','No','2026-05-19 23:41:42'),(31,1,6,1,'Good',2,3,2,'No','Yes','2026-05-19 23:46:52'),(32,1,6,1,'Good',2,3,2,'No','Yes','2026-05-19 23:57:40'),(33,1,6,6,'Fair',2,3,2,'No','Yes','2026-05-19 23:58:29');
/*!40000 ALTER TABLE `user_habits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'loginTest','$2b$12$fsOhR7mk/xE5XdgNmHsFk.iuPBQjo7XtqFeWlYKiG9TeFu9UuE5yG','2026-04-30 04:04:38'),(2,'testing','$2b$12$yQWEwNR3Lu7.Rz/J8BwHYO7zlIHVdVkgNIDtCMF9UTjVpZp02Hh7S','2026-05-09 03:07:41');
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

-- Dump completed on 2026-05-21 16:28:42
