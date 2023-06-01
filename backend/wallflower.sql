CREATE DATABASE Wallflower;  

USE Wallflower;
  
CREATE TABLE ApplicationChoice (  
  ID VARCHAR(100) PRIMARY KEY,  
  TopChoice VARCHAR(250),  
  BottomChoice VARCHAR(250)  
);  
CREATE TABLE VideoChoice (  
  ID VARCHAR(100) PRIMARY KEY,  
  TopChoice VARCHAR(250),  
  BottomChoice VARCHAR(250)  
);  
CREATE TABLE PreferredChoice (  
  ID VARCHAR(100) PRIMARY KEY,  
  Choice VARCHAR(250)  
);  
CREATE TABLE User (  
  ID VARCHAR(100) PRIMARY KEY,  
  Username VARCHAR(250),  
  Password VARCHAR(250)  
);  
CREATE TABLE Feeling (  
  ID VARCHAR(100) PRIMARY KEY,  
  DataOption VARCHAR(250)  
);  
CREATE TABLE Influence (  
  ID VARCHAR(100) PRIMARY KEY,  
  DataOption VARCHAR(250)  
);  
CREATE TABLE Opinion (  
  ID VARCHAR(100) PRIMARY KEY,  
  DataOption VARCHAR(250)  
);  
CREATE TABLE Overall (  
  ID VARCHAR(100) PRIMARY KEY,  
  DataOption VARCHAR(250)  
);  
CREATE TABLE Valid (  
  ID VARCHAR(100) PRIMARY KEY,  
  DataOption VARCHAR(250)  
);  