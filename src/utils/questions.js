//create start question
const actionQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "chosenAction",
    choices: [
      {
        value: "viewDepartments",
        name: "View all departments",
      },
      {
        value: "viewRoles",
        name: "View all roles",
      },
      {
        value: "viewEmployees",
        name: "View all employees",
      },
      {
        value: "addDepartment",
        name: "Add a new department",
      },
      {
        value: "addRole",
        name: "Add a new role",
      },
      {
        value: "addEmployee",
        name: "Add a new employee",
      },
      {
        value: "updateEmployeeRole",
        name: "Update an employee role",
      },
      {
        value: "exitApp",
        name: "Exit application",
      },
    ],
  },
];

// questions to add a department
const addDepartment = {
  type: "input",
  name: "departmentName",
  message: "What is the name of the department?",
};

//questions to add role
const addRole = [
  {
    type: "input",
    name: "newRole",
    message: "What is the name of the role?",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary of the role?",
  },
  {
    type: "list",
    name: "departmentType",
    message: "Which department does the role belong to?",
    choices: generateDepartmentList,
  },
];

const employee = [
  {
    type: "input",
    name: "employeeName",
    message: "Enter employee first name?",
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "Please enter employee last name?",
  },
  {
    type: "input",
    name: "employeeRole",
    message: "Please enter the employee role?",
  },
];

const updateEmployeeRole = [
  {
    type: "input",
    name: "employeeName",
    message: "Please select the employee you were like to update?",
    choices: generateEmployeeList,
  },

  {
    type: "input",
    name: "employeeName",
    message: "Please select the role you want to update for the employee?",
    choices: generateRolesList,
  },
];

module.exports = {
  actionQuestions,
  addDepartment,
  addRole,
  employee,
  updateEmployeeRole,
};
