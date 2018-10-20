var express = require('express');
var router = express.Router();

var signup = require('../logic/signup');

router.post('/', function(req, res, next) {
    signup.signup(req.query.username, req.query.password, function(result){
        res.send(result);
    });
});

module.exports = router;
