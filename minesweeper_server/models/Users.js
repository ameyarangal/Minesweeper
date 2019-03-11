var db = require("../database/dbconnection");

var Users = {
  getAllUsers: function(callback) {
    return db.query("Select * from Users;", callback);
  },
  getUserById: function(id, callback) {
    return db.query("Select * from Users where Id=?;", [id], callback);
  },
  getUserByUsername: function(username, callback) {
    return db.query(
      "Select * from Users where username=?;",
      [username],
      callback
    );
  },
  createUser: function(Users, callback) {
    console.log(Users);
    return db.query(
      "Insert into Users  (FirstName, LastName, username, password) values (?, ?, ?, ?)",
      [Users.FirstName, Users.LastName, Users.username, Users.password],
      callback
    );
  }
};

module.exports = Users;
