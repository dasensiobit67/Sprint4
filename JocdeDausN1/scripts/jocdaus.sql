CREATE DATABASE IF NOT EXISTS jocdaus CHARACTER SET utf8;
USE  jocdaus;

CREATE TABLE  user (
 iduser INT NOT NULL AUTO_INCREMENT,
 username VARCHAR(45) NOT NULL,
 datareg VARCHAR(10) NOT NULL,
 PRIMARY KEY (iduser),
 UNIQUE INDEX (username)
 );

CREATE TABLE  tirada (
 idtirada  INT NOT NULL AUTO_INCREMENT,
 dau1  INT NOT NULL,
 dau2  INT NOT NULL,
 winorlose BOOLEAN,
 iduser INT NOT NULL,
 PRIMARY KEY ( idtirada ),
 FOREIGN KEY (iduser) REFERENCES  user (iduser)
 );
