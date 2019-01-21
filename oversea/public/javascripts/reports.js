$(document).ready(function() {
  $('.article-reports .nav .nav-link').on('click', function(e) {
    e.preventDefault();

    switch ($(this).attr('href')) {
      case '#usage':
        $('.article-reports').addClass('d-none');
        $('.article-usage-report').removeClass('d-none');
        break;
      case '#proficiency':
        break;
    }
  });
});
