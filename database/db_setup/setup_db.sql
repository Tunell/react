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
-- Table `byggstyrning`.`used_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `byggstyrning`.`used_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `composite_material_id` INT NOT NULL,
  `amount` INT NOT NULL,
  `comment` VARCHAR(200) NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `changed` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_used_material_user1_idx` (`user_id` ASC),
  INDEX `fk_used_material_composite_material1_idx` (`composite_material_id` ASC),
  CONSTRAINT `fk_used_material_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `byggstyrning`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_used_material_composite_material1`
    FOREIGN KEY (`composite_material_id`)
    REFERENCES `byggstyrning`.`composite_material` (`id`)
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
  `amount` INT NOT NULL,
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
  `amount` INT NOT NULL,
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
