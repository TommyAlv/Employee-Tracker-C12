const db = require('../db/connection');
const cTable = require('console.table');

const rolesQuery = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                    FROM role r
                    LEFT JOIN department ON r.department_id = department.id`;

const displayRolesTable = () => {
    return db.promise().query(rolesQuery)
        .then(([rows]) => {
            console.log('\n');
            console.table(rows);
        });
};

const getRoles = async () => {
    const rolesQuery = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                    FROM role r
                    LEFT JOIN department ON r.department_id = department.id
                    ORDER BY r.title`;

    try {
        const roles = await db.promise().query(rolesQuery)
        return roles[0].map(item => item.Title);
    } catch (err) {
        console.log(err);
    }
};

const findRoleByTitle = async (title) => {
    try {
        const role = await db.promise().query(`SELECT id FROM role WHERE title = '${title}'`)
        return role[0][0].id;
    } catch (err) {
        console.log(err);
    }
};

const addRole = async (newRole) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${newRole.title}', ${newRole.salary}, ${newRole.departmentId})`;
    try {
        const role = await db.promise().query(sql)
        console.log('\n');
        console.log(`Added ${newRole.title} to the database.`);
        console.log('\n');
    }
    catch (err) {
        console.log(err);
    }
};

const removeRole = async (roleId) => {
    const sql = `DELETE FROM role WHERE id = ${roleId}`;
    try {
        const role = await db.promise().query(sql)
        console.log('\n');
        console.log(`Removed role from the database.`);
        console.log('\n');
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    displayRolesTable,
    getRoles,
    findRoleByTitle,
    addRole,
    removeRole,
}