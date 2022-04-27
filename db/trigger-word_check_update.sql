DELIMITER //
CREATE TRIGGER word_check_update BEFORE UPDATE ON Reviews
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM Profanity WHERE LOCATE(word, NEW.feedback) > 0) > 0 THEN
        SET NEW.contains_profanity = TRUE;
    ELSE
        SET NEW.contains_profanity = FALSE;
    END IF;
END;//
DELIMITER ;