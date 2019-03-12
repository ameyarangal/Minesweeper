drop database if exists minesweeperDB;
create database minesweeperDB;

use minesweeperDB;

Create table Users (Id int unsigned NOT NULL AUTO_INCREMENT, FirstName VARCHAR(150) NOT NULL, LastName VARCHAR(150) NOT NULL, Username VARCHAR(150) NOT NULL, Password VARCHAR(150) NOT NULL, PRIMARY KEY (Id));

Create table History (Id int unsigned NOT NULL AUTO_INCREMENT, UserId int, Score int NOT NULL, Status VARCHAR(150) NOT NULL, Difficulty VARCHAR(150) NOT NULL, Date VARCHAR(50) Not NULL, PRIMARY KEY (Id));

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

FLUSH PRIVILEGES;
