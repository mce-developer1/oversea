const axios = require('axios');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer();

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
  });
});

router.get('/reset_password', function(req, res, next) {
  res.render('profile/reset_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in',
    infoPage: true
  });
});

/* GET privacy page. */
router.get('/privacy', function(req, res, next) {
  res.render('privacy', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in',
    infoPage: true
  });
});

/* GET terms page. */
router.get('/terms', function(req, res, next) {
  res.render('terms', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in',
    infoPage: true
  });
});

/* GET sign out page. */
router.get('/signout', function(req, res, next) {
  res.redirect('/');
});

/* GET current visitors page. */
router.get('/:userRole/visitors/current_visitors', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('visitors/current_visitors', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'visitors',
    loggedIn: true,
    visitorsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});


/* GET visitors page. */
router.get('/:userRole/visitors/visitors', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('visitors/visitors', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'visitors',
    loggedIn: true,
    visitorsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET visitors report page. */
router.get('/:userRole/visitors/report', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('visitors/report', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'visitors',
    loggedIn: true,
    visitorsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET visitor categories page. */
router.get('/:userRole/visitors/categories', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('visitors/categories', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'visitors',
    loggedIn: true,
    visitorsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET 404 error page. */
router.get('*', function(req, res) {
  var url = req.originalUrl;
  var loggedIn = (/^\/(admin|teacher|student)\//i).test(url);

  if (loggedIn) {
    var userRole = (/^\/(admin|teacher|student)\//i).exec(url)[1];
    var studentUser = (userRole === 'student');
    var teacherUser = (userRole === 'teacher');
    var adminUser = (userRole === 'admin');
    res.render('errors/404', {
      layout: 'layout',
      title: 'Marshall Cavendish Education',
      module: 'error',
      loggedIn: true,
      errorPage: true,
      userRole: userRole,
      studentUser: studentUser,
      teacherUser: teacherUser,
      adminUser: adminUser
    });
  } else {
    res.render('errors/404', {
      layout: 'layout',
      title: 'Marshall Cavendish Education',
      module: 'error',
      loggedIn: false,
      errorPage: true
    });
  }
});

module.exports = router;
