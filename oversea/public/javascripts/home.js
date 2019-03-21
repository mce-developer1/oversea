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

  if ($(window).width() < 768) {
    $('.article-resources').addClass('collapse-sidebar');
  }
});
