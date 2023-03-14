const config = require('../config-db.json');

console.log('config', config.DB_NAME);

const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : config.DB_HOST,
  user     : config.DB_USER,
  port     : config.DB_PORT,
  password : config.DB_PASS,
  database : config.DB_NAME,
  multipleStatements: true,
});

const createDatabase = () => {

  const connectionFirst = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USER,
    port     : config.DB_PORT,
    password : config.DB_PASS,
    multipleStatements: true,
  });

  console.log('DB > Verificando existencia de base de datos');
  connectionFirst.connect();
  connectionFirst.query(
    `
    CREATE DATABASE IF NOT EXISTS ${config.DB_NAME} CHARACTER SET utf8mb4;
    `, 
    (err, message) => {
      if (err) throw err;
      console.log(`DB > Base datos ${config.DB_NAME} disponible para su uso!`);
    }
  );
  connectionFirst.end();
};

module.exports = {
  createDatabase,
}