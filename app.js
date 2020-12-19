// npm dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// local file dependencies
const Employee = require("../lib/Employee")
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
                message: 'Input employee id number',
                validate: inputId => {
                    idNum = parseInt(inputId);
                    if(inputId && typeof idNum === 'number') {
                        return true;
                    }
                    else {
                        console.log('Enter an employee ID containing only numbers.')
                        return false;
                    }
                }
            },

            {
                type: 'input',
                name: 'email',
                message: 'Input employee email address',
                validate: inputEmail => {
                    if(inputEmail && inputEmail.stringContains('@')) {
                        return true;
                    }
                    else {
                        console.log('Enter a valid email address.')
                    }
                }
            },

            {
                type: 'input',
                name: 'role',
                message: 'Use arrow keys to choose type of employee to add.',
                choices: ['Manger', 'Engineer', 'Intern']
            }
        ]
    ).then(answers => {
        // Add different questions based on chosen role and
        if(answers.role === 'Manager') {
            
        }
    })
}

// prompt({
//     manager questions
//     []
//     if(user select engineer) => promptEngineer();
//     else if(user select intern) => promptIntern();
//     else {
//         render html
//     }
// });

// promptEngineer({
//     engineer questions
//     []
// }).then(engineerResponse => {
//         if (user select engineer) => promptEngineer();
//     else if (user select intern) => promptIntern();
//     else {
//     render html
// }
// });

// promptIntern({
//     intern questions
//     []
// }).then(internResponse => {
//         if (user select engineer) => promptEngineer();
//     else if (user select intern) => promptIntern();
//     else {
//     render html
// }
// });

function addNewEmployee() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'addEmployee',
                message: 'Would you like to add another employee?',
                choices: ['Yes', 'No']
            },
        ]
    ).then(reponse => {
        if(reponse === 'Yes') {
            teamData();
        }
        else {
            console.log('Saving team...');
            writePage();
        }
    })
}


function writePage() {
    fs.writeFile(outputPath, render(team), "utf8", (err) => {
        if (err) throw err;
        console.log('The file has been saved!')
    })
}



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
