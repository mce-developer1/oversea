var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tests/test-list', { title: 'MC Education' });
});

router.get('/create', function(req, res, next) {
  res.render('tests/creat-test', { title: 'MC Education' });
});

router.get('/track', function(req, res, next) {
  res.render('tests/track-tests', { title: 'MC Education' });
});

module.exports = router;
