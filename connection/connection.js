var mysql = require("mysql");
var connDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_test'
})

// return Connect;
module.exports = connDB;