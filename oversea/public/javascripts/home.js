$(document).ready(function() {
  $('.article-resources .article-sidebar .navbar .btn').on('click', function(e) {
    if ($(window).width() < 768) {
      var height = $('.article-resources .article-sidebar').get(0).scrollHeight;
      $('.article-resources .article-sidebar').css('height', height);
    }

    var sidebarCollapsed = $('.article-resources').hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $('.article-resources .article-sidebar').css('height', '');

      if ($('.article-resources').hasClass('collapse-sidebar')) {
        $('.article-resources').removeClass('collapse-sidebar')
      } else {
        $('.article-resources').addClass('collapse-sidebar');
      }
    }, delay);
  });

  $('.article-resources .article-body .card-group .card').on('click', function(e) {
    location.href = '/channel';
  });

  if ($(window).width() < 768) {
    $('.article-resources').addClass('collapse-sidebar');
  }
});
