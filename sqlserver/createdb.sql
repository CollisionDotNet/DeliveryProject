USE master;
CREATE DATABASE deliverydb;
GO
USE deliverydb;

CREATE TABLE Cities 
(
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(50) NOT NULL
);

CREATE TABLE Orders
(
	Id INT PRIMARY KEY IDENTITY,
	SenderCityId INT REFERENCES Cities(Id),
	SenderAddress NVARCHAR(255) NOT NULL CHECK (SenderAddress != ''), 
	RecipientCityId INT REFERENCES Cities(Id),
	RecipientAddress NVARCHAR(255) NOT NULL CHECK (RecepientAddress != ''),
	Weight FLOAT NOT NULL CHECK (Weight > 0),
	PickupDate DATE NOT NULL
);