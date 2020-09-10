DELIMITER //
CREATE TRIGGER generic_asset_check BEFORE INSERT ON generic_asset FOR EACH ROW
BEGIN
   IF NEW.type = 'raw' AND NEW.atomic = 0 THEN
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sorry cannot insert';
   END IF;
END //
DELIMITER ;