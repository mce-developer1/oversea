$(document).ready(function() {
  $(document).on('click', '[data-toggle="drawer"]', function(e) {
    var target = $(this).attr('data-target');
    if($(target).hasClass('show')) $('.drawer-toggle').remove();
    else $('body').append('<div class="drawer-backdrop"></div>');
    $(target).toggleClass('show');
  });

  $(document).on('click', '.drawer-backdrop', function(e) {    
    $('.drawer-backdrop').remove();
    $('.drawer.show').removeClass('show');
  });
});
