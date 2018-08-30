$(document).ready(function() {
  $('.btn-sign-in').on('click', function(e) {
    $('#mdlSignIn').modal({ show: true });
  });

  $('.btn-sign-up').on('click', function(e) {
    $('#mdlSignUp').modal({ show: true });
  });
});
