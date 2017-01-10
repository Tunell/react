DELIMITER $$

DROP PROCEDURE IF EXISTS create_composite_material$$

CREATE PROCEDURE create_customer (
	IN aname	varchar(20),
	IN aaddress	varchar(20),
	IN acity	varchar(15)
)

BEGIN
	INSERT INTO customer(name, address, city) VALUES (aname, aaddress, acity);
END$$