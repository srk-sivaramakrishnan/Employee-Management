create database employee;
use employee;

create table User_details(
ID int auto_increment primary key,
Name varchar(256) not null,
Password varchar(256) not null
);

CREATE TABLE Employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255),
    address VARCHAR(255),
    employee_id VARCHAR(20),
    qualification VARCHAR(255),
    position VARCHAR(100),
    salary DECIMAL(10, 2)
);

SELECT * FROM Employees;
