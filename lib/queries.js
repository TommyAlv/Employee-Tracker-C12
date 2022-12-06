const db = require('../db/connection');
const cTable = require('console.table');

const getRoles = (data) => { 
    let roles = [];
    data.forEach(element => {
        roles.push(element.Title);
        
    });
    console.log(roles);
  
};


const viewAllEmployees = () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
               FROM employee e
               LEFT JOIN role ON e.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id
               LEFT JOIN employee m ON m.id = e.manager_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.table(rows);
        }
    });
};

const viewAllRoles = () => {
    const sql = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                 FROM role r
                 LEFT JOIN department ON r.department_id = department.id`;

    db.promise().query(sql)
        .then(([rows]) => {
            getRoles(rows);
            console.table(rows);
        });
};

const viewAllDepts = () => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.table(rows);
        }
    });
};

module.exports = {
    viewAllEmployees,
    viewAllRoles,
    viewAllDepts
};