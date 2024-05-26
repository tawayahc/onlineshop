// db.js
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'onlineshop3',
  multipleStatements: true
});

module.exports = connection;
