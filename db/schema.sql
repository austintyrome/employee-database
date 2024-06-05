DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

\c staff_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(10) NOT NULL
--     // WHEN I choose to add a department
-- // THEN I am prompted to enter the name of the department and that department is added to the database
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(10) NOT NULL,
    role_salary INTEGER NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
--    // WHEN I choose to add a role
-- // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    employee_first VARCHAR(15) NOT NULL,
    employee_last VARCHAR(20) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
-- FIGURE OUT HOW TO ADD MANAGER
-- // WHEN I choose to add an employee
-- // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
);