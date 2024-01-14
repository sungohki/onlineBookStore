// import mysql module
// const mariadb = require('mysql2');
const main = async () => {
  const mariadb = require('mysql2/promise'); // Add promise func

  // Open connection to DB
  const connection = await mariadb.createConnection({
    // host: 'locathost',
    host: '127.0.0.1',
    user: 'root',
    database: 'BookShop',
    password: 'root',
    dateStrings: true,
  });
  module.exports = connection;
};
