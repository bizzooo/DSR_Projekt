-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `CalorieLog_Foods`
--

DROP TABLE IF EXISTS `CalorieLog_Foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CalorieLog_Foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `CalorieLog_id` int NOT NULL,
  `Foods_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CalorieLog_id` (`CalorieLog_id`),
  KEY `Foods_id` (`Foods_id`),
  CONSTRAINT `CalorieLog_Foods_ibfk_1` FOREIGN KEY (`CalorieLog_id`) REFERENCES `Calorie_log` (`idCalorie_log`) ON DELETE CASCADE,
  CONSTRAINT `CalorieLog_Foods_ibfk_2` FOREIGN KEY (`Foods_id`) REFERENCES `Foods` (`idFoods`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CalorieLog_Foods`
--

LOCK TABLES `CalorieLog_Foods` WRITE;
/*!40000 ALTER TABLE `CalorieLog_Foods` DISABLE KEYS */;
INSERT INTO `CalorieLog_Foods` VALUES (1,1,1),(2,1,2),(3,2,3),(4,2,4),(5,3,5);
/*!40000 ALTER TABLE `CalorieLog_Foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Calorie_log`
--

DROP TABLE IF EXISTS `Calorie_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Calorie_log` (
  `idCalorie_log` int NOT NULL AUTO_INCREMENT,
  `Users_id` int NOT NULL,
  `calorie_intake` int DEFAULT '0',
  `date_of_log` date NOT NULL,
  PRIMARY KEY (`idCalorie_log`),
  UNIQUE KEY `unique_user_date` (`Users_id`,`date_of_log`),
  CONSTRAINT `Calorie_log_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Calorie_log`
--

LOCK TABLES `Calorie_log` WRITE;
/*!40000 ALTER TABLE `Calorie_log` DISABLE KEYS */;
INSERT INTO `Calorie_log` VALUES (1,1,0,'2024-12-01'),(2,2,0,'2024-12-02'),(3,3,0,'2024-12-01'),(4,5,0,'2025-01-05');
/*!40000 ALTER TABLE `Calorie_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Foods`
--

DROP TABLE IF EXISTS `Foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Foods` (
  `idFoods` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `calories` int NOT NULL,
  `protein` int NOT NULL,
  `carbs` int NOT NULL,
  `fats` int NOT NULL,
  PRIMARY KEY (`idFoods`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Foods`
--

LOCK TABLES `Foods` WRITE;
/*!40000 ALTER TABLE `Foods` DISABLE KEYS */;
INSERT INTO `Foods` VALUES (1,'Apple',95,0,25,0),(2,'Chicken Breast',165,31,0,3),(3,'Rice',206,4,45,0),(4,'Avocado',240,3,12,22),(5,'Salmon',208,20,0,13);
/*!40000 ALTER TABLE `Foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'John Doe','john.doe@example.com','hashed_password_1',30,180,75.5),(2,'Jane Smith','jane.smith@example.com','hashed_password_2',28,165,60.2),(3,'Alice Johnson','alice.johnson@example.com','hashed_password_3',25,170,65),(4,'Bob Brown','bob.brown@example.com','hashed_password_4',35,175,80),(5,'Vid','VidBezget98@gmail.com','$2y$10$2jHF16Vm6OGq2s0rhAN/lukZYyT7z0O2i.gvV2GVVf.zjDhQc2zVe',25,192,110);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Workout_log`
--

DROP TABLE IF EXISTS `Workout_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Workout_log` (
  `idWorkout_log` int NOT NULL AUTO_INCREMENT,
  `Users_id` int NOT NULL,
  `Workouts_id` int NOT NULL,
  `date_of_workout` date NOT NULL,
  PRIMARY KEY (`idWorkout_log`),
  KEY `Users_id` (`Users_id`),
  KEY `Workouts_id` (`Workouts_id`),
  CONSTRAINT `Workout_log_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Workout_log_ibfk_2` FOREIGN KEY (`Workouts_id`) REFERENCES `Workouts` (`idWorkouts`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Workout_log`
--

LOCK TABLES `Workout_log` WRITE;
/*!40000 ALTER TABLE `Workout_log` DISABLE KEYS */;
INSERT INTO `Workout_log` VALUES (1,1,1,'2024-12-01'),(2,1,3,'2024-12-02'),(3,2,2,'2024-12-01'),(4,3,4,'2024-12-02'),(5,4,1,'2024-12-01');
/*!40000 ALTER TABLE `Workout_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Workouts`
--

DROP TABLE IF EXISTS `Workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Workouts` (
  `idWorkouts` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `calories_per_hour` int NOT NULL,
  `type` varchar(45) NOT NULL,
  `duration` int NOT NULL,
  `description` longtext,
  PRIMARY KEY (`idWorkouts`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Workouts`
--

LOCK TABLES `Workouts` WRITE;
/*!40000 ALTER TABLE `Workouts` DISABLE KEYS */;
INSERT INTO `Workouts` VALUES (1,'Running',600,'Cardio',60,'A high-intensity cardio workout that improves endurance.'),(2,'Yoga',180,'Flexibility',60,'A relaxing workout to improve flexibility and reduce stress.'),(3,'Weightlifting',400,'Strength',60,'A strength workout focusing on major muscle groups.'),(4,'Cycling',500,'Cardio',45,'A cardio workout that boosts stamina and leg strength.');
/*!40000 ALTER TABLE `Workouts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-05 12:54:04
