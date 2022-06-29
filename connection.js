//Export a connection to mysql to be used in all of our functions

const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Gragas_1',
      database: 'employeetracker'
    },
    console.log('Connected to the employeetracker database.')
  );


  
  module.exports = connection;