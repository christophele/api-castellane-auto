// const app = require('./app');
const mysql = require('mysql');
const config = require('./db/config');

const connection = mysql.createConnection({
    host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

connection.connect(function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
});
