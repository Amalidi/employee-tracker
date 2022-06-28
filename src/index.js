const inquirer = require("inquirer");
const {
  actionQuestions,
  addDepartment,
  addRole,
  employee,
  updateEmployeeRole,
} = require("./utils/questions");

// fn to prompt inquirer questions
const init = async () => {
  let inProgress = true;

  // loop through questions while progress is true

  while (inProgress) {
    // prompt choice questions
    const { action } = await inquirer.prompt(actionQuestions);
  }
};

init();
