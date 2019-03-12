var db = require("../database/dbconnection");

var History = {
  getAllHistory: function(callback) {
    console.log(`get all history`);
    return db.query("Select * from History;", callback);
  },
  getLeaderBoard: function(callback) {
    return db.query(
      "select Users.FirstName, Users.LastName, History.Score, History.Difficulty, History.Date from Users inner join History on Users.Id = History.UserId order by History.Score asc;",
      callback
    );
  },
  getHistoryByUserId: function(userid, callback) {
    return db.query(
      "Select * from History where UserId=?;",
      [userid],
      callback
    );
  },
  createHistory: function(History, callback) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy;
    console.log(today);
    return db.query(
      "Insert into History  (UserId, Score, Status, Difficulty, Date) values (?, ?, ?, ?, ?)",
      [
        History.UserId,
        History.Score,
        History.Status,
        History.Difficulty,
        today
      ],
      callback
    );
  }
};

module.exports = History;
