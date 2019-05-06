$(document).ready(function() {
  var $container = $('.article-notifications');

  $container.find('.list-notifications').on('click', '.list-group-item-action', function(e) {
    $('.modal-notification-view').modal('show');
  });
});
