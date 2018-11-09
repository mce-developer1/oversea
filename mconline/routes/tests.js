var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tests/test-list', { title: 'MC Education' });
});

router.get('/create', function(req, res, next) {
  res.render('tests/create-test', { title: 'MC Education' });
});

module.exports = router;
