// npm dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// local file dependencies
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

// outputs from user provided info
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Array to hold team information
const team = [];

// collect team member data
function teamData() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'Input employee name',
                // validate: inputName => {
                //     if(inputName && inputName.length > 1) {
                //         return true;
                //     }
                //     else {
                //         console.log('Enter an enployee name.')
                //         return false;
                //     }
                // }
            },

            {
                type: 'input',
                name: 'id',
                message: 'Input employee id number',
                validate: inputId => {
                    checkId = parseInt(inputId);
                    if (isNaN(checkId)) {
                        // Pass the return value in the done callback
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
                message: 'Input employee email address',
                // validate: inputEmail => {
                //     if(inputEmail && inputEmail.includes('@')) {
                //         return true;
                //     }
                //     else {
                //         console.log('Enter a valid email address.')
                //         return false;
                //     }
                // }
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
        if(answers.role === 'Manager') {
            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: "Input manager's office number.",
                    }
                ]
            ).then(res => {
                console.log(answers)
                console.log(res)
                const manager = new Manager(answers.name, answers.id, answers.email, res.officeNumber);
                // console.log(manager);
                team.push(manager);
                addNewEmployee();
            })
        }
        else if (answers.role === 'Engineer') {
            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name: 'github',
                        message: "Input engineer's GitHub username.",
                    }
                ]
            ).then(res => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, res.github);
                team.push(engineer);
                addNewEmployee(); 
            })
        }
        else {
            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name: 'school',
                        message: "Input the name of the intern's school.",
                        
                    }
                ]
            ).then(res => {
                const intern = new Intern(answers.name, answers.id, answers.email, res.school);
                team.push(intern);
                addNewEmployee();
            })
        }
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
