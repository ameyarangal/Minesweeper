var express = require("express");
var router = express.Router();
var user = require("../models/Users");

router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
    user.getUserById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    user.getAllUsers(function(err, rows) {
      console.log(rows);
      if (err) {
        res.json(err);
      } else {
        console.log(rows);
        res.json(rows);
      }
    });
  }
});

router.get("/getByUsername/:username", function(req, res, next) {
  user.getUserByUsername(req.params.username, function(err, rows) {
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
  user.createUser(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count); //or return count for 1 &amp;amp;amp; 0
    }
  });
});

module.exports = router;
