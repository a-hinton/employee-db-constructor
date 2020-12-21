// npm dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// local file dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

// outputs from user provided info
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Array to hold team information
const team = [];

// Role specific questions
const roleQuestions = {
    Manager: [
        {
            type: 'input',
            name: 'rolequestion',
            message: "Input manager's office number.",
        }
    ],
    Engineer: [
        {
            type: 'input',
            name: 'rolequestion',
            message: "Input engineer's GitHub username.",
        }
    ],
    Intern: [
        {
            type: 'input',
            name: 'rolequestion',
            message: "Input the name of the intern's school.",
            
        }
    ]
}

// Class with templates for specialized employee roles
class EmployeeBuilder {
    Engineer(name, id, email, github) {
        return new Engineer(name, id, email, github);
    }
    Manager(name, id, email, officeNumber) {
        return new Manager(name, id, email, officeNumber);
    }
    Intern(name, id, email, school) {
        return new Intern(name, id, email, school);
    }
}

// collect team member data
function teamData() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'Input employee name', //expect string length of 2 characters or more
                validate: inputName => {
                    if(inputName && inputName.length > 1) {
                        return true;
                    }
                    else {
                        console.log('Enter an enployee name.')
                        return false;
                    }
                }
            },

            {
                type: 'input',
                name: 'id',
                message: 'Input employee id number', //expect integer
                validate: inputId => {
                    checkId = parseInt(inputId);
                    if (isNaN(checkId)) {
                        
                        console.log('You need to provide a number');
                        return false;
                      }
                    else {
                        return true;
                    }
                },
            },

            {
                type: 'input',
                name: 'email',
                message: 'Input employee email address', //expect string including '@' and '.' symbol
                validate: inputEmail => {
                    if(inputEmail && inputEmail.includes('@') && inputEmail.includes('.')) {
                        return true;
                    }
                    else {
                        console.log('Enter a valid email address.')
                        return false;
                    }
                }
            },

            {
                type: 'list',
                name: 'role',
                message: 'Use arrow keys to choose type of employee to add.',
                choices: ['Manager', 'Engineer', 'Intern'] 
            }
        ]
    ).then(answers => {
        // Add different questions based on chosen role
        inquirer.prompt(roleQuestions[answers.role]) //calls object roleQuestions and prompts the value that corresponds to the input role from the initial prompt
            .then(res => {
                const employeeBuilder = new EmployeeBuilder(); //instantiate EmployeeBuilder class
                const employee = employeeBuilder[answers.role](answers.name, answers.id, answers.email, res.rolequestion); //pass relevant parameters to EnployeeBuilder based on input role form initial prompt
                team.push(employee);
                addNewEmployee();
            })
    })
}

// prompt user to add a new employee or write current team to file
function addNewEmployee() {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'addEmployee',
                message: 'Would you like to add another employee?',
                choices: ['Yes', 'No']
            },
        ]
    ).then(reponse => {
        if(reponse.addEmployee === 'No') {
            console.log('Saving team...');
            writePage();
        }
        else {
            teamData();
        }
    })
}


function writePage() {
    fs.writeFile(outputPath, render(team), "utf8", (err) => {
        if (err) throw err;
        console.log('The file has been saved!')
    })
}

teamData()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
