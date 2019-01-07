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

/* GET teacher home page. */
router.get('/teacher/home', function(req, res, next) {
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

/* GET teacher update personal particulars page. */
router.get('/teacher/profile/update_personal_particulars', function(req, res, next) {
  res.render('profile/update_personal_particulars', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET teacher change password page. */
router.get('/teacher/profile/change_password', function(req, res, next) {
  res.render('profile/change_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET teacher reset student password page. */
router.get('/teacher/profile/reset_student_password', function(req, res, next) {
  res.render('profile/reset_student_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    teacherUser: true
  });
});

/* GET student home page. */
router.get('/student/home', function(req, res, next) {
  res.render('student/home', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'home',
    loggedIn: true,
    studentUser: true
  });
});

/* GET teacher update personal particulars page. */
router.get('/student/profile/update_personal_particulars', function(req, res, next) {
  res.render('profile/update_personal_particulars', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    studentUser: true
  });
});

/* GET student change password page. */
router.get('/student/profile/change_password', function(req, res, next) {
  res.render('profile/change_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    studentUser: true
  });
});

/* GET view subject page. */
router.get('/subject', function(req, res, next) {
  res.render('subject/subject', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'subject',
    loggedIn: true
  });
});

module.exports = router;
