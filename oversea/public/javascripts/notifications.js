$(document).ready(function() {
  var $container = $('.article-notifications');

  $container.find('.list-notifications').on('click', '.list-group-item-action', function(e) {
    $('.modal-notification-view').modal('show');
  });

  $container.find('.list-notifications .notification').on('click', '.btn-mark-read', function(e) {
    e.stopPropagation();
    $(this).addClass('d-none');
    $(this).parent().find('.btn-mark-unread').removeClass('d-none');
  });

  $container.find('.list-notifications .notification').on('click', '.btn-mark-unread', function(e) {
    e.stopPropagation();
    $(this).addClass('d-none');
    $(this).parent().find('.btn-mark-read').removeClass('d-none');
  });
});
