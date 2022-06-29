//global vairables
const connection = require('../connection')
const inquirer = require('inquirer')
const view = require('./viewTables')

//__Delete a department__
const deleteDepartment = () => {
    const deptSql = `SELECT * FROM department`; 
  
    connection.query(deptSql, (err, data) => {
      if (err) throw err; 
  
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));
  
      inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department do you want to delete?",
          choices: dept
        }
      ])
        .then(deptChoice => {
          const dept = deptChoice.dept;
          const sql = `DELETE FROM department WHERE id = ?`;
  
          connection.query(sql, dept, (err, result) => {
            if (err) throw err;
            console.log("Successfully deleted!"); 
  
          view.viewDepartments();
        });
      });
    });
  };

//__Delete a role__
const deleteRole = () => {
    const roleSql = `SELECT * FROM role`; 
  
    connection.query(roleSql, (err, data) => {
      if (err) throw err; 
  
      const role = data.map(({ title, id }) => ({ name: title, value: id }));
  
      inquirer.prompt([
        {
          type: 'list', 
          name: 'role',
          message: "What role do you want to delete?",
          choices: role
        }
      ])
        .then(roleChoice => {
          const role = roleChoice.role;
          const sql = `DELETE FROM role WHERE id = ?`;
  
          connection.query(sql, role, (err, result) => {
            if (err) throw err;
            console.log("Successfully deleted!"); 
  
            view.viewRoles();
        });
      });
    });
  };

//__Delete an employee__
const deleteEmployee = () => {
    // get employees from employee table 
    const employeeSql = `SELECT * FROM employee`;
  
    connection.query(employeeSql, (err, data) => {
      if (err) throw err; 
  
    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
  
      inquirer.prompt([
        {
          type: 'list',
          name: 'name',
          message: "Which employee would you like to delete?",
          choices: employees
        }
      ])
        .then(empChoice => {
          const employee = empChoice.name;
  
          const sql = `DELETE FROM employee WHERE id = ?`;
  
          connection.query(sql, employee, (err, result) => {
            if (err) throw err;
            console.log("Successfully Deleted!");
          
            view.viewEmployees();
      });
    });
   });
  };

  module.exports = {deleteDepartment, deleteEmployee, deleteRole}
  