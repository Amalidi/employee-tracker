//npm requires
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// import the action questions
const {
  question,
  addRole,
  updateEmployeeRole,
  addDepartment,
  addNewEmployee,
} = require("./utils/questions");

//initialize app
const init = async () => {
  //
  const db = new DB("company_db");

  await db.start();

  //declare variable to track in progress
  let inProgress = true;

  // loop through questions while progress is true
  while (inProgress) {
    // prompt choice questions
    const { answers } = await inquirer.prompt(question);

    // use if statements to prompt questions and
    if (answers.action === "exit") {
      inProgress = false;
    } else {
      // the start
      if (answers.action === "viewAllEmployees") {
        const query = "SELECT * FROM employee";
        const data = await db.query(query);
        console.table(data);
      }

      if (answers.action === "addEmployee") {
        const roleQuery = "SELECT * FROM role";
        const allRoles = await db.query(roleQuery);

        // function to allow users to select any role
        const { first_name, last_name, role_id, manager_id } =
          await inquirer.prompt(addNewEmployee);

        // prompt the questions to add a new employee
        const usersAnswers = await inquirer.prompt(addNewEmployee);
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${usersAnswers.first_name}', '${usersAnswers.last_name}', '${usersAnswers.role_id}', '${usersAnswers.manager_id}');`;
        const data = await db.query(query);
        console.log("Employee has been added successfully");
      }

      // update employees role
      if (answers.action === "updateEmployeeRole") {
        const allEmployees = "SELECT * FROM employee";
        // query data
        const getEmployeeData = await db.query(allEmployees);
        console.table(getEmployeeData);

        // prompt update questions
        const chosenRole = await inquirer.prompt(updateEmployeeRole);

        // execute query for update selected employee role
        const query = `UPDATE employee SET role_id = ('${chosenRole.role}') WHERE ID = ('${chosenRole.id}');`;
        const data = await db.query(query);

        // execute query for update selected employee role
        const reselect = "SELECT * FROM employee";
        const newData = await db.query(reselect);
        console.table(newData);

        console.log("Employee role has been successfully updated");
      }

      // a selection of all the roles
      if (answers.action === "viewAllRoles") {
        // execute query for SELECT * FROM roles table
        const query = "SELECT * FROM role";
        const data = await db.query(query);
        console.table(data);
      }

      // add a role
      if (answers.action === "addRole") {
        // query
        const getDepartments = "SELECT * FROM role";
        const allDepartments = await db.query(getDepartments);
        console.table(allDepartments);

        // prompt the the addrole questions from the questions js
        const insertQuery = await inquirer.prompt(addRole);

        const query = `INSERT INTO role (title, salary, department_id) VALUES ('${insertQuery.title}', '${insertQuery.salary}', '${insertQuery.department_id}');`;
        const data = await db.query(query);

        const reselect = "SELECT * FROM role";
        const newData = await db.query(reselect);
        console.table(newData);
        console.log("New role has been successfully added");
      }

      // option to view all departments
      if (answers.action === "viewAllDepartments") {
        const query = "SELECT * FROM department";

        // execute query for SELECT * FROM departments table
        const seeAllDepartments = await db.query(query);
        console.table(seeAllDepartments);
      }

      // option to add a department
      if (answers.action === "addDepartment") {
        const dp = "SELECT * FROM department";
        const newDepartment = await db.query(dp);
        console.table(newDepartment);

        // prompt the question
        const insertQuery = await inquirer.prompt(addDepartment);
        const query = `INSERT INTO department (name) VALUES ('${insertQuery.name}');`;

        // execute query
        const data = await db.query(query);
        const reselect = "SELECT * FROM department";
        const newSelection = await db.query(reselect);

        console.table(newSelection);
        console.log("New department has been successfully added");
      }
    }
  }
};

init();
