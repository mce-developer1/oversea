$(document).ready(function() {
  $('.article-resources .article-sidebar .navbar .btn').on('click', function(e) {
    if ($('.article-resources').hasClass('collapse-sidebar')) {
      $('.article-resources').removeClass('collapse-sidebar')
    } else {
      $('.article-resources').addClass('collapse-sidebar')
    }
  });

  $('.article-resources .article-body .card-group .card').on('click', function(e) {
    location.href = '/channel';
  });
});
