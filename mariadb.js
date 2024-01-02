// import mysql module
const mariadb = require('mysql2');

// Open connection to DB
const connection = mariadb.createConnection({
  // host: 'locathost',
  host: '127.0.0.1',
  user: 'root',
  database: 'BookShop',
  password: 'root',
  dateStrings: true,
});

module.exports = connection;
