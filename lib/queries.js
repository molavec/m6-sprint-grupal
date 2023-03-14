
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Bootcamp',
  multipleStatements: true,
});

connection.connect();

connection.query(  
  `
  START TRANSACTION;
  DROP DATABASE IF EXISTS m6_sprint;
  CREATE DATABASE m6_sprint CHARACTER SET utf8mb4;
  USE m5_abpro_sprint;
  COMMIT;
  `, 
  function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  }
);

connection.end();