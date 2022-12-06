const inquirer = require("inquirer");
const {
    displayDeptsTable,
    getDepts,
    getDeptsTable,
    addDept,
    removeDept,
    findDeptByName,
} = require("../lib/deptQueries");

class employeeTracker {
    constructor() {
        this.employees = [];
    }

    menu() {
        const options = [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees by Manager",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Role",
            "Delete a Department",
            "Delete a Role",
            "Terminate an Employee",
            "Exit"
        ];
        const mainOptions = [
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: options
            }
        ];
        inquirer.prompt(mainOptions).then(({ choice }) => {
            switch (choice) {
                case 'View All Departments':
                    this.displayDepts();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit();
                    break;
            }
        });
    }

    displayDepts() {
        console.log('\n');
        console.log('Departments');
        getDeptsTable().then(data => {
            console.table(data);
        });
        this.menu();
    }

};

module.exports = employeeTracker;