const db = require('../db/connection');
const cTable = require('console.table');

const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
             FROM employee e
             LEFT JOIN role ON e.role_id = role.id
             LEFT JOIN department ON role.department_id = department.id
             LEFT JOIN employee m ON m.id = e.manager_id`;

// Calls all information from Employees table and displays them in new rows.
const viewAllEmployees = () => {
    db.promise().query(sql)
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
        });
};

// Calls all information from Employees table.
const getEmployees = async () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
             FROM employee e
             LEFT JOIN role ON e.role_id = role.id
             LEFT JOIN department ON role.department_id = department.id
             LEFT JOIN employee m ON m.id = e.manager_id
             ORDER BY e.last_name`;
    try {
        const employees = await db.promise().query(sql)
        return employees[0].map(item => item.Employee);
    } catch (err) {
        console.log(err);
    }
};


// Adds Employee into table.
const addEmployee = async (employee) => {
    try {
        const newEmployee = await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.firstName}', '${employee.lastName}', ${employee.roleId}, ${employee.managerId})`)
        console.log('\n');
        console.log(`Added ${employee.firstName} ${employee.lastName} to the database.`);
        console.log('\n');
    } catch (err) {
        console.log(err);
    }
}

const updateEmployeeRole = async (employeeId, roleId) => {
    try {
        const employee = await db.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`)
        console.log('\n');
        console.log(`Employee's role has been updated.`);
        console.log('\n');
    } catch (err) {
        console.log(err);
    }
};

const findEmployyeByName = async (fullname) => {
    try {
        const employee = await db.promise().query(`SELECT id FROM employee WHERE first_name = '${fullname[0]}' AND last_name = '${fullname[1]}'`)
        return employee[0][0].id;
    } catch (err) {
        console.log(err);
    }
};

// Will allow you to select by a manager, however Manager IDs will need to be present. 
const sortByManager = async () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
                 FROM employee e
                 LEFT JOIN role ON e.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee m ON m.id = e.manager_id
                 ORDER BY m.last_name`;
    try {
        db.promise().query(sql)
            .then(([rows]) => {
                console.log('\n');
                console.table(rows);
            });
    } catch (err) {
        console.log(err);
    }
};

const deleteEmployee = async (employeeId) => {
    const sql = `DELETE FROM employee WHERE id = ${employeeId}`;
    try {
        const employee = await db.promise().query(sql)
        console.log('\n');
        console.log(`Employee has been deleted.`);
        console.log('\n');
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    viewAllEmployees,
    getEmployees,
    findEmployyeByName,
    addEmployee,
    updateEmployeeRole,
    sortByManager,
    deleteEmployee
};