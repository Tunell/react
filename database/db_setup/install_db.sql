DROP DATABASE byggstyrning;
CREATE DATABASE byggstyrning;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema byggstyrning
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema byggstyrning
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `byggstyrning` DEFAULT CHARACTER SET utf8 ;
USE `byggstyrning` ;

-- -----------------------------------------------------
-- Table `byggstyrning`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_material_user1_idx` (`user_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `fk_material_user1`
  FOREIGN KEY (`user_id`)
  REFERENCES `byggstyrning`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`unit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`unit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_unit_user1_idx` (`user_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `fk_unit_user1`
  FOREIGN KEY (`user_id`)
  REFERENCES `byggstyrning`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`composite_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`composite_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `unit_id` INT NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_composite_material_user1_idx` (`user_id` ASC),
  INDEX `fk_composite_material_unit1_idx` (`unit_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  CONSTRAINT `fk_composite_material_user1`
  FOREIGN KEY (`user_id`)
  REFERENCES `byggstyrning`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_composite_material_unit1`
  FOREIGN KEY (`unit_id`)
  REFERENCES `byggstyrning`.`unit` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`record_state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`record_state` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`used_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`used_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `composite_material_id` INT NOT NULL,
  `record_state_id` INT NOT NULL DEFAULT 1,
  `amount` DOUBLE NOT NULL,
  `comment` VARCHAR(200) NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_used_material_user1_idx` (`user_id` ASC),
  INDEX `fk_used_material_composite_material1_idx` (`composite_material_id` ASC),
  INDEX `fk_used_material_record_status1_idx` (`record_state_id` ASC),
  CONSTRAINT `fk_used_material_user1`
  FOREIGN KEY (`user_id`)
  REFERENCES `byggstyrning`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_used_material_composite_material1`
  FOREIGN KEY (`composite_material_id`)
  REFERENCES `byggstyrning`.`composite_material` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_used_material_record_status1`
  FOREIGN KEY (`record_state_id`)
  REFERENCES `byggstyrning`.`record_state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`meta_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`meta_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `unit_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_meta_material_unit1_idx` (`unit_id` ASC),
  CONSTRAINT `fk_meta_material_unit1`
  FOREIGN KEY (`unit_id`)
  REFERENCES `byggstyrning`.`unit` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`recycle_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`recycle_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`material_has_meta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`material_has_meta` (
  `meta_material_id` INT NOT NULL,
  `material_id` INT NOT NULL,
  `recycle_type_id` INT NOT NULL,
  `unit_id` INT NOT NULL,
  `amount` DOUBLE NOT NULL,
  INDEX `fk_material_has_meta_material1_idx` (`material_id` ASC),
  PRIMARY KEY (`meta_material_id`, `material_id`, `recycle_type_id`, `unit_id`),
  INDEX `fk_material_has_meta_meta_material1_idx` (`meta_material_id` ASC),
  INDEX `fk_material_has_meta_unit1_idx` (`unit_id` ASC),
  CONSTRAINT `fk_material_has_meta_material1`
  FOREIGN KEY (`material_id`)
  REFERENCES `byggstyrning`.`material` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_material_has_meta_recycle_class1`
  FOREIGN KEY (`recycle_type_id`)
  REFERENCES `byggstyrning`.`recycle_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_material_has_meta_meta_material1`
  FOREIGN KEY (`meta_material_id`)
  REFERENCES `byggstyrning`.`meta_material` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_material_has_meta_unit1`
  FOREIGN KEY (`unit_id`)
  REFERENCES `byggstyrning`.`unit` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`composite_has_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`composite_has_material` (
  `composite_material_id` INT NOT NULL,
  `material_id` INT NOT NULL,
  `recycle_type_id` INT NOT NULL,
  `unit_id` INT NOT NULL,
  `amount` DOUBLE NOT NULL,
  PRIMARY KEY (`composite_material_id`, `material_id`, `recycle_type_id`, `unit_id`),
  INDEX `fk_composite_has_material_material1_idx` (`material_id` ASC),
  INDEX `fk_composite_has_material_recycle_class1_idx` (`recycle_type_id` ASC),
  INDEX `fk_composite_has_material_unit1_idx` (`unit_id` ASC),
  CONSTRAINT `fk_composite_has_material_composite_material1`
  FOREIGN KEY (`composite_material_id`)
  REFERENCES `byggstyrning`.`composite_material` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_composite_has_material_material1`
  FOREIGN KEY (`material_id`)
  REFERENCES `byggstyrning`.`material` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_composite_has_material_recycle_class1`
  FOREIGN KEY (`recycle_type_id`)
  REFERENCES `byggstyrning`.`recycle_type` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_composite_has_material_unit1`
  FOREIGN KEY (`unit_id`)
  REFERENCES `byggstyrning`.`unit` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
  ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


USE byggstyrning;

INSERT INTO user (name)
VALUES ("Admin"),
  ("El-entreprenad"),
  ("Grundläggnings-entreprenad"),
  ("VVS-entreprenad");

INSERT INTO unit (user_id, name)
VALUES (1, "kg"),
  (1, "m3"),
  (1, "m2"),
  (1, "m");


INSERT INTO material (user_id, name)
VALUES (1, "Aluminium"),
  (1, "Gips"),
  (1, "Sand"),
  (1, "Trä"),
  (1, "Tegel"),
  (1, "Cement"),
  (1, "Betong"),
  (1, "Mattor"),
  (1, "Glas"),
  (1, "Isolering"),
  (1, "Stål");

INSERT INTO recycle_type (name)
VALUES ("Ej återvunnet/återanvänt"),
  ("Återvunnet/återanvänt"),
  ("Vet Ej");

INSERT INTO meta_material (name, unit_id)
VALUES ("CO2", 2);

INSERT INTO material_has_meta (meta_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES (1, 1, 1, 1, 1),
  (1, 1, 2, 1, 1),
  (1, 1, 3, 1, 1),

  (1, 2, 1, 1, 1),
  (1, 2, 2, 1, 1),
  (1, 2, 3, 1, 1),

  (1, 3, 1, 1, 1),
  (1, 3, 2, 1, 1),
  (1, 3, 3, 1, 1),

  (1, 4, 1, 1, 1),
  (1, 4, 2, 1, 1),
  (1, 4, 3, 1, 1),

  (1, 5, 1, 1, 1),
  (1, 5, 2, 1, 1),
  (1, 5, 3, 1, 1),

  (1, 6, 1, 1, 1),
  (1, 6, 2, 1, 1),
  (1, 6, 3, 1, 1),

  (1, 7, 1, 1, 1),
  (1, 7, 2, 1, 1),
  (1, 7, 3, 1, 1),

  (1, 8, 1, 1, 1),
  (1, 8, 2, 1, 1),
  (1, 8, 3, 1, 1),

  (1, 9, 1, 1, 1),
  (1, 9, 2, 1, 1),
  (1, 9, 3, 1, 1),

  (1, 10, 1, 1, 1),
  (1, 10, 2, 1, 1),
  (1, 10, 3, 1, 1),

  (1, 11, 1, 1, 1),
  (1, 11, 2, 1, 1),
  (1, 11, 3, 1, 1);

INSERT INTO composite_material (user_id, name, unit_id)
VALUES (1, "Aluminium", 1),
  (1, "Gips", 1),
  (1, "Sand", 1),
  (1, "Trä", 1),
  (1, "Tegel", 1),
  (1, "Cement", 1),
  (1, "Betong", 1),
  (1, "Mattor", 1),
  (1, "Glas", 1),
  (1, "Isolering", 1),
  (1, "Stål", 1);

INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES (1, 1, 3, 1, 1),
  (2, 2, 3, 1, 1),
  (3, 3, 3, 1, 1),
  (4, 4, 3, 1, 1),
  (5, 5, 3, 1, 1),
  (6, 6, 3, 1, 1),
  (7, 7, 3, 1, 1),
  (8, 8, 3, 1, 1),
  (9, 9, 3, 1, 1),
  (10, 10, 3, 1, 1),
  (11, 11, 3, 1, 1);


INSERT INTO record_state (name)
VALUES ("ACTIVE"),
  ("DELETED"),
  ("REPORTED");

INSERT INTO used_material(user_id, composite_material_id, amount, comment)
VALUES (1, 1, 8, "En kommentar");

SELECT *
FROM user;





