//Global variables
const connection = require('../connection')
const inquirer = require('inquirer')
const view = require('./viewTables')

//__Add a new department__
const addDepartment = () => {
    inquirer.prompt([
        {
          type: 'input', 
          name: 'addDept',
          message: "What department do you want to add?",
          validate: addDept => {
            if (addDept) {
                return true;
            } else {
                console.log('Please enter a department');
                return false;
            }
          }
        }
      ])
        .then(answer => {
          const sql = `INSERT INTO department (name)
                      VALUES (?)`;
          connection.query(sql, answer.addDept, (err, result) => {
            if (err) throw err;
            console.log('Added ' + answer.addDept + " to departments!"); 
    
            view.viewDepartments();
        });
      });
}


//__Add a new role__
const addRole = () => {
    inquirer.prompt([
        {
          type: 'input', 
          name: 'role',
          message: "What role do you want to add?",
          validate: addRole => {
            if (addRole) {
                return true;
            } else {
                console.log('Please enter a role');
                return false;
            }
          }
        },
        {
          type: 'input', 
          name: 'salary',
          message: "What is the salary of this role?",
          validate: addSalary => {
            if (addSalary) {
                return true;
            } else {
                console.log('Please enter a salary');
                return false;
            }
          }
        }
      ])
        .then(answer => {
          const params = [answer.role, answer.salary];
    
          // grab dept from department table
          const roleSql = `SELECT name, id FROM department`; 
    
          connection.query(roleSql, (err, data) => {
            if (err) throw err; 
        
            const dept = data.map(({ name, id }) => ({ name: name, value: id }));
    
            inquirer.prompt([
            {
              type: 'list', 
              name: 'dept',
              message: "What department is this role in?",
              choices: dept
            }
            ])
              .then(deptChoice => {
                const dept = deptChoice.dept;
                params.push(dept);
    
                const sql = `INSERT INTO role (title, salary, department_id)
                            VALUES (?, ?, ?)`;
    
                connection.query(sql, params, (err, result) => {
                  if (err) throw err;
                  console.log('Added' + answer.role + " to roles!"); 
    
                  view.viewRoles();
           });
         });
       });
     });
}

//__Add a new employee__
const addEmployee = () => {
    inquirer.prompt([
        {
          type: 'input',
          name: 'fistName',
          message: "What is the employee's first name?",
          validate: addFirst => {
            if (addFirst) {
                return true;
            } else {
                console.log('Please enter a first name');
                return false;
            }
          }
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name?",
          validate: addLast => {
            if (addLast) {
                return true;
            } else {
                console.log('Please enter a last name');
                return false;
            }
          }
        }
      ])
        .then(answer => {
        const params = [answer.fistName, answer.lastName]
    
        // grab roles from roles table
        const roleSql = `SELECT role.id, role.title FROM role`;
      
        connection.query(roleSql, (err, data) => {
          if (err) throw err; 
          
          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
    
          inquirer.prompt([
                {
                  type: 'list',
                  name: 'role',
                  message: "What is the employee's role?",
                  choices: roles
                }
              ])
                .then(roleChoice => {
                  const role = roleChoice.role;
                  params.push(role);
    
                  const managerSql = `SELECT * FROM employee`;
    
                  connection.query(managerSql, (err, data) => {
                    if (err) throw err;
    
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
    
                    // console.log(managers);
    
                    inquirer.prompt([
                      {
                        type: 'list',
                        name: 'manager',
                        message: "Who is the employee's manager?",
                        choices: managers
                      }
                    ])
                      .then(managerChoice => {
                        const manager = managerChoice.manager;
                        params.push(manager);
    
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
    
                        connection.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log("Employee has been added!")
    
                        view.viewEmployees();
                  });
                });
              });
            });
         });
      });
}

module.exports = {addDepartment, addEmployee, addRole}