// IMPORTS
// ------------------------
const {
    displayDeptsTable,
    getDepts,
    addDept,
    removeDept,
    findDeptByName,
} = require("../lib/deptQueries");


const {
    displayRolesTable,
    getRoles,
    findRoleByTitle,
    addRole,
    removeRole,
} = require("../lib/roleQueries");


const {
    viewAllEmployees,
    findEmployyeByName,
    getEmployees,
    addEmployee,
    updateEmployeeRole,
    sortByManager,
    deleteEmployee,
} = require("../lib/empQueries");


const inquirer = require("inquirer");
// ------------------------

// Add Employee
// ------------------------

const addEmployeePrompt = async () => {
    const roles = await getRoles();
    const managers = ["None"].concat(await getEmployees());
    const { firstName, lastName, selectedRole, selectedManager } =
        await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "New Employee's First Name?",
                validate: (firstNameInput_1) => {
                    if (firstNameInput_1) {
                        return true;
                    } else {
                        return "Please enter a first name.";
                    }
                },
            },
            {
                type: "input",
                name: "lastName",
                message: "New Employee's Last Name?",
                validate: (lastNameInput_1) => {
                    if (lastNameInput_1) {
                        return true;
                    } else {
                        return "Please enter a last name.";
                    }
                },
            },
            {
                type: "list",
                name: "selectedRole",
                message: "New Employee's Role?",
                choices: roles,
            },
            {
                type: "list",
                name: "selectedManager",
                message: "Who will the new Employee report to?",
                choices: managers,
            },
        ]);


    const splitName = selectedManager.split(" ");
    const roleId = await findRoleByTitle(selectedRole);
    const managerId =
        selectedManager === "None" ? null : await findEmployyeByName(splitName);
    const newEmployee = {
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId,
    };
    addEmployee(newEmployee);
    menu();
};

// ------------------------

// Add New Department
const addDeptPrompt = async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "New Department Name?",
            validate: (nameInput_1) => {
                if (nameInput_1) {
                    return true;
                } else {
                    console.log("New Department Must Have Name");
                    return false;
                }
            },
        },
    ]);
    addDept(name);
    menu();
};

// Add New Role
const addRolePrompt = async () => {
    const departments = await getDepts();
    const { title, salary, selectedDepartment } = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "New Role's Title?",
            validate: (titleInput_1) => {
                if (titleInput_1) {
                    return true;
                } else {
                    console.log("New Role Must Have A Title");
                    return false;
                }
            },
        },
        {
            type: "number",
            name: "salary",
            message: "New Role's Salary?",
            validate: (salaryInput_1) => {
                if (salaryInput_1) {
                    return true;
                } else {
                    console.log("New Role Must Have A Salary Provided");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "selectedDepartment",
            message: "Which Department Will The Role Be Under?",
            choices: departments,
        },
    ]);
    const departmentId = await findDeptByName(selectedDepartment);
    const newRole = {
        title: title,
        salary: salary,
        departmentId: departmentId,
    };
    addRole(newRole);
    menu();
};

// Update employee role function
const updateEmployeeRolePrompt = async () => {
    const employees = await getEmployees();
    const roles = await getRoles();
    const { employee, role } = await inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which Employee's Role would you like to update?",
            choices: employees,
        },
        {
            type: "list",
            name: "role",
            message: "What is the Employee's updated Role?",
            choices: roles,
        },
    ]);
    const splitName = employee.split(" ");
    const employeeId = await findEmployyeByName(splitName);
    const roleId = await findRoleByTitle(role);
    updateEmployeeRole(employeeId, roleId);
    menu();
};

// Delete department function
const deleteDeptPrompt = async () => {
    const departments = await departments();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which Department is to be removed?",
            choices: departments,
        },
    ]);
    removeDept(name);
    menu();
};

// Delete role function
const deleteRolePrompt = async () => {
    const roles = await getRoles();
    const { title } = await inquirer.prompt([
        {
            type: "list",
            name: "title",
            message: "Which Role is to be removed?",
            choices: roles,
        },
    ]);
    const roleId = await findRoleByTitle(title);
    removeRole(roleId);
    menu();
};

// Delete role function
const deleteEmployeePrompt = async () => {
    const employees = await getEmployees();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which Employee is being terminated?",
            choices: employees,
        },
    ]);
    const splitName = name.split(" ");
    const employeeId = await findEmployyeByName(splitName);
    deleteEmployee(employeeId);
    menu();
};

// Main menu function
const menu = () => {
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
        "Delete an Employee",
        "Exit",
    ];
    console.log("\n");
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: options,
            },
        ])
        .then(({ choice }) => {
            switch (choice) {
                case "View All Departments":
                    displayDeptsTable();
                    menu();
                    break;
                case "View All Roles":
                    displayRolesTable();
                    return menu();
                case "View All Employees":
                    viewAllEmployees();
                    console.log("\n");
                    return menu();
                case "View Employees by Manager":
                    sortByManager();
                    return menu();
                case "Add a Department":
                    addDeptPrompt();
                    break;
                case "Add a Role":
                    addRolePrompt();
                    break;
                case "Add an Employee":
                    addEmployeePrompt();
                    break;
                case "Update Employee Role":
                    updateEmployeeRolePrompt();
                    break;
                case "Delete a Department":
                    deleteDeptPrompt();
                    break;
                case "Delete a Role":
                    deleteRolePrompt();
                    break;
                case "Terminate an Employee":
                    deleteEmployeePrompt();
                    break;
                case "Exit":
                    process.exit();
            }
        });
};

module.exports = {
    menu
};