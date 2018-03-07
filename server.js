var mysql = require('mysql');

const config = require('./db/config');

var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports =  config;
