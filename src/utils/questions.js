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

const generateRoleChoices = (roles) => {
  return roles.map((role) => {
    return {
      name: role.title,
      value: role.id,
      short: role.title,
    };
  });
};

const generateManagersChoices = (managers) => {
  return managers.map((manager) => {
    return {
      name: `${manager.first_name} ${manager.last_name}`,
      value: manager.id,
      short: `${manager.first_name} ${manager.last_name}`,
    };
  });
};

// employee
const showEmployeeChoices = (employeeFromDB) => {
  return employeeFromDB.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
};

const showRoleChoices = (rolesFromDB) => {
  return rolesFromDB.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
};

// prompt the questions to add employee
const generateEmployeeQuestions = (roles, employees) => {
  return [
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
      choices: generateRoleChoices(roles),
    },
    {
      type: "list",
      name: "manager_id",
      choices: generateManagersChoices(employees),
    },
  ];
};

//questions to add role
const addRole = (departments) => [
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
    type: "list",
    name: "department_id",
    message: "Select department",
    choices: generateRoleChoices(departments),
  },
];

// update role questions
const updateEmployeeRole = (role, employee) => [
  {
    type: "list",
    name: "id",
    message: "Please select the employee you would like to update?",
    choices: showEmployeeChoices(employee),
  },
  {
    type: "list",
    name: "role_id",
    message: "Please input new role id for employee?",
    choices: showRoleChoices(role),
  },
];

module.exports = {
  actionQuestion,
  addRole,
  updateEmployeeRole,
  addDepartment,
  generateEmployeeQuestions,
};
