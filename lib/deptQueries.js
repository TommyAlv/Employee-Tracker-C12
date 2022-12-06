// Requiring Connection to connect to SQL.

const db = require('../db/connection');
// Requiring console table will allow it to display correctly.
const cTable = require('console.table');


// Query to get all items from Department.
const allTable = `SELECT * FROM department`;
const deptName = `SELECT name FROM department`;

// Function to run query allTable to return all the rows from the tables.
const getDeptsTable = () => {

    return db.promise().query(allTable)
        .then(([rows]) => {
            return rows;
        });

};


// Function to get all tables from Department on new lines and display them.
const displayDeptsTable = () => {
    getDeptsTable().then(data => {
        console.log('\n');
        console.table(data);
        console.log('\n');
    });
};

// How to call all Departments.
const getDepts = async () => {
    const deptName = `SELECT name FROM department
                            ORDER BY name`;
    try {
        const depts = await db.promise().query(deptName)
        return depts[0].map(item => item.name);
    } catch (err) {
        console.log(err);
    }
};

// Adds new Department to the department table based of input from user.
const addDept = async (name) => {
    const sql = `INSERT INTO department (name) VALUES ('${name}')`;
    try {
        const result = await db.promise().query(sql);
        console.log('\n');
        console.log(`Added ${name} to the Department table`);
        console.log('\n');
    }
    catch (err) {
        console.log(err);
    }
};

// Deletes new Department to the department table based of input from user.
const removeDept = async (name) => {
    const sql = `DELETE FROM department WHERE name = '${name}'`;
    try {
        const result = await db.promise().query(sql);
        console.log('\n');
        console.log(`Removed ${name} from the Department table`);
        console.log('\n');
    }
    catch (err) {
        console.log(err);
    }
};

// Calls department by name inputted.
const findDeptByName = async (name) => {
    try {
        const dept = await db.promise().query(`SELECT id FROM department WHERE name = '${name}'`)
        return dept[0][0].id;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    displayDeptsTable,
    getDeptsTable,
    getDepts,
    addDept,
    removeDept,
    findDeptByName
};