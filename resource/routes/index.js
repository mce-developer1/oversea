var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
  });
});

/* GET admin dashboard page. */
router.get('/admin/dashboard', function(req, res, next) {
  res.render('admin/dashboard', {
    title: 'Marshall Cavendish Education',
    module: 'dashboard',
    loggedIn: true,
    adminUser: true
  });
});

/* GET admin dashboard page. */
router.get('/admin/tools', function(req, res, next) {
  res.render('admin/tools', {
    title: 'Marshall Cavendish Education',
    module: 'tools',
    loggedIn: true,
    adminUser: true
  });
});

module.exports = router;
