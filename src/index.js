//npm requires
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// import the action questions
const { question, addRole, updateEmployeeRole } = require("./utils/questions");

//initialize app
const init = async () => {
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
      if (answers.action === "viewAllEmployees") {
        const query = "SELECT * FROM employee";
        const data = await db.query(query);
        console.table(data);
      }

      if (answers.action === "addEmployee") {
        const roleQuery = "SELECT * FROM role";
        const allRoles = await db.query(roleQuery);

        // function to allow users to select any role
        const generateChoices = (roles) => {
          return roles.map((role) => {
            return {
              short: role.id,
              name: role.title,
              value: role.id,
            };
          });
        };

        // prompt the questions to add employee
        const addNewEmployee = [
          {
            type: "input",
            name: "first_name",
            message: "Enter employee first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "Please enter employee last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "Please enter the employee role?",
            choices: generateChoices(allRoles),
          },
        ];
        const answers = await inquirer.prompt(addNewEmployee);
        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}');`;
        const data = await db.query(query);
        console.log("Employee has been added successfully");
      }

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

      if (answers.action === "viewAllDepartments") {
        const query = "SELECT * FROM department";

        // execute query for SELECT * FROM departments table
        const seeAllDepartments = await db.query(query);
        console.table(seeAllDepartments);
      }
    }
  }
};

init();
