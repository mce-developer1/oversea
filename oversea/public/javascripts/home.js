$(document).ready(function() {
  $('#selGrade').on('changed.bs.select', function (e) {
    $('.article-resources .article-body .loading-state').removeClass('d-none');
    $('.article-resources .article-body .card-group').addClass('d-none');

    setTimeout(function() {
      $('.article-resources .article-body .loading-state').addClass('d-none');
      $('.article-resources .article-body .card-group').removeClass('d-none');
    }, 5000);
  });

  $('#selSubjet').on('changed.bs.select', function (e) {
    $('.article-resources .article-body .loading-state').removeClass('d-none');
    $('.article-resources .article-body .card-group').addClass('d-none');

    setTimeout(function() {
      $('.article-resources .article-body .loading-state').addClass('d-none');
      $('.toast-stack').removeClass('d-none');
      $('.toast-stack .toast').toast('show');

      setTimeout(function() {
        $('.toast-stack').addClass('d-none');
        $('.toast-stack .toast').toast('hide');
      }, 5000);
    }, 1000);
  });

  $('.article-resources .article-body .card-group .card').on('click', function(e) {
    var userRole = $('#userRole').val();
    location.href = '/' + userRole + '/channel';
  });

  $(window).on('resize', function(e) {
    if ($(window).width() < 768) {
      if (!$('.article-resources .article-sidebar').hasClass('dialog')) {
        $('.article-resources .article-sidebar').addClass('dialog');
        $('.article-resources .article-sidebar .form-filters').addClass('dialog-menu');
      }
    } else {
      if ($('.article-resources .article-sidebar').hasClass('dialog')) {
        $('.article-resources .article-sidebar').removeClass('dialog');
        $('.article-resources .article-sidebar .form-filters').removeClass('dialog-menu');
      }
    }
  });

  if ($(window).width() < 768) {
    $('.article-resources').addClass('collapse-sidebar');
    $('.article-resources .article-sidebar').addClass('dialog');
    $('.article-resources .article-sidebar .form-filters').addClass('dialog-menu');
  }
});
