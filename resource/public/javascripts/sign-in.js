$(document).ready(function() {
  $('.btn-sign-in').on('click', function(e) {
    $('#mdlSignIn').modal('show');
  });

  $('#mdlSignIn .btn-primary').on('click', function(e) {
    var email = $('#mdlSignIn .input-email').val();

    if (/^(student|teacher)$/i.test(email)) {
      location.herf = email;
    }
  });

  $('#mdlSignIn .forgot-password').on('click', function(e) {
    $('#mdlForgotPassword .form-reset-password-success').addClass('d-none');
    $('#mdlForgotPassword .form-reset-password').removeClass('d-none');

    $('#mdlSignIn').modal('hide');
    setTimeout(function() {
      $('#mdlForgotPassword').modal('show');
    }, 300);
  });

  $('#mdlForgotPassword .btn-primary').on('click', function(e) {
    $('#mdlForgotPassword .form-reset-password').addClass('d-none');
    $('#mdlForgotPassword .form-reset-password-success').removeClass('d-none');
  });

  $('#mdlForgotPassword .sign-in').on('click', function(e) {
    $('#mdlForgotPassword').modal('hide');
    setTimeout(function() {
      $('#mdlSignIn').modal('show');
    }, 300);
  });

  $('.btn-sign-up').on('click', function(e) {
    $('#mdlSignUp .form-sign-up').removeClass('d-none');
    $('#mdlSignUp .form-sign-up-success').addClass('d-none');

    $('#mdlSignUp').modal('show');
  });

  $('#mdlSignUp .btn-primary').on('click', function(e) {
    $('#mdlSignUp .form-sign-up').addClass('d-none');
    $('#mdlSignUp .form-sign-up-success').removeClass('d-none');
  });

  $('.btn-register-distributor').on('click', function(e) {
    $('.article-resources').addClass('d-none');
    $('.article-user-registration').addClass('d-none');
    $('.article-distributor-registration').addClass('d-none');
    $('.article-school-registration').addClass('d-none');
    $('.form-distributor-registration').removeClass('d-none');
    $(document).scrollTop($('.form-distributor-registration').offset().top - 50);
  });

  $('.form-distributor-registration .btn-cancel').on('click', function(e) {
    $('.form-distributor-registration').addClass('d-none');
    $('.article-resources').removeClass('d-none');
    $('.article-user-registration').removeClass('d-none');
    $('.article-distributor-registration').removeClass('d-none');
    $('.article-school-registration').removeClass('d-none');
    $(document).scrollTop($('.article-resources').offset().top - 50);
  });

  $('.form-distributor-registration .btn-primary').on('click', function(e) {
    $('#mdlRegSuccessful').modal('show');
  });

  $('.form-registration-successful .btn-primary').on('click', function(e) {
    $('#mdlRegSuccessful').modal('hide');

    if (!$('.form-distributor-registration').hasClass('d-none')) {
      $('.form-distributor-registration').addClass('d-none');
    }

    if (!$('.form-school-registration').hasClass('d-none')) {
      $('.form-school-registration').addClass('d-none');
    }

    $('.article-resources').removeClass('d-none');
    $('.article-user-registration').removeClass('d-none');
    $('.article-distributor-registration').removeClass('d-none');
    $('.article-school-registration').removeClass('d-none');
    $(document).scrollTop($('.article-resources').offset().top - 50);
  });

  $('.btn-register-school').on('click', function(e) {
    $('.article-resources').addClass('d-none');
    $('.article-user-registration').addClass('d-none');
    $('.article-distributor-registration').addClass('d-none');
    $('.article-school-registration').addClass('d-none');
    $('.form-school-registration').removeClass('d-none');
    $(document).scrollTop($('.form-school-registration').offset().top - 50);
  });

  $('.form-school-registration .btn-cancel').on('click', function(e) {
    $('.form-school-registration').addClass('d-none');
    $('.article-resources').removeClass('d-none');
    $('.article-user-registration').removeClass('d-none');
    $('.article-distributor-registration').removeClass('d-none');
    $('.article-school-registration').removeClass('d-none');
    $(document).scrollTop($('.article-resources').offset().top - 50);
  });

  $('.form-school-registration .btn-primary').on('click', function(e) {
    $('#mdlRegSuccessful').modal('show');
  });
});
