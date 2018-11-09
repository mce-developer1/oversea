var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
		layout: 'layout',
		title: 'Marshall Cavendish Education'
	});
});

router.get('/player', function(req, res, next) {
  res.render('player/index', {
		layout: 'player/player_layout',
		title: 'Marshall Cavendish Education'
	});
});

module.exports = router;
