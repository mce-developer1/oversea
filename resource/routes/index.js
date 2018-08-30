var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
  });
});

module.exports = router;
