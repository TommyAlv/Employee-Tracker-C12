
/* Drops tables if they already exist to avoid duplications */
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;



/* Creates DEPARTMENT table. */
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


/* Creates ROLE Table */
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department_id
        FOREIGN KEY (department_id)
        REFERENCES department (id)
        ON DELETE CASCADE
);


/* Creates EMPLOYEE table */
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role_id
        FOREIGN KEY (role_id)
        REFERENCES role (id)
        ON DELETE SET NULL
);