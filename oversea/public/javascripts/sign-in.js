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

  $('.form-sign-in .input-school').autocomplete({ hint: true, debug: false }, [{
    displayKey: 'fullName',
    source: function(query, callback) {
      var records = [
        { id: '1', name: 'EDLBP', fullName: 'Edno Primary' }, 
        { id: '2', name: 'EDLBS', fullName: 'Edno Secondary' },
        { id: '3', name: 'EDTGP', fullName: 'Edno Test Primary' }, 
        { id: '4', name: 'EDTGS', fullName: 'Edno Test Secondary' }
      ];
      var pattern = new RegExp(query, 'i');
      var hits = records.filter(function(record) {
        return (record.name.match(pattern)
          || record.fullName.match(pattern));
      });
      hits.forEach(function(hit) {
        if (pattern.test(hit.fullName)) {
          var match = hit.fullName.match(pattern)[0];
          var highlighted = '<em>' + match + '</em>';
          hit.highlighted = hit.fullName.replace(match, highlighted);
        } else {
          hit.highlighted = hit.fullName;
        }
      });
      callback(hits);
    },
    templates: {
      suggestion: function(suggestion) {
        return suggestion.highlighted;
      }
    }
  }])
  .on('autocomplete:selected', function(event, suggestion) {
    log.info(suggestion);
  });

  $('.form-sign-in .input-school').autocomplete('val', 'EDTGP');
  $('.form-sign-in .input-username').on('keypress', function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode === 13) redirectToHome(e);
  });
  $('.form-sign-in .btn-primary').on('click', redirectToHome);

  $('.form-reset-password .input-school').autocomplete({ hint: true, debug: true }, [{
    displayKey: 'fullName',
    source: function(query, callback) {
      var records = [
        { id: '1', name: 'EDLBP', fullName: 'Edno Primary' }, 
        { id: '2', name: 'EDLBS', fullName: 'Edno Secondary' },
        { id: '3', name: 'EDTGP', fullName: 'Edno Test Primary' }, 
        { id: '4', name: 'EDTGS', fullName: 'Edno Test Secondary' }
      ];
      var pattern = new RegExp(query, 'i');
      var hits = records.filter(function(record) {
        return (record.name.match(pattern)
          || record.fullName.match(pattern));
      });
      hits.forEach(function(hit) {
        if (pattern.test(hit.fullName)) {
          var match = hit.fullName.match(pattern)[0];
          var highlighted = '<em>' + match + '</em>';
          hit.highlighted = hit.fullName.replace(match, highlighted);
        } else {
          hit.highlighted = hit.fullName;
        }
      });
      callback(hits);
    },
    templates: {
      suggestion: function(suggestion) {
        return suggestion.highlighted;
      }
    }
  }])
  .on('autocomplete:selected', function(event, suggestion) {
    log.info(suggestion);
  });

  $('.form-sign-in .forgot-password').on('click', function(e) {
    $('.modal-forgot-password .form-reset-password-success').addClass('d-none');
    $('.modal-forgot-password .form-reset-password-error').addClass('d-none');
    $('.modal-forgot-password .form-reset-password').removeClass('d-none');
    $('.modal-forgot-password').modal('show');
  });

  $('.modal-forgot-password .btn-primary').on('click', function(e) {
    var username = $('.modal-forgot-password .form-reset-password .input-username').val();
    var school = $('.modal-forgot-password .form-reset-password .input-school.aa-input').val();
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
