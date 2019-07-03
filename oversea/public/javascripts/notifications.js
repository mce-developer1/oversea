$(document).ready(function() {
  var $container = $('.article-notifications');

  $container.find('.navbar-nav .btn-settings').on('click', function(e) {
    $('.modal-notifications-settings .custom-control-input').on('click', function(e) {
      if ($(this).attr('id') !== 'all') return;
      if ($(this).prop('checked')) {
        $('.modal-notifications-settings .custom-control-input').prop('checked', true);
      } else {
        $('.modal-notifications-settings .custom-control-input').prop('checked', false);
      }
    });

    $('.modal-notifications-settings').modal('show');
  });

  $container.find('.list-notifications').on('click', '.list-group-item-action', function(e) {
    if ($(e.target).hasClass('.dropdown')) return;
    if ($(e.target).closest('.dropdown').length > 0) return;
    $('.modal-notification-view').modal('show');
  });

  $container.find('.list-notifications .dropdown').on('click', '.item-mark-as-read', function(e) {
    var $item = $(this).closest('.list-group-item');
    $item.find('.item-mark-as-read').addClass('d-none');
    $item.find('.item-mark-as-unread').removeClass('d-none');
    $item.removeClass('active');
  });

  $container.find('.list-notifications .dropdown').on('click', '.item-mark-as-unread', function(e) {
    var $item = $(this).closest('.list-group-item');
    $item.find('.item-mark-as-unread').addClass('d-none');
    $item.find('.item-mark-as-read').removeClass('d-none');
    $item.addClass('active');
  });

  $container.find('.list-notifications .dropdown').on('click', '.item-delete', function(e) {
    $('.modal-notification-delete-confirmation').modal('show');
  });

  $('.modal-announcement-view .btn-previous').on('click', function(e) {
    $('.modal-announcement-view .modal-title').text('Announcement 1 of 2');
    $('.modal-announcement-view .announcement').toggleClass('d-none');
    $('.modal-announcement-view .btn-previous').addClass('d-none');
    $('.modal-announcement-view .btn-close').addClass('d-none');
    $('.modal-announcement-view .btn-next').removeClass('d-none');
  });

  $('.modal-announcement-view .btn-next').on('click', function(e) {
    $('.modal-announcement-view .modal-title').text('Announcement 2 of 2');
    $('.modal-announcement-view .announcement').toggleClass('d-none');
    $('.modal-announcement-view .btn-next').addClass('d-none');
    $('.modal-announcement-view .btn-previous').removeClass('d-none');
    $('.modal-announcement-view .btn-close').removeClass('d-none');
  });

  $('.modal-announcement-view').modal('show');
});
