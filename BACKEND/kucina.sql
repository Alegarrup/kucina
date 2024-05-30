-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kucina
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kucina
-- -----------------------------------------------------
DROP DATABASE `kucina`;
CREATE DATABASE IF NOT EXISTS `kucina` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `kucina` ;

-- -----------------------------------------------------
-- Table `kucina`.`USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kucina`.`USUARIO` (
  `idUsuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomUsuario` VARCHAR(255) NOT NULL,
  `contrasenia` VARCHAR(255) CHARACTER SET 'utf8mb3' NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `nomUsuario` (`nomUsuario` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


INSERT INTO `USUARIO` (`nomUsuario`,`contrasenia`) VALUES ('Alegarrup','kucina');


-- -----------------------------------------------------
-- Table `kucina`.`PEDIDO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kucina`.`PEDIDO` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `pedidoConfirmado` TINYINT NULL,
  `USUARIO_idUsuario` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idPedido`, `USUARIO_idUsuario`),
  INDEX `fk_PEDIDO_USUARIO_idx` (`USUARIO_idUsuario` ASC),
  CONSTRAINT `fk_PEDIDO_USUARIO`
    FOREIGN KEY (`USUARIO_idUsuario`)
    REFERENCES `kucina`.`USUARIO` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kucina`.`CATEGORIA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kucina`.`CATEGORIA` (
  `categoria` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `categoria_UNIQUE` (`categoria` ASC),
  PRIMARY KEY (`categoria`))
ENGINE = InnoDB;


INSERT INTO `CATEGORIA` (`categoria`) VALUES ('madera');
INSERT INTO `CATEGORIA` (`categoria`) VALUES ('lacado');
INSERT INTO `CATEGORIA` (`categoria`) VALUES ('laminado');


-- -----------------------------------------------------
-- Table `kucina`.`PRODUCTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kucina`.`PRODUCTO` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `imgURL` VARCHAR(200) NULL,
  `precio` INT NULL,
  `ancho` INT NULL,
  `largo` INT NULL,
  `material` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProducto`, `material`),
  INDEX `fk_PRODUCTO_CATEGORIA1_idx` (`material` ASC),
  CONSTRAINT `fk_PRODUCTO_CATEGORIA1`
    FOREIGN KEY (`material`)
    REFERENCES `kucina`.`CATEGORIA` (`categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m1.PNG', 25, 50, 50, 'madera');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m3.PNG', 30, 55, 60, 'madera');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m18.PNG', 35, 60, 70, 'madera');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m22.PNG', 40, 65, 80, 'madera');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m20.PNG', 45, 70, 90, 'madera');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m13.PNG', 50, 75, 100, 'madera');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m10.PNG', 55, 80, 110, 'madera');

INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m2.PNG', 25, 50, 50, 'laminado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m5.PNG', 30, 55, 60, 'laminado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m11.PNG', 35, 60, 70, 'laminado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m17.PNG', 40, 65, 80, 'laminado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m21.PNG', 45, 70, 90, 'laminado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m14.PNG', 50, 75, 100, 'laminado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m12.PNG', 55, 80, 110, 'laminado');

INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m4.PNG', 25, 50, 50, 'lacado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m6.PNG', 30, 55, 60, 'lacado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m7.PNG', 35, 60, 70, 'lacado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m8.PNG', 40, 65, 80, 'lacado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m9.PNG', 45, 70, 90, 'lacado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m15.PNG', 50, 75, 100, 'lacado');
INSERT INTO `PRODUCTO` (`imgURL`, `precio`, `ancho`, `largo`, `material`) VALUES ('assets/imgURL/m16.PNG', 55, 80, 110, 'lacado');


-- -----------------------------------------------------
-- Table `kucina`.`ES_AÑADIDO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kucina`.`ES_AÑADIDO` (
  `PEDIDO_idPedido` INT NOT NULL,
  `PEDIDO_USUARIO_idUsuario` INT UNSIGNED NOT NULL,
  `PRODUCTO_idProducto` INT NOT NULL,
  PRIMARY KEY (`PEDIDO_idPedido`, `PEDIDO_USUARIO_idUsuario`, `PRODUCTO_idProducto`),
  INDEX `fk_PEDIDO_has_PRODUCTO_PRODUCTO1_idx` (`PRODUCTO_idProducto` ASC),
  INDEX `fk_PEDIDO_has_PRODUCTO_PEDIDO1_idx` (`PEDIDO_idPedido` ASC, `PEDIDO_USUARIO_idUsuario` ASC),
  CONSTRAINT `fk_PEDIDO_has_PRODUCTO_PEDIDO1`
    FOREIGN KEY (`PEDIDO_idPedido` , `PEDIDO_USUARIO_idUsuario`)
    REFERENCES `kucina`.`PEDIDO` (`idPedido` , `USUARIO_idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PEDIDO_has_PRODUCTO_PRODUCTO1`
    FOREIGN KEY (`PRODUCTO_idProducto`)
    REFERENCES `kucina`.`PRODUCTO` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
