//global variables
const connection = require('../connection')
const index = require('./initialPrompt')

//__View all departments__
const viewDepartments = () => {
    console.log('Showing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 
  
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      index.init();
    });
}

//__View all roles__
const viewRoles = () => {
    console.log('Showing all roles...\n');

    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                 FROM role
                 INNER JOIN department ON role.department_id = department.id`;
    
    connection.query(sql, (err, rows) => {
      if (err) throw err; 
      console.table(rows); 
      index.init();
    })
}

//__View all employees__
const viewEmployees = () => {
    console.log('Showing all employees...\n'); 
    const sql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.name AS department,
                        role.salary, 
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager
                 FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  
    connection.query(sql, (err, rows) => {
      if (err) throw err; 
      console.table(rows);
      index.init();
    });
}

//__View all employees based on department selection__
const viewEmployeeDepartment = () => {
    console.log('Showing employee by departments...\n');
    const sql = `SELECT employee.first_name, 
                        employee.last_name, 
                        department.name AS department
                 FROM employee 
                 LEFT JOIN role ON employee.role_id = role.id 
                 LEFT JOIN department ON role.department_id = department.id`;
  
    connection.query(sql, (err, rows) => {
      if (err) throw err; 
      console.table(rows); 
      index.init();
    });          
  };

//__View budget of selected department__
const viewBudget = () => {
    console.log('Showing budget by department...\n');
  
    const sql = `SELECT department_id AS id, 
                        department.name AS department,
                        SUM(salary) AS budget
                 FROM  role  
                 JOIN department ON role.department_id = department.id GROUP BY  department_id`;
    
    connection.query(sql, (err, rows) => {
      if (err) throw err; 
      console.table(rows);
  
      index.init(); 
    });            
  };

module.exports = {viewDepartments, viewEmployees, viewRoles, viewEmployeeDepartment, viewBudget}