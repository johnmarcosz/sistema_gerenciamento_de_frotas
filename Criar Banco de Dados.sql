CREATE SCHEMA `gerenciamento_de_frotas_bd` ;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
flush privileges;