const mysql = require('mysql');

const config = require('./db/config');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected!");
    // connection.query("CREATE DATABASE mydb", function (err, result) {
    // if (err) throw err;
    // console.log("Database created");
  });
});

module.exports = config;
