const DB_NAME = 'm6_sprint';

const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Bootcamp',
  database : DB_NAME,
  multipleStatements: true,
});

const createDatabase = () => {
  connection.connect();
  connection.query(
    `
    START TRANSACTION;
    CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4;
    USE ${DB_NAME};
    COMMIT;
    `, 
    (err, message) => {
      if (err) throw err;
      console.log(`BD > Base datos ${DB_NAME} disponible para su uso!`);
    }
  );
  connection.end();
};

module.exports = {
  createDatabase,
}