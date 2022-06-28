//npm requires
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// const {
//   actionQuestions,
//   addDepartment,
//   addRole,
//   addEmployee,
//   updateEmployeeRole,
// } = require("./utils/questions");

const init = async () => {
  const db = new DB("company_db");

  await db.start();

  let inProgress = true;

  // loop through questions while progress is true
  while (inProgress) {
    const question = {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        {
          short: "Employees",
          value: "viewAllEmployees",
          name: "View All Employees",
        },
        {
          short: "Add Employee",
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          value: "updateEmployeeRole",
          name: "Update an Employee Role",
        },
        {
          short: "Roles",
          value: "viewAllRoles",
          name: "View All Roles",
        },
        {
          value: "addRole",
          name: "Add Role",
        },
        {
          short: "Departments",
          value: "viewAllDepartments",
          name: "View All Departments",
        },
        {
          value: "addDepartment",
          name: "Add Departments",
        },
        {
          short: "Exit",
          value: "exit",
          name: "Exit",
        },
      ],
    };
  }
};
init();
