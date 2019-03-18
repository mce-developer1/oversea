$(document).ready(function() {
  $('.form-personal-preferences .form-group-avatar .custom-file-input').on('change', function(e) {
    var fileObj = this.files[0];
    $('.form-personal-preferences .form-group-avatar .custom-file-label').text(fileObj.name);

    if (!FileReader) return;        
    var fileReader = new FileReader();
    $(fileReader).on('load', function(e) { 
      $('.form-personal-preferences .form-group-avatar img').attr('src', this.result);
    });
    fileReader.readAsDataURL(fileObj);
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
