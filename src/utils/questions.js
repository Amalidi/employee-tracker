//create start question
const actionQuestion = [
  {
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
  },
];

// questions to add a department
const addDepartment = {
  type: "input",
  name: "name",
  message: "What is the name of the department?",
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
    choices: generateroleChoices,
  },
  {
    type: "list",
    name: "manager_id",
    choices: generateManagersChoices,
  },
];

//questions to add role
const addRole = [
  {
    type: "input",
    name: "title",
    message: "Please input a title for new role?",
  },
  {
    type: "number",
    name: "salary",
    message: "Please set the salary for this role?",
  },
  {
    type: "input",
    name: "department_id",
    message: "Please set the department id?",
  },
];

// update role questions
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

module.exports = {
  actionQuestion,
  addRole,
  updateEmployeeRole,
  addDepartment,
  addNewEmployee,
};
