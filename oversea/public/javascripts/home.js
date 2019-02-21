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
      $('.toast-stack .toast').addClass('show');

      setTimeout(function() {
        $('.toast-stack').addClass('d-none');
        $('.toast-stack .toast').removeClass('show');
      }, 5000);
    }, 1000);
  });

  $('.article-resources .article-body .card-group .card').on('click', function(e) {
    location.href = '/channel';
  });

  if ($(window).width() < 768) {
    $('.article-resources').addClass('collapse-sidebar');
  }
});
