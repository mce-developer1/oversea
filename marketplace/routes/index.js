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

/* GET facility booking page. */
router.get('/:userRole/facilities/add_booking', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('facilities/add_booking', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'facilities',
    loggedIn: true,
    facilitiesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
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

/* GET visitor notification rules page. */
router.get('/:userRole/visitors/notification_rules', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('visitors/notification_rules', {
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

/* GET education authority booking page. */
router.get('/:userRole/referrals/eduauthority_booking', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('referrals/eduauthority_booking', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'referrals',
    loggedIn: true,
    referralsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});


/* GET education authority bookings page. */
router.get('/:userRole/referrals/bookings', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('referrals/bookings', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'referrals',
    loggedIn: true,
    referralsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET education authority report page. */
router.get('/:userRole/referrals/report', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('referrals/report', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'referrals',
    loggedIn: true,
    referralsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET education authority setup page. */
router.get('/:userRole/referrals/eduauthorities', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('referrals/eduauthorities', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'referrals',
    loggedIn: true,
    referralsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET attendance taking page. */
router.get('/:userRole/attendances/attendance_taking', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('attendances/attendance_taking', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'attendances',
    loggedIn: true,
    attendancesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET long absences page. */
router.get('/:userRole/attendances/long_absences', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('attendances/long_absences', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'attendances',
    loggedIn: true,
    attendancesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET attendances report page. */
router.get('/:userRole/attendances/report', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('attendances/report', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'attendances',
    loggedIn: true,
    attendancesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET class attendances report page. */
router.get('/:userRole/attendances/class_report', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('attendances/class_report', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'attendances',
    loggedIn: true,
    attendancesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET attendances notification rules page. */
router.get('/:userRole/attendances/notification_rules', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('attendances/notification_rules', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'attendances',
    loggedIn: true,
    attendancesPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET student incidents page. */
router.get('/:userRole/incidents/student_incidents', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('incidents/student_incidents', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'incidents',
    loggedIn: true,
    incidentsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET student incident report page. */
router.get('/:userRole/incidents/report', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('incidents/report', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'incidents',
    loggedIn: true,
    incidentsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET student incident categories page. */
router.get('/:userRole/incidents/categories', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('incidents/categories', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'incidents',
    loggedIn: true,
    incidentsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET incident notification rules page. */
router.get('/:userRole/incidents/notification_rules', function(req, res, next) {
  var userRole = req.params.userRole;
  var studentUser = (userRole === 'student');
  var teacherUser = (userRole === 'teacher');
  var adminUser = (userRole === 'admin');
  res.render('incidents/notification_rules', {
    layout: 'layout',
    title: 'Marshall Cavendish Education',
    module: 'incidents',
    loggedIn: true,
    incidentsPage: true,
    userRole: userRole,
    studentUser: studentUser,
    teacherUser: teacherUser,
    adminUser: adminUser
  });
});

/* GET upload page. */
router.post('/shared/upload', upload.any(), function(req, res, next) {
  res.send('{"status": "OK", "location": "/static/images/user.png"}');
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
