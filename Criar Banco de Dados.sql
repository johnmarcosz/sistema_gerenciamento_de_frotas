CREATE SCHEMA `gerenciamento_de_frotas_bd` ;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
flush privileges;
use gerenciamento_de_frotas_bd

insert into usuarios(username, senha, nome) values ('admin','$2a$10$1pNmqnZYz5B3jHhHTiri1OZUWRE8o3H04pql.zUkCBPLLPTi1Dv9.'	,'Administrador')