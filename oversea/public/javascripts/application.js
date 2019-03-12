$(document).ready(function() {
  $(document).on('click', '[data-toggle="dialog"]', function(e) {
    var dialog = $(e.target).closest('.dialog');

    if (dialog && !$(dialog).hasClass('open')) {
      setTimeout(function() {
        $(dialog).toggleClass('open');
        $(dialog).find('.dialog-menu').toggleClass('show');
      });
    }
  });

  $(document).on('click', '[data-toggle="dropdown"]', function(e) {
    if ( $('.dialog.open').length === 0) {
      $('.dialog.open .dialog-menu').removeClass('show');
      $('.dialog.open').removeClass('open');
    }
  })

  $(document).on('click', function(e) {
    if ($(e.target).closest('.dialog-menu').length === 0) {
      $('.dialog.open .dialog-menu').removeClass('show');
      $('.dialog.open').removeClass('open');
    }
  });

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
