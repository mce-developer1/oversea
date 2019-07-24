$(document).ready(function() {
  var $container = $('.article-games');

  function receivedMessage(e) {
    var message = JSON.parse(e.data);
    $(this).find('.game .game-status').html(message.status);
    $(this).find('.game .game-score').html(message.score);
  }

  $container.find('.list-group .list-group-item').on('click', function(e) {
    var gameWindow = window.open('/static/games/game.html?origin=http://localhost:3000', '_blank');
    gameWindow.addEventListener("message", receivedMessage.bind(this), false);
  });
});
