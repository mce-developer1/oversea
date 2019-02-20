$(document).ready(function() {
  $('.article-update-personal-particulars .article-header .sidebar-toggle').on('click', function(e) {
    e.preventDefault();

    var height = $('.article-update-personal-particulars .article-sidebar').get(0).scrollHeight;
    $('.article-update-personal-particulars .article-sidebar').css('height', height);

    var sidebarCollapsed = $('.article-update-personal-particulars').hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $('.article-update-personal-particulars .article-sidebar').css('height', '');

      if ($('.article-update-personal-particulars').hasClass('collapse-sidebar')) {
        $('.article-update-personal-particulars').removeClass('collapse-sidebar')
      } else {
        $('.article-update-personal-particulars').addClass('collapse-sidebar');
      }
    }, delay);
  });

  $('.article-update-personal-preferences .article-header .sidebar-toggle').on('click', function(e) {
    e.preventDefault();

    var height = $('.article-update-personal-preferences .article-sidebar').get(0).scrollHeight;
    $('.article-update-personal-preferences .article-sidebar').css('height', height);

    var sidebarCollapsed = $('.article-update-personal-preferences').hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $('.article-update-personal-preferences .article-sidebar').css('height', '');

      if ($('.article-update-personal-preferences').hasClass('collapse-sidebar')) {
        $('.article-update-personal-preferences').removeClass('collapse-sidebar')
      } else {
        $('.article-update-personal-preferences').addClass('collapse-sidebar');
      }
    }, delay);
  });

  $('.article-change-password .article-header .sidebar-toggle').on('click', function(e) {
    e.preventDefault();

    var height = $('.article-change-password .article-sidebar').get(0).scrollHeight;
    $('.article-change-password .article-sidebar').css('height', height);

    var sidebarCollapsed = $('.article-change-password').hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $('.article-change-password .article-sidebar').css('height', '');

      if ($('.article-change-password').hasClass('collapse-sidebar')) {
        $('.article-change-password').removeClass('collapse-sidebar')
      } else {
        $('.article-change-password').addClass('collapse-sidebar');
      }
    }, delay);
  });

  $('.article-reset-student-password .article-header .sidebar-toggle').on('click', function(e) {
    e.preventDefault();

    var height = $('.article-reset-student-password .article-sidebar').get(0).scrollHeight;
    $('.article-reset-student-password .article-sidebar').css('height', height);

    var sidebarCollapsed = $('.article-reset-student-password').hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $('.article-reset-student-password .article-sidebar').css('height', '');

      if ($('.article-reset-student-password').hasClass('collapse-sidebar')) {
        $('.article-reset-student-password').removeClass('collapse-sidebar')
      } else {
        $('.article-reset-student-password').addClass('collapse-sidebar');
      }
    }, delay);
  });

  $('.article-reset-teacher-password .article-header .sidebar-toggle').on('click', function(e) {
    e.preventDefault();

    var height = $('.article-reset-teacher-password .article-sidebar').get(0).scrollHeight;
    $('.article-reset-teacher-password .article-sidebar').css('height', height);

    var sidebarCollapsed = $('.article-reset-teacher-password').hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $('.article-reset-teacher-password .article-sidebar').css('height', '');

      if ($('.article-reset-teacher-password').hasClass('collapse-sidebar')) {
        $('.article-reset-teacher-password').removeClass('collapse-sidebar')
      } else {
        $('.article-reset-teacher-password').addClass('collapse-sidebar');
      }
    }, delay);
  });

  $(window).on('resize', function(e) {
    if ($(window).width() >= 768) {
      if ($('.article-update-personal-particulars').hasClass('collapse-sidebar')) {
        $('.article-update-personal-particulars').removeClass('collapse-sidebar');
      }

      if ($('.article-update-personal-preferences').hasClass('collapse-sidebar')) {
        $('.article-update-personal-preferences').removeClass('collapse-sidebar');
      }

      if ($('.article-change-password').hasClass('collapse-sidebar')) {
        $('.article-change-password').removeClass('collapse-sidebar');
      }

      if ($('.article-reset-student-password').hasClass('collapse-sidebar')) {
        $('.article-reset-student-password').removeClass('collapse-sidebar');
      }
  
      if ($('.article-reset-teacher-password').hasClass('collapse-sidebar')) {
        $('.article-reset-teacher-password').removeClass('collapse-sidebar');
      }
    } else {
      if (!$('.article-update-personal-particulars').hasClass('collapse-sidebar')) {
        $('.article-update-personal-particulars').addClass('collapse-sidebar');
      }
      
      if (!$('.article-update-personal-preferences').hasClass('collapse-sidebar')) {
        $('.article-update-personal-preferences').addClass('collapse-sidebar');
      }
      
      if (!$('.article-change-password').hasClass('collapse-sidebar')) {
        $('.article-change-password').addClass('collapse-sidebar');
      }

      if (!$('.article-reset-student-password').hasClass('collapse-sidebar')) {
        $('.article-reset-student-password').addClass('collapse-sidebar');
      }
  
      if (!$('.article-reset-teacher-password').hasClass('collapse-sidebar')) {
        $('.article-reset-teacher-password').addClass('collapse-sidebar');
      }
    }
  });

  if ($(window).width() < 768) {
    if (!$('.article-update-personal-particulars').hasClass('collapse-sidebar')) {
      $('.article-update-personal-particulars').addClass('collapse-sidebar');
    }
    
    if (!$('.article-update-personal-preferences').hasClass('collapse-sidebar')) {
      $('.article-update-personal-preferences').addClass('collapse-sidebar');
    }
    
    if (!$('.article-change-password').hasClass('collapse-sidebar')) {
      $('.article-change-password').addClass('collapse-sidebar');
    }

    if (!$('.article-reset-student-password').hasClass('collapse-sidebar')) {
      $('.article-reset-student-password').addClass('collapse-sidebar');
    }

    if (!$('.article-reset-teacher-password').hasClass('collapse-sidebar')) {
      $('.article-reset-teacher-password').addClass('collapse-sidebar');
    }
  }
});
