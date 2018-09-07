var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
  });
});

/* GET admin dashboard page. */
router.get('/admin/dashboard', function(req, res, next) {
  res.render('admin/dashboard', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'dashboard',
    loggedIn: true,
    adminUser: true
  });
});

/* GET admin tools page. */
router.get('/admin/tools', function(req, res, next) {
  res.render('admin/tools', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tools',
    loggedIn: true,
    adminUser: true
  });
});

/* GET admin view class page. */
router.get('/admin/class', function(req, res, next) {
  res.render('admin/class', {
    layout: 'admin/class_layout',
    title: 'Marshall Cavendish Education',
    module: 'class',
    loggedIn: true,
    adminUser: true
  });
});

/* GET admin view user page. */
router.get('/admin/user', function(req, res, next) {
  res.render('admin/user', {
    layout: 'admin/user_layout',
    title: 'Marshall Cavendish Education',
    module: 'user',
    loggedIn: true,
    adminUser: true
  });
});

/* GET view subject page. */
router.get('/subject', function(req, res, next) {
  res.render('subject/subject', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'subject',
    loggedIn: true,
    adminUser: true
  });
});

/* GET view channel page. */
router.get('/channel', function(req, res, next) {
  res.render('channel/channel', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'channel',
    loggedIn: true,
    adminUser: true
  });
});

/* GET view resource page. */
router.get('/channel/resource', function(req, res, next) {
  res.render('channel/resource', {
    layout: 'channel/resource_layout',
    title: 'Marshall Cavendish Education',
    module: 'channel',
    loggedIn: true,
    adminUser: true
  });
});

/* GET student dashboard page. */
router.get('/student/dashboard', function(req, res, next) {
  res.render('student/dashboard', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'dashboard',
    loggedIn: true,
    studentUser: true
  });
});

module.exports = router;
