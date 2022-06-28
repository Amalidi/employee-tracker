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

    // prompt choice questions
    const answers = await inquirer.prompt(question);

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

        // prompt add employee questions
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
        const empData = await db.query(allEmployees);
        console.table(empData);

        // prompt update questions
        const updateEmployeeRole = [
          {
            type: "input",
            name: "role",
            message: "Please select the employee you would like to update?",
          },
          {
            type: "input",
            name: "id",
            message: "Please input new role id for employee?",
          },
        ];

        // prompted on the terminal
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
      

  }
};
init();
