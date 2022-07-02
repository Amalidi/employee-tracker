//npm requires
require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const database = require("./utils/DB");

// import the action questions
const {
  actionQuestion,
  addRole,
  updateEmployeeRole,
  addDepartment,
  generateEmployeeQuestions,
} = require("./utils/questions");
const ExpandPrompt = require("inquirer/lib/prompts/expand");

//initialize the app
const init = async () => {
  // const db = new DB("company_db");

  //sql config start connection
  const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  //connect to sql database
  const { executeQuery, closeConnection } = await database(db);

  //declare variable to track in progress
  let inProgress = true;

  // loop through questions while progress is true
  while (inProgress) {
    // prompt choice questions
    const { action } = await inquirer.prompt(actionQuestion);

    // use if statements to prompt questions and
    if (action === "exit") {
      inProgress = false;
    } else {
      // the start
      if (action === "viewAllEmployees") {
        const query = `SELECT E.ID, CONCAT(E.FIRST_NAME,' ',E.LAST_NAME) AS 'EMPLOYEE', R.SALARY, R.TITLE, D.NAME,CONCAT( M.FIRST_NAME,' ',
        M.LAST_NAME) AS MANAGER FROM EMPLOYEE AS E JOIN EMPLOYEE AS M ON E.MANAGER_ID = M.ID INNER JOIN ROLE R ON E.ROLE_ID = R.ID LEFT JOIN DEPARTMENT D ON R.DEPARTMENT_ID = D.ID ;`;
        const data = await executeQuery(query);
        console.table(data);
      }

      // Add an employee
      if (action === "addEmployee") {
        // query all users from db and present to user to select manager
        // query the roles for user to select the new user role
        const roleQuery = "SELECT * FROM role";
        const allRoles = await executeQuery(roleQuery);

        const employeeQuery = "SELECT * FROM employee";
        const employees = await executeQuery(employeeQuery);

        const getDepartmentsList = employees.map((employee) => ({
          name: employee.title,
          value: employee.id,
          short: employee.title,
        }));

        // function to allow users to select any role
        const { first_name, last_name, role_id, manager_id } =
          await inquirer.prompt(generateEmployeeQuestions(allRoles, employees));

        // prompt the questions to add a new employee
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}');`;
        const data = await executeQuery(query);
        console.log("Employee has been added successfully");
      }

      //update employee
      if (action === "updateEmployeeRole") {
        //queries
        const employee = await executeQuery("SELECT * FROM employee");
        const role = await executeQuery("SELECT * FROM role");

        const { id, role_id } = await inquirer.prompt(
          updateEmployeeRole(role, employee)
        );

        const query = `UPDATE employee SET role_id = ${role_id} WHERE id = ${id}`;
        const data = await executeQuery(query);

        // const reselect = "SELECT * FROM employee";
        // const newData = await executeQuery(reselect);
        // console.table(newData);
        // console.table(data);
        console.log("Employee role has been successfully updated");
      }

      // a selection of all the roles
      if (action === "viewAllRoles") {
        // execute query for SELECT * FROM roles table
        const query = "SELECT * FROM role";
        const data = await executeQuery(query);
        console.table(data);
      }

      // add a role
      if (action === "addRole") {
        // prompt the the addrole questions from the questions js
        // query
        const getDepartments = "SELECT * FROM department";
        const allDepartments = await executeQuery(getDepartments);
        console.table(allDepartments);

        const getDepartmentsList = allDepartments.map((department) => ({
          name: department.name,
          value: department.id,
        }));

        // function to allow users to select any role
        const insertQuery = await inquirer.prompt(addRole(allDepartments));

        // console.log(insertQuery);

        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${insertQuery.title}', '${insertQuery.salary}', '${insertQuery.department_id}');`;
        const data = await executeQuery(query);

        const reselect = "SELECT * FROM role";
        const newData = await executeQuery(reselect);
        console.table(data);
        console.log("New role has been successfully added");
      }

      // option to view all departments
      if (action === "viewAllDepartments") {
        const query = "SELECT * FROM department";

        // execute query for SELECT * FROM departments table
        const seeAllDepartments = await executeQuery(query);
        console.table(seeAllDepartments);
      }

      // option to add a department
      if (action === "addDepartment") {
        // const dp = "SELECT * FROM department";
        // const newDepartment = await executeQuery(dp);
        // console.table(newDepartment);

        // prompt the question
        const insertQuery = await inquirer.prompt(addDepartment);
        const query = `INSERT INTO department (name) VALUES ('${insertQuery.name}');`;

        // execute query
        await executeQuery(query);
        console.log("New department has been successfully added");
      }

      // when exit is selected break the while loop
      if (action === "exit") {
        inProgress = false;
        await closeConnection();
        console.log("You have successfully exited the application");
        process.exit(0);
      }
    }
  }
};

init();
