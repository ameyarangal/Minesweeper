var mysql = require("mysql");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "minesweeperDB",
  insecureAuth: true
});
module.exports = connection;
