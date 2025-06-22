const mysql = require('mysql2');

process.stdout.write(`Initializing MySQL Connection...\n`);

process.on('ECONNREFUSED', () => {
  console.log('ignore');
});

function createMysqlConnection() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
  });
}

function tryMysqlConnection() {
  const connection = createMysqlConnection();
  connection.on('error', function (err) {
    tryMysqlConnection();
  });

  connection.end();
}

tryMysqlConnection();
