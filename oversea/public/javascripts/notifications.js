$(document).ready(function() {
  var $container = $('.article-notifications');

  $container.find('.navbar-nav .btn-settings').on('click', function(e) {
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
});
