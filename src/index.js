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
          short: "Employees By Manager",
          value: "viewEmployeesByManager",
          name: "View Employees By Manager",
        },
        {
          short: "Employees By Role",
          value: "viewAllEmployeesByRole",
          name: "View All Employees By Role",
        },
        {
          short: "Add Employee",
          value: "addEmployee",
          name: "Add an Employee",
        },
        {
          short: "Remove Employee",
          value: "removeEmployee",
          name: "Remove an Employee",
        },
        {
          value: "updateEmployeeRole",
          name: "Update Employee Role",
        },
        {
          value: "updateEmployeeManager",
          name: "Update Employee Manager",
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
          value: "removeRole",
          name: "Remove Role",
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
          value: "removeDepartment",
          name: "Remove Departments",
        },
        {
          value: "viewAllDepartmentsBudgets",
          name: "View All Departments Budgets",
        },
        {
          value: "viewDepartmentsBudgetsById",
          name: "View Departments Budgets By Id",
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
