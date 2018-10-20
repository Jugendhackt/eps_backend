var express = require('express');
var router = express.Router();

var login = require('../logic/login');

router.post('/', function(req, res, next) {
    login.login(req.query.username, req.query.password, function(result){
        res.send(result);
    });
});

module.exports = router;
