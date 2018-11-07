var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
		layout: 'layout',
		title: 'Marshall Cavendish Education'
	});
});

router.get('/topic', function(req, res, next) {
  res.render('topic/index', {
		layout: 'topic/player_layout',
		title: 'Marshall Cavendish Education'
	});
});

router.get('/topic/resource', function(req, res, next) {
  res.render('topic/resource/index', {
		layout: 'topic/resource/player_layout',
		title: 'Marshall Cavendish Education'
	});
});

module.exports = router;
