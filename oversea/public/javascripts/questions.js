$(document).ready(function() {
  var $container = $('.article-questions');

  function updateActionButtonsStyles() {
    var questionsSelected = ($container.find('.list-components .component-active').length > 0);

    if (questionsSelected) {
      if ($container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').removeClass('d-none');
      }

      if ($container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').removeClass('d-none');
      }

      if ($container.find('.btn-more').hasClass('d-none')) {
        $container.find('.btn-more').removeClass('d-none');
      }      
    } else {
      if (!$container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').addClass('d-none');
      }

      if (!$container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').addClass('d-none');
      }

      if (!$container.find('.btn-more').hasClass('d-none')) {
        $container.find('.btn-more').addClass('d-none');
      }      
    }

    if ($(window).width() < 992) {
      if (questionsSelected) {
        if ($container.find('.divider-search').hasClass('d-none')) {
          $container.find('.divider-search').removeClass('d-none');
        }
      } else {
        if (!$container.find('.divider-search').hasClass('d-none')) {
          $container.find('.divider-search').addClass('d-none');
        }
      }
    } else {
      if (!$container.find('.divider-search').hasClass('d-none')) {
        $container.find('.divider-search').addClass('d-none');
      }
    }
  }

  function searchQuestions(e) {
    var search = $container.find('.nav-main .input-group .aa-input').val();
    if (search === '') return;

    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.article-body .list-components').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .navbar-expand .navbar-nav').addClass('d-none');
      $container.find('.article-body .navbar').removeClass('d-none');
      $container.find('.article-body .list-components').removeClass('d-none');
      $container.find('.nav-item-result .item-text').text(search);

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
        { name: 'Counting To 10' }, 
        { name: 'Comparing Numbers' },
        { name: 'Making Number Patterns' }, 
        { name: 'Making Number Bonds' },
        { name: 'Making Addition Stories' },
        { name: 'Making Subtraction Stories' },
        { name: 'Making Fact Families' },
        { name: 'Making Patterns With Shapes' }
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

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchQuestions);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchQuestions(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $(this).addClass('d-none');
    $container.find('.nav-main .input-group .aa-input').val('');
    searchQuestions(e);
  });

  $container.find('.nav-main .dialog .dialog-menu .btn-primary').on('click', function(e) {
    var selectedCurriculum = $('#selCurriculum').selectpicker('val');
    var query = (selectedCurriculum === 'All') ? '' : 'curriculum:' + selectedCurriculum;

    var selectedGrade = $('#selGrade').selectpicker('val');
    query += (selectedGrade === 'All') ? '' : ' grade:' + selectedGrade;

    var selectedSubject = $('#selSubjet').selectpicker('val');
    query += (selectedSubject === 'All') ? '' : ' subject:' + selectedSubject;

    var keyword = $(txtKeyword).val();
    query += (query === '') ? keyword : ' ' + keyword;
    $container.find('.nav-main .input-group .aa-input').val(query);
    $container.find('.nav-main .dialog').removeClass('open');
    $container.find('.nav-main .dialog .dialog-menu').removeClass('show');
  });

  $container.find('.navbar-nav .btn-share').on('click', function(e) {
    $('.modal-resource-share').modal('show');
  });

  $container.find('.dropdown-menu .item-delete').on('click', function(e) {
    $('.modal-test-delete-confirmation').modal('show');
  });

  $container.find('.list-components .component-question .custom-control-input').on('click', function(e) {
    if ($(this).closest('.question-checkbox').length === 0) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    var $component = $(this).closest('.component-question');
        
    if ($component.hasClass('component-active')) {
      $component.removeClass('component-active');
    } else {
      $component.addClass('component-active');
    }
    updateActionButtonsStyles();
  });

  $container.find('.list-components .component-question').on('click', function(e) {
    if ($(e.target).hasClass('nav-link')) return;
    if ($(e.target).closest('.nav-link').length > 0) return;
    if ($(e.target).hasClass('custom-control')) return;
    if ($(e.target).closest('.custom-control').length > 0) return;
    if ($(this).hasClass('component-active')) {
      $(this).removeClass('component-active');
      $(this).find('.question-checkbox .custom-control-input').prop('checked', false);
    } else {
      $(this).addClass('component-active');
      $(this).find('.question-checkbox .custom-control-input').prop('checked', true);
    }
    updateActionButtonsStyles();
  });

  $('.modal-resource-share .btn-primary').on('click', function(e) {
    if ($('.modal-resource-share .users-permissions').hasClass('d-none')) {
      $('.modal-resource-share .form-add-user .text-danger').removeClass('d-none');
    } else {
      $('.modal-resource-share .form-add-user .text-danger').addClass('d-none');
    }
  });

  $('.modal-resource-share .form-add-user .btn-add').on('click', function(e) {
    if ($('.modal-resource-share .list-users .list-group-item').length > 0) {
      $('.modal-resource-share .users-permissions').removeClass('d-none');
      $('.modal-resource-share .form-add-user .text-muted').addClass('d-none');
    }
  });

  $('.modal-resource-share .form-add-user .btn-select').on('click', function(e) {
    $('.modal-resource-share .modal-content').addClass('d-none');
    $('.modal-user-select').on('hidden.bs.modal', function (e) {
      $('.modal-resource-share .modal-content').removeClass('d-none');
    });
    $('.modal-user-select').modal('show');
  });

  $('.modal-resource-share .list-users .list-group-item .btn-light').on('click', function(e) {
    if ($('.modal-resource-share .list-users .list-group-item').length === 1) {
      $('.modal-resource-share .list-users').addClass('d-none');
    }

    $(this).closest('.list-group-item').remove();
  });

  $('.modal-resource-share .form-add-user .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
    displayKey: 'name',
    source: function(query, callback) {
      var records = [
        { name: 'Aaron Tan' }, 
        { name: 'Arya Suman' },
        { name: 'Ashar Ahmad' }, 
        { name: 'Chua Chin Hui' },
        { name: 'Derrick Lee' }
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

  $('.article-create-question .form-create-question .form-textarea').each(function(index, textarea) {
    window.Utils.initTextEditor(textarea);
  });

  $('.article-create-question .form-create-question .btn-generate-answers').on('click', function(e) {
    var $form = $(this).closest('.form-create-question');
    $form.find('.question-answers').removeClass('d-none');
  });

  $('.article-create-question .form-create-question .btn-save').on('click', function(e) {
    window.Utils.showProcessingOverlay();
    setTimeout(function() {
      window.Utils.hideProcessingOverlay();
      var url = window.location.pathname;
      window.location = url.replace('/create_question', '/questions');
    }, 1000);
  });

  $(window).on('resize', function(e) {
    if ($(window).width() > 992) {
      if ($container.find('.nav-main').hasClass('d-block')) {
        $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
        $container.find('.nav-main').removeClass('d-block');
      }
    }
  });
});
