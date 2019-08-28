$(document).ready(function() {
  var $container = $('.article-games');

  function receivedMessage(e) {
    console.log(e);
    var message = JSON.parse(e.data);
    $(this).find('.game .game-status').html(message.status);
    $(this).find('.game .game-score').html(message.score);
  }

  $container.find('.list-group .list-group-item').on('click', function(e) {
    var gameWindow = window.open('/games/didi-and-friends-guess-what-marshall/?origin=http://localhost:3000', '_blank');
    gameWindow.addEventListener("message", receivedMessage.bind(this), false);
  });
});
