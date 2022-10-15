CREATE SCHEMA `gerenciamento_de_frotas_bd` ;

-- CREATE TABLE `gerenciamento_de_frotas_bd`.`contas` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `descricao` VARCHAR(150) NOT NULL,
--   `valor` DOUBLE NOT NULL,
--   `vencimento` DATE NULL,
--   `desconto` DOUBLE NULL,
--   `parcela` INT NULL,
--   `totalParcelas` INT NOT NULL,
--   PRIMARY KEY (`id`));

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
flush privileges;