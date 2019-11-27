$(document).ready(function() {
  var $container = $('.article-resources');

  function searchChannels(e) {
    var search = $container.find('.nav-main .input-group .aa-input').val();
    if (search === '') return;

    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .navbar-expand .navbar-nav').addClass('d-none');
      $container.find('.article-body .navbar').removeClass('d-none');      
      $container.find('.nav-item-result .item-text').text(search);

      if (search === 'empty') {
        $container.find('.article-body .empty-state').removeClass('d-none');
      } else {
        $container.find('.article-body .table-head').addClass('d-none');
        $container.find('.article-body .table-body').addClass('d-none');
        $container.find('.table-search-results').removeClass('d-none');
      }

      var searchTitle = 'Search results for "'+ search + '"';
      $container.find('.article-body .navbar .navbar-text').html(searchTitle);
    }, 1000);
  }

  $container.find('.nav-main .input-group .input-autocomplete').on('keyup', function(e) {
    if ($(this).val().trim() !== '') {
      $container.find('.nav-main .input-group .btn-clear').removeClass('d-none');
    } else {
      $container.find('.nav-main .input-group .btn-clear').addClass('d-none');
    }
  });

  $container.find('.nav-main .input-group .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
    displayKey: 'name',
    source: function(query, callback) {
      var records = [
        { name: 'CAIE English Student Textbook' }, 
        { name: 'CAIE Maths Student Textbook' },
        { name: 'My Pals Are Here! Maths Student Textbook' }, 
        { name: 'My Pals Are Here! Science Student Textbook' },
        { name: 'Take Off with English Student Textbook' }
      ];
      var pattern = new RegExp(query, 'i');
      var hits = records.filter(function(record) {
        return record.name.match(pattern);
      });
      hits.forEach(function(hit) {
        var match = hit.name.match(pattern)[0];
        var highlighted = '<em>' + match + '</em>';
        hit.highlighted = hit.name.replace(match, highlighted);
      });
      callback(hits);
    },
    templates: {
      suggestion: function(suggestion) {
        return suggestion.highlighted;
      }
    }
  }]);

  $container.find('.navbar-nav:not(.nav-main) .btn-search').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').addClass('d-none');
    $container.find('.nav-main').addClass('d-block');
  });

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchChannels);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchChannels(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $(this).addClass('d-none');
    $container.find('.nav-main .input-group .aa-input').val('');
    searchChannels(e);
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

  $('.toast-stack .toast .btn-close').on('click', function() {
    $(this).closest('.toast').addClass('d-none');
    $('.toast-stack').addClass('d-none');
  });  

  $('.modal-announcement-view').on('hide.bs.modal', function() {
    window.Utils.showNotificationToast('You have earned <strong>5</strong> coins!');
  });

  $('.modal-alert-message').on('hide.bs.modal', function() {
    $('.modal-announcement-view').modal('show');
  });
  //$('.modal-alert-message').modal('show');

  var translation = {
    common_label_grade: "Grade",
    common_label_subject: "Subject" 
  }
  window.Utils.initLocalization('en-GB', translation, {
    interpolation: false,
    initCallback: function(err, t) {
      var localized = t('common_label_grade');
      console.log(localized);
    }
  });
});
