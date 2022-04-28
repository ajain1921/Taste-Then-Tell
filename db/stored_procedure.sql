DELIMITER //
CREATE DEFINER=`root`@`%` PROCEDURE `getYourReviews`(
	IN user_email VARCHAR(255),
	IN user_password VARCHAR(50)
)
BEGIN

DECLARE finished INT DEFAULT 0;
DECLARE reviewID INT;
DECLARE userID INT;
DECLARE foodID INT;
DECLARE diningHallID INT;
DECLARE userRating DOUBLE;
DECLARE userFeedback VARCHAR(255);
DECLARE userContainsProfanity BOOLEAN;
DECLARE diningHallName VARCHAR(100);
DECLARE foodName VARCHAR(255);
DECLARE cur CURSOR FOR 
	SELECT r.review_id, r.user_id, r.food_id, r.dining_hall_id, r.rating, r.feedback, r.contains_profanity, d.name, f.name
    FROM Reviews r NATURAL JOIN Foods f JOIN Dining_Halls d USING(dining_hall_id)
    WHERE user_id = (SELECT user_id 
					FROM Students 
                    WHERE Students.email = user_email AND Students.password = user_password);
DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

DROP TABLE IF EXISTS user_reviews;
CREATE TABLE user_reviews(
	review_id INT PRIMARY KEY,
    user_id INT,
    food_id INT,
    dining_hall_id INT,
    rating DOUBLE,
    feedback VARCHAR(255),
    contains_profanity BOOLEAN,
    dining_hall_name VARCHAR(100),
    food_name VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Students(user_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES Foods(food_id) ON DELETE CASCADE,
    FOREIGN KEY (dining_hall_id) REFERENCES Dining_Halls(dining_hall_id) ON
     DELETE CASCADE
);

OPEN cur;
REPEAT
	FETCH cur INTO reviewID, userID, foodID, diningHallID, userRating, userFeedback, userContainsProfanity, diningHallName, foodName;
	INSERT IGNORE INTO user_reviews VALUES(reviewID, userID, foodID, diningHallID, userRating, userFeedback, userContainsProfanity,diningHallName, foodName);
	UNTIL finished
END REPEAT;
CLOSE cur;

SELECT * FROM user_reviews;
END //
DELIMITER ;
