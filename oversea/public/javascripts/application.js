$(document).ready(function() {
  $(document).on('click', '[data-toggle="drawer"]', function(e) {
    e.preventDefault();

    var target = $(this).attr('data-target');
    if($(target).hasClass('show')) $('.drawer-toggle').remove();
    else $('body').append('<div class="drawer-backdrop"></div>');
    $(target).toggleClass('show');
  });

  $(document).on('click', '.drawer-backdrop', function(e) {    
    $('.drawer-backdrop').remove();
    $('.drawer.show').removeClass('show');
  });

  $(document).on('click', '[data-toggle="sidebar"]', function(e) {
    e.preventDefault();
    
    var target = $(this).attr('data-target');

    if ($(window).width() < 768) {
      var height = $(target).find('.article-sidebar').get(0).scrollHeight;
      $(target).find('.article-sidebar').css('height', height);
    }

    var sidebarCollapsed = $(target).hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $(target).find('.article-sidebar').css('height', '');

      if ($(target).hasClass('collapse-sidebar')) {
        $(target).removeClass('collapse-sidebar')
      } else {
        $(target).addClass('collapse-sidebar');
      }
    }, delay);
  });

  $(document).on('show.bs.modal', function (e) {
    if ($(e.target).find('.modal-dialog').hasClass('modal-preview')) {
      setTimeout(function() {
        $('.modal-backdrop.show').addClass('modal-backdrop-preview');
      });
    }
  });
});
