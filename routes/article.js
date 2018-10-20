var express = require('express');
var router = express.Router();

var createArticle = require('../logic/createArticle');

router.post('/create', function(req, res, next) {
    createArticle.createArticle(req.query.name, req.query.price, req.query.seller, req.query.maxquantity, req.query.link, function(result){
        res.send(result);
    });
});
router.post('/delete', function(req, res, next) {
    createArticle.createArticle(req.query.productid, function(result){
        res.send(result);
    });
});

module.exports = router;
