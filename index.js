//As you can see, all the functions are modular to keep this index looking clean as can be!
//See the utils directory to see functionality.
const inquirer = require('inquirer')
const connection = require('./connection')
const ctable = require('console.table')
const init = require('./utils/initialPrompt')
//Call the function that begins user prompt.
init.init();

    