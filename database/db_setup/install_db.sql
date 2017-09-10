-- noinspection SqlNoDataSourceInspectionForFile

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
  `kg_per_m3` DOUBLE NOT NULL,
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
-- Table `byggstyrning`.`material_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`material_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`used_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`used_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `record_state_id` INT NOT NULL DEFAULT 1,
  `amount` DOUBLE NOT NULL,
  `comment` VARCHAR(200) NOT NULL,
  `material_type_id` INT NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_used_material_user1_idx` (`user_id` ASC),
  INDEX `fk_used_material_record_status1_idx` (`record_state_id` ASC),
  INDEX `fk_used_material_material_type1_idx` (`material_type_id` ASC),
  CONSTRAINT `fk_used_material_user1`
  FOREIGN KEY (`user_id`)
  REFERENCES `byggstyrning`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_used_material_record_status1`
  FOREIGN KEY (`record_state_id`)
  REFERENCES `byggstyrning`.`record_state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_used_material_material_type1`
  FOREIGN KEY (`material_type_id`)
  REFERENCES `byggstyrning`.`material_type` (`id`)
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
-- Table `byggstyrning`.`material_emits_co2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`material_emits_co2` (
  `material_id` INT NOT NULL,
  `recycle_type_id` INT NOT NULL,
  `amount` DOUBLE NOT NULL,
  INDEX `fk_material_has_meta_material1_idx` (`material_id` ASC),
  PRIMARY KEY (`material_id`, `recycle_type_id`),
  CONSTRAINT `fk_material_has_meta_material1`
  FOREIGN KEY (`material_id`)
  REFERENCES `byggstyrning`.`material` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_material_has_meta_recycle_class1`
  FOREIGN KEY (`recycle_type_id`)
  REFERENCES `byggstyrning`.`recycle_type` (`id`)
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


-- -----------------------------------------------------
-- Table `byggstyrning`.`raw_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`raw_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `unit_id` INT NOT NULL,
  `recycle_type_id` INT NOT NULL,
  `material_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_raw_material_meta_unit1_idx` (`unit_id` ASC),
  INDEX `fk_raw_material_meta_recycle_type1_idx` (`recycle_type_id` ASC),
  INDEX `fk_raw_material_meta_material1_idx` (`material_id` ASC),
  CONSTRAINT `fk_raw_material_meta_unit1`
  FOREIGN KEY (`unit_id`)
  REFERENCES `byggstyrning`.`unit` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_raw_material_meta_recycle_type1`
  FOREIGN KEY (`recycle_type_id`)
  REFERENCES `byggstyrning`.`recycle_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_raw_material_meta_material1`
  FOREIGN KEY (`material_id`)
  REFERENCES `byggstyrning`.`material` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`used_has_composite_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`used_has_composite_material` (
  `used_material_id` INT NOT NULL,
  `composite_material_id` INT NOT NULL,
  PRIMARY KEY (`used_material_id`, `composite_material_id`),
  INDEX `fk_used_has_composite_composite_material1_idx` (`composite_material_id` ASC),
  CONSTRAINT `fk_used_has_composite_used_material1`
  FOREIGN KEY (`used_material_id`)
  REFERENCES `byggstyrning`.`used_material` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_used_has_composite_composite_material1`
  FOREIGN KEY (`composite_material_id`)
  REFERENCES `byggstyrning`.`composite_material` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `byggstyrning`.`used_has_raw_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`used_has_raw_material` (
  `used_material_id` INT NOT NULL,
  `raw_material_id` INT NOT NULL,
  PRIMARY KEY (`used_material_id`, `raw_material_id`),
  INDEX `fk_used_has_material_raw_material1_idx` (`raw_material_id` ASC),
  CONSTRAINT `fk_used_has_material_used_material1`
  FOREIGN KEY (`used_material_id`)
  REFERENCES `byggstyrning`.`used_material` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_used_has_material_raw_material1`
  FOREIGN KEY (`raw_material_id`)
  REFERENCES `byggstyrning`.`raw_material` (`id`)
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
  (1, "m"),
  (1, "L"),
  (1, "st");


INSERT INTO material (user_id, name, kg_per_m3)
VALUES (1, "Aluminium", 2700),
  (1, "Gips", 650),
  (1, "Trä", 1500),
  (1, "Betong", 2500),
  (1, "Glas", 2500),
  (1, "Plast(PP)", 950),
  (1, "Handelsstål", 7800),
  (1, "Armering", 7800),
  (1, "Plåt", 7800),
  (1, "Stenull", 90),
  (1, "Cellplast", 20),
  (1, "Koppar", 8960);


INSERT INTO recycle_type (name)
VALUES ("Ej återvunnet/återanvänt"),
  ("Återvunnet/återanvänt"),
  ("Vet Ej");

INSERT INTO material_emits_co2 (amount, material_id, recycle_type_id)
VALUES
  (1, 1, 1),
  (1, 1, 2),
  (1, 1, 3),

  (1, 2, 1),
  (1, 2, 2),
  (1, 2, 3),

  (1, 3, 1),
  (1, 3, 2),
  (1, 3, 3),

  (1, 4, 1),
  (1, 4, 2),
  (1, 4, 3),

  (1, 5, 1),
  (1, 5, 2),
  (1, 5, 3),

  (1, 6, 1),
  (1, 6, 2),
  (1, 6, 3),

  (1, 7, 1),
  (1, 7, 2),
  (1, 7, 3),

  (1, 8, 1),
  (1, 8, 2),
  (1, 8, 3),

  (1, 9, 1),
  (1, 9, 2),
  (1, 9, 3),

  (1, 10, 1),
  (1, 10, 2),
  (1, 10, 3),

  (1, 11, 1),
  (1, 11, 2),
  (1, 11, 3);



INSERT INTO record_state (name)
VALUES ("ACTIVE"),
  ("DELETED"),
  ("REPORTED");

INSERT INTO material_type (name)
VALUES ("raw_material"),
  ("composite_material");


INSERT INTO used_material(user_id, material_type_id, amount, comment)
VALUES (3, 1, 8, "En kommentar"),
  (3, 2, 12, "En annan kommentar");

INSERT INTO raw_material(unit_id, recycle_type_id, material_id)
VALUES (1, 1, 1);

INSERT INTO used_has_raw_material(used_material_id, raw_material_id)
VALUES (1, 1);

INSERT INTO composite_material (user_id, name, unit_id)
VALUES
  (3, "Test_material", 1);

INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount)
VALUES
  (1, 1, 1, 1, 1),
  (1, 2, 2, 2, 3);

INSERT INTO used_has_composite_material(used_material_id, composite_material_id)
VALUES (2, 1);

SELECT *
FROM user;
