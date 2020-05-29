var express = require('express');
var router = express.Router();
var connectDB = require('./connect');
const jwt = require('jsonwebtoken');
var checkCookie = require('./../authentication/checkcookie')
/* GET users listing. */
router.get('/', function(req, res, next) {
    //console.log(req);
var cookie = req.headers.cookie;
checkCookie.checkCookie(cookie, res);
});

module.exports = router;
