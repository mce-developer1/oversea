$(document).ready(function() {
  $('#selGrade').on('changed.bs.select', function (e) {
    $('.article-resources .article-body .loading-state').removeClass('d-none');
    $('.article-resources .article-body .card-group').addClass('d-none');

    setTimeout(function() {
      $('.article-resources .article-body .loading-state').addClass('d-none');
      $('.article-resources .article-body .card-group').removeClass('d-none');
    }, 1000);
  });

  $('#selSubjet').on('changed.bs.select', function (e) {
    $('.article-resources .article-body .loading-state').removeClass('d-none');
    $('.article-resources .article-body .card-group').addClass('d-none');

    setTimeout(function() {
      clearTimeout(window.toastTimeout);
      delete window.toastTimeout;

      $('.article-resources .article-body .loading-state').addClass('d-none');
      $('.toast-stack').removeClass('d-none');
      $('.toast-stack .toast').toast('dispose').toast('show');

      window.toastTimeout = setTimeout(function() {
        $('.toast-stack').addClass('d-none');
      }, 5000);
    }, 1000);
  });

  $('.article-resources .article-body .card-group .card').on('click', function(e) {
    //var userRole = $('#userRole').val();
    //location.href = '/' + userRole + '/channel';
    if (Math.round(Math.random())) {
      window.open('/games/didi-and-friends-guess-what/', 'game');
    } else {
      var gamePreview = '<iframe class="full" src="/games/didi-and-friends-guess-what/" frameborder="0" allowfullscreen></iframe>';
      $('.modal-resource-preview .modal-body .content').html(gamePreview);
      $('.modal-resource-preview').modal('show');
    }
  });

  $('.modal-announcement-view .btn-previous').on('click', function(e) {
    $('.modal-announcement-view .modal-title').text('Results of Chinese Challenge');
    $('.modal-announcement-view .navbar-text').text('Announcement 1 of 2');
    $('.modal-announcement-view .announcement').toggleClass('d-none');
    $('.modal-announcement-view .btn-previous').addClass('d-none');
    $('.modal-announcement-view .btn-close').addClass('d-none');
    $('.modal-announcement-view .btn-next').removeClass('d-none');
  });

  $('.modal-announcement-view .btn-next').on('click', function(e) {
    $('.modal-announcement-view .modal-title').text('Lorem ipsum');
    $('.modal-announcement-view .navbar-text').text('Announcement 2 of 2');
    $('.modal-announcement-view .announcement').toggleClass('d-none');
    $('.modal-announcement-view .btn-next').addClass('d-none');
    $('.modal-announcement-view .btn-previous').removeClass('d-none');
    $('.modal-announcement-view .btn-close').removeClass('d-none');
  });

  $('.modal-announcement-view').modal('show');
});
