var express = require('express');
var router = express.Router();

var ranked = require('../logic/getRankedTweet');

router.get('/', function(req, res, next) {

  var toSend = {};

  ranked.getRanked(function(whatToSend){
    toSend = whatToSend;
    ranked.getSources(function(sources){
      toSend.people = sources;
    });
    res.send(toSend);
  });
});

module.exports = router;
