var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'sign-in'
  });
});

/* GET sign out page. */
router.get('/signout', function(req, res, next) {
  res.redirect('/');
});

/* GET teacher dashboard page. */
router.get('/teacher/dashboard', function(req, res, next) {
  res.render('student/home', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'home',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET teacher tools page. */
router.get('/teacher/tools', function(req, res, next) {
  res.render('teacher/tools', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tools',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET teacher view class page. */
router.get('/teacher/class', function(req, res, next) {
  res.render('teacher/class', {
    layout: 'teacher/class_layout',
    title: 'Marshall Cavendish Education',
    module: 'class',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET teacher view user page. */
router.get('/teacher/user', function(req, res, next) {
  res.render('teacher/user', {
    layout: 'teacher/user_layout',
    title: 'Marshall Cavendish Education',
    module: 'user',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET view subject page. */
router.get('/subject', function(req, res, next) {
  res.render('subject/subject', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'subject',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET student dashboard page. */
router.get('/student/dashboard', function(req, res, next) {
  res.render('student/home', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'home',
    loggedIn: true,
    studentUser: true
  });
});

module.exports = router;
