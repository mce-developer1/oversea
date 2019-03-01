$(document).ready(function() {
  function redirectToHome(e) {
    var username = $('.form-sign-in .input-username').val();

    if (username === '') {
      $('.form-sign-in .text-danger').removeClass('d-none');
    } else {
      $('.form-sign-in .text-danger').addClass('d-none');
    }

    if (/^student$/i.test(username)) {
      location.href = '/student/home';
    } else if (/^teacher$/i.test(username)) {
      location.href = '/teacher/home';
    } else if (/^admin$/i.test(username)) {
      location.href = '/admin/home';
    }
  }

  $('.form-sign-in .btn-primary').on('click', redirectToHome);
  $('.form-sign-in .input-username').on('change', redirectToHome);

  $('.form-sign-in .forgot-password').on('click', function(e) {
    $('.modal-forgot-password .form-reset-password-success').addClass('d-none');
    $('.modal-forgot-password .form-reset-password-error').addClass('d-none');
    $('.modal-forgot-password .form-reset-password').removeClass('d-none');
    $('.modal-forgot-password').modal('show');
  });

  $('.modal-forgot-password .btn-primary').on('click', function(e) {
    var username = $('.modal-forgot-password .form-reset-password .input-username').val();
    var school = $('.modal-forgot-password .form-reset-password .input-school').val();
    $('.modal-forgot-password .form-reset-password').addClass('d-none');

    if ((username !== '') && (school !== '')) {
      $('.modal-forgot-password .form-reset-password-success').removeClass('d-none');
    } else {
      $('.modal-forgot-password .form-reset-password-error').removeClass('d-none');
    }
  });

  $('.btn-register-distributor').on('click', function(e) {
    $('.article-study-resource').addClass('d-none');
    $('.article-distributor-registration').addClass('d-none');
    $('.article-school-registration').addClass('d-none');
    $('.form-distributor-registration').removeClass('d-none');
    $(document).scrollTop($('.form-distributor-registration').offset().top - 50);
  });

  $('.form-distributor-registration .btn-cancel').on('click', function(e) {
    $('.form-distributor-registration').addClass('d-none');
    $('.article-study-resource').removeClass('d-none');
    $('.article-distributor-registration').removeClass('d-none');
    $('.article-school-registration').removeClass('d-none');
  });

  $('.form-distributor-registration .btn-primary').on('click', function(e) {
    $('.modal-registration-successful').modal('show');
  });

  $('.form-registration-successful .btn-primary').on('click', function(e) {
    $('.modal-registration-successful').modal('hide');

    if (!$('.form-distributor-registration').hasClass('d-none')) {
      $('.form-distributor-registration').addClass('d-none');
    }

    if (!$('.form-school-registration').hasClass('d-none')) {
      $('.form-school-registration').addClass('d-none');
    }

    $('.article-study-resource').removeClass('d-none');
    $('.article-distributor-registration').removeClass('d-none');
    $('.article-school-registration').removeClass('d-none');
  });

  $('.btn-register-school').on('click', function(e) {
    $('.article-study-resource').addClass('d-none');
    $('.article-distributor-registration').addClass('d-none');
    $('.article-school-registration').addClass('d-none');
    $('.form-school-registration').removeClass('d-none');
    $(document).scrollTop($('.form-school-registration').offset().top - 50);
  });

  $('.form-school-registration .btn-cancel').on('click', function(e) {
    $('.form-school-registration').addClass('d-none');
    $('.article-study-resource').removeClass('d-none');
    $('.article-distributor-registration').removeClass('d-none');
    $('.article-school-registration').removeClass('d-none');
  });

  $('.form-school-registration .btn-primary').on('click', function(e) {
    $('.modal-registration-successful').modal('show');
  });
});
