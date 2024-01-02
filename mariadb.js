// import mysql module
const mariadb = require('mysql2');

// Open connection to DB
const connection = mariadb.createConnection({
  host: 'locathost',
  user: 'root',
  password: 'root',
  database: 'Bookshop',
  dateStrings: true,
});

module.exports = connection;
