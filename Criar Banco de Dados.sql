CREATE SCHEMA `gerenciamento_de_frotas_bd` ;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'localhost';
flush privileges;

use gerenciamento_de_frotas_bd;
insert into usuarios values(null,'admin', '$2a$10$epvBFRb91SI.JyQisGkHfu/8HVUDmXfgXRHKBRmDM1OMWu7eg77Rq', 'adm@ti.corporate.org', 'Administrator', '', NULL, NULL, '2022-12-06 22:25:14', '2022-12-06 22:25:14')

