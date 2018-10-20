var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("log");
  res.send("../views/index.ejs");
});

module.exports = router;
