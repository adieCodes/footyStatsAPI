const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'practical',
  insecureAuth: true,
});

connection.connect();

module.exports = connection;
