/*
 *********************************************************************
 http://www.mysqltutorial.org
 *********************************************************************
 Name: MySQL Sample Database classicmodels
 Link: http://www.mysqltutorial.org/mysql-sample-database.aspx
 Version 3.1
 + changed data type from DOUBLE to DECIMAL for amount columns
 Version 3.0
 + changed DATETIME to DATE for some colunmns
 Version 2.0
 + changed table type from MyISAM to InnoDB
 + added foreign keys for all tables 
 *********************************************************************
 */
/*!40101 SET NAMES utf8 */
;

/*!40101 SET SQL_MODE=''*/
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

CREATE DATABASE
/*!32312 IF NOT EXISTS*/
`Taste_Then_Tell`
/*!40100 DEFAULT CHARACTER SET latin1 */
;

USE `Taste_Then_Tell`;

DROP TABLE IF EXISTS `Foods`;

CREATE TABLE `Foods` (
    food_id INT PRIMARY KEY,
    name VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/foods.csv' INTO TABLE Foods FIELDS TERMINATED BY ',' ENCLOSED BY '\"' ESCAPED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Universities`;

CREATE TABLE Universities (
    university_id INT PRIMARY KEY,
    location VARCHAR(255),
    name VARCHAR(100)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/colleges.csv' INTO TABLE Universities FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Dining_Halls`;

CREATE TABLE Dining_Halls (
    university_id INT,
    dining_hall_id INT PRIMARY KEY,
    name VARCHAR(255),
    FOREIGN KEY (university_id) REFERENCES Universities(university_id) ON
     DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/dininghalls.csv' INTO TABLE Dining_Halls FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Students`;

CREATE TABLE Students (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    university_id INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(50),
    FOREIGN KEY (university_id) REFERENCES Universities(university_id) ON
     DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/students.csv' INTO TABLE Students FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Reviews`;

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    food_id INT,
    dining_hall_id INT,
    rating REAL,
    feedback VARCHAR(255),
    contains_profanity BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Students(user_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES Foods(food_id) ON DELETE CASCADE,
    FOREIGN KEY (dining_hall_id) REFERENCES Dining_Halls(dining_hall_id) ON
     DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/reviews.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Schedules`;

CREATE TABLE Schedules (
    food_id INT,
    dining_hall_id INT,
    days VARCHAR(100),
    meal_type VARCHAR(100),
    PRIMARY KEY (food_id, dining_hall_id),
    FOREIGN KEY (food_id) REFERENCES Foods(food_id) ON DELETE CASCADE,
    FOREIGN KEY (dining_hall_id) REFERENCES Dining_Halls(dining_hall_id) ON
     DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/newCombinedSchedule.csv' INTO TABLE Schedules FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Food_Allergens`;

CREATE TABLE Food_Allergens (
    food_id INT,
    allergen VARCHAR(100),
    PRIMARY KEY (food_id, allergen),
    FOREIGN KEY (food_id) REFERENCES Foods(food_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/food_allergens.csv' INTO TABLE Food_Allergens FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE IF EXISTS `Profanity`;

CREATE TABLE Profanity (word VARCHAR(100)) ENGINE = InnoDB DEFAULT CHARSET = latin1;

LOAD DATA LOCAL INFILE '/Users/Aditya/Documents/uiuc/cs411/sp22-cs411-team050-AlawiniDiYi/db/csv/profanity.csv' INTO TABLE Profanity FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

CREATE TRIGGER word_check_update BEFORE
UPDATE
    ON Reviews FOR EACH ROW BEGIN IF (
        SELECT
            COUNT(*)
        FROM
            Profanity
        WHERE
            LOCATE(word, NEW.feedback) > 0
    ) > 0 THEN
SET
    NEW.contains_profanity = TRUE;

ELSE
SET
    NEW.contains_profanity = FALSE;

END IF;

END;

CREATE TRIGGER word_check_insert BEFORE
INSERT
    ON Reviews FOR EACH ROW BEGIN IF (
        SELECT
            COUNT(*)
        FROM
            Profanity
        WHERE
            LOCATE(word, NEW.feedback) > 0
    ) > 0 THEN
SET
    NEW.contains_profanity = TRUE;

ELSE
SET
    NEW.contains_profanity = FALSE;

END IF;

END;

CREATE DEFINER = `root` @`%` PROCEDURE `getYourReviews`(
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(50)
) BEGIN DECLARE finished INT DEFAULT 0;

DECLARE reviewID INT;

DECLARE userID INT;

DECLARE foodID INT;

DECLARE diningHallID INT;

DECLARE userRating DOUBLE;

DECLARE userFeedback VARCHAR(255);

DECLARE userContainsProfanity BOOLEAN;

DECLARE cur CURSOR FOR
SELECT
    *
FROM
    Reviews
WHERE
    user_id = (
        SELECT
            user_id
        FROM
            Students
        WHERE
            Students.email = user_email
            AND Students.password = user_password
    );

DECLARE CONTINUE HANDLER FOR NOT FOUND
SET
    finished = 1;

DROP TABLE IF EXISTS user_reviews;

CREATE TABLE user_reviews(
    review_id INT,
    user_id INT,
    food_id INT,
    dining_hall_id INT,
    rating DOUBLE,
    feedback VARCHAR(255),
    contains_profanity BOOLEAN
);

OPEN cur;

REPEAT FETCH cur INTO reviewID,
userID,
foodID,
diningHallID,
userRating,
userFeedback,
userContainsProfanity;

INSERT INTO
    user_reviews
VALUES
    (
        reviewID,
        userID,
        foodID,
        diningHallID,
        userRating,
        userFeedback,
        userContainsProfanity
    );

UNTIL finished
END REPEAT;

CLOSE cur;

SELECT
    *
FROM
    user_reviews;

END;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;