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

/* GET home page. */
router.get('/:userRole/home', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('home/home', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'home',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET track resources page. */
router.get('/:userRole/tracking/resources', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('tracking/resources', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tracking',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});


/* GET tools page. */
router.get('/:userRole/tools', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('teacher/tools', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'tools',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET view class page. */
router.get('/:userRole/class', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('teacher/class', {
    layout: 'teacher/class_layout',
    title: 'Marshall Cavendish Education',
    module: 'class',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET view user page. */
router.get('/:userRole/user', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('teacher/user', {
    layout: 'teacher/user_layout',
    title: 'Marshall Cavendish Education',
    module: 'user',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET update personal particulars page. */
router.get('/:userRole/profile/update_personal_particulars', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/update_personal_particulars', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET change password page. */
router.get('/:userRole/profile/change_password', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/change_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET reset student password page. */
router.get('/:userRole/profile/reset_student_password', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/reset_student_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET reset student password page. */
router.get('/:userRole/profile/reset_teacher_password', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('profile/reset_teacher_password', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'profile',
    loggedIn: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET view subject page. */
router.get('/subject', function(req, res, next) {
  res.render('subject/subject', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'subject',
    loggedIn: true,
    userRole: userRole
  });
});

module.exports = router;
