create database ArivallavanBricks;
use ArivallavanBricks;



-- AddWorker-- 

CREATE TABLE Workers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  EmpId VARCHAR(50),
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  Age INT,
  DOB DATE,
  Gender VARCHAR(10),
  ContNum VARCHAR(20),
  EmergencyContNum VARCHAR(20),
  JoiningDate DATE,
  EmpAddress TEXT,
  ProfileImgPath VARCHAR(255),
  EmpDocPath VARCHAR(255)
);


select * from Workers;
drop table Workers;



CREATE TABLE WorkerAttendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  EmpId VARCHAR(50),
  WorkerName VARCHAR(100),
  Shift VARCHAR(50),
  AttendanceDate VARCHAR(20),
  Remarks TEXT,
  Status ENUM('Present', 'Absent', 'Leave') DEFAULT 'Present',
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from WorkerAttendance;
drop table WorkerAttendance;






CREATE TABLE MakingProduct (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ProductId VARCHAR(20) NOT NULL UNIQUE,
  ProductDate DATE NOT NULL,
  ProductType VARCHAR(50) NOT NULL,
  SessionType VARCHAR(50) NOT NULL,
  Quantity INT NOT NULL,
  QuantityType VARCHAR(20) NOT NULL, -- Palat / pieceCount
  CementType VARCHAR(20) NOT NULL,   -- Radio button selection
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from MakingProduct;
drop table MakingProduct;



CREATE TABLE exportproduct (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ExportId VARCHAR(50),
  ProductId VARCHAR(50),
  CusName VARCHAR(100),
  CusAddress VARCHAR(255),
  CusNumber VARCHAR(20),
  ProductType VARCHAR(50),
  ProductCount INT,
  SinglePiecePrice DECIMAL(10,2),
  UnitCount INT,
  SingleUnitPrice DECIMAL(10,2),
  TotalAmount DECIMAL(10,2),
  FinalTotalAmount DECIMAL(10,2),
  PaymentStatus VARCHAR(20),
  PaidAmount DECIMAL(10,2),
  BalanceAmount DECIMAL(10,2),
  TransportMode VARCHAR(50),
  TripStartingKM DECIMAL(10,2) DEFAULT 0,
  TripEndKM DECIMAL(10,2) DEFAULT 0,
  TotalKM DECIMAL(10,2) DEFAULT 0,
  TotalTripTime VARCHAR(100) DEFAULT NULL,
  DriverName VARCHAR(100),
  VehicleNumber VARCHAR(50),
  EmpCount INT,
  VechOutTime VARCHAR(20),
  VechInTime VARCHAR(20),
  CurrentDate DATE DEFAULT (CURDATE()),
  CurrentTime TIME DEFAULT (CURTIME()),
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from exportproduct;
drop table exportproduct;

CREATE TABLE payment_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ExportId VARCHAR(50) NOT NULL,
  PaidAmount DECIMAL(10,2) NOT NULL,
  PaymentMode VARCHAR(50) DEFAULT 'Cash',
  PaymentDate DATE,
  PaymentTime TIME,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from payment_history;
drop table payment_history;




CREATE TABLE ImportProducts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ImportId VARCHAR(50) UNIQUE,
    ImportDate DATE,
    ImportAddress VARCHAR(255),
    VehicleNumber VARCHAR(50),
    MaterialType VARCHAR(100),
    MaterialSize VARCHAR(100),
    MaterialPrice DECIMAL(10,2),
    MaterialTotalPrice DECIMAL(10,2),
    WagesAmount DECIMAL(10,2),
    MiscellaneousAmount DECIMAL(10,2),
    GSTAmount DECIMAL(10,2),
    FinalTotalAmount DECIMAL(10,2),
    PaidAmount DECIMAL(10,2),
    BalanceAmount DECIMAL(10,2),
    PaymentStatus VARCHAR(50),
    Notequery TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from ImportProducts;
drop table ImportProducts;