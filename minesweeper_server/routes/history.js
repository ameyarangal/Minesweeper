var express = require("express");
var router = express.Router();
var history = require("../models/History");

router.get("/", function(req, res, next) {
  history.getAllHistory(function(err, rows) {
    console.log(rows);
    if (err) {
      res.json(err);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

router.get("/getByUserId/:userid", function(req, res, next) {
  history.getUserByUsername(req.params.userid, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/getLeaderBoard", function(req, res, next) {
  history.getLeaderBoard(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function(req, res, next) {
  console.log("request body");
  console.log(req.body);
  history.createHistory(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count); //or return count for 1 &amp;amp;amp; 0
    }
  });
});

module.exports = router;
