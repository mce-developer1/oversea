$(document).ready(function() {
  var $container = $('.article-resources');

  function clearRecordsSelection() {
    $container.find('.table-body .table-active').removeClass('table-active');
    updateActionButtonsStyles();
  }

  function updateActionButtonsStyles() {
    var resourcesSelected = ($container.find('.table-body .table-active').length > 0);

    if (resourcesSelected) {
      if ($container.find('.article-body .navbar .form-add-resource').hasClass('d-none')) {
        $container.find('.article-body .navbar .form-add-resource').removeClass('d-none');
      }

      if ($(window).width() < 992) {
        if (!$container.find('.article-body .navbar .navbar-text').hasClass('d-none')) {
          $container.find('.article-body .navbar .navbar-text').addClass('d-none');
        }
      } else {
        if ($container.find('.article-body .navbar .navbar-text').hasClass('d-none')) {
          $container.find('.article-body .navbar .navbar-text').removeClass('d-none');
        }
      }
    } else {
      if (!$container.find('.article-body .navbar .form-add-resource').hasClass('d-none')) {
        $container.find('.article-body .navbar .form-add-resource').addClass('d-none');
      }

      if ($container.find('.article-body .navbar .navbar-text').hasClass('d-none')) {
        $container.find('.article-body .navbar .navbar-text').removeClass('d-none');
      }
    }
  }

  function searchLessons(e) {
    var search = $container.find('.nav-main .input-group .aa-input').val();
    if (search === '') return;

    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .navbar').removeClass('d-none');
      $container.find('.article-body .table-head').removeClass('d-none');
      $container.find('.article-body .table-body').removeClass('d-none');
      $container.find('.nav-item-result .item-text').text(search);

      var searchTitle = 'Search results for "'+ search + '"';
      $container.find('.article-body .navbar .navbar-text').html(searchTitle);
    }, 5000);
  }

  $container.find('.navbar-nav:not(.nav-main) .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main) .nav-item-submodule').removeClass('d-none');
    $container.find('.navbar-nav:not(.nav-main) .nav-item-result').addClass('d-none');
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

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchLessons);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchLessons(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $container.find('.nav-main .input-group .aa-input').val('');
    searchLessons(e);
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

  $container.find('.btn-list-view').on('click', function(e) {
    $container.find('.btn-card-view').removeClass('d-none');
    $(this).addClass('d-none');

    $container.find('.article-body .card-group').addClass('d-none');
    $container.find('.article-body .table-head').removeClass('d-none');
    $container.find('.article-body .table-body').removeClass('d-none');
  });

  $container.find('.btn-card-view').on('click', function(e) {
    $container.find('.btn-list-view').removeClass('d-none');
    $(this).addClass('d-none');

    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');
    $container.find('.article-body .card-group').removeClass('d-none');
  });

  $container.find('.article-body .btn-add').on('click', function(e) {
    clearRecordsSelection();
    clearTimeout(window.toastTimeout);
    delete window.toastTimeout;

    $('.toast-stack').removeClass('d-none');
    $('.toast-stack .toast').toast('dispose').toast('show');
    
    window.toastTimeout = setTimeout(function() {
      $('.toast-stack').addClass('d-none');
    }, 5000);
  });

  $container.find('.table-body tr').on('click', function(e) {
    if (e.shiftKey) {
      e.preventDefault();

      if ($(this).parent().find('.table-active-first').length > 0) {
        $(this).parent().find(':not(.table-active-first)').removeClass('table-active');
        if ($(this).siblings('.table-active-first').index() < $(this).index()) {
          var $nextSibling = $(this).siblings('.table-active-first').next();
          while (($nextSibling.index() > -1) && ($nextSibling.index() <= $(this).index())) {
            $nextSibling.addClass('table-active');
            $nextSibling = $nextSibling.next();
          };
        } else {
          var $prevSibling = $(this).siblings('.table-active-first').prev();
          while ($prevSibling.index() >= $(this).index()) {
            $prevSibling.addClass('table-active');
            $prevSibling = $prevSibling.prev();
          };
        }
        updateActionButtonsStyles();
        return;
      }
    }

    if ($(this).siblings('.table-active').length > 0) {
      $(this).siblings('.table-active').removeClass('table-active');
      $(this).siblings('.table-active-first').removeClass('table-active-first');

      if ($(this).hasClass('table-active')) {      
        if (!$(this).hasClass('table-active-first')) {
          $(this).addClass('table-active-first');
        }
      } else {
        $(this).addClass('table-active');
        $(this).addClass('table-active-first');
      }
    } else {
      $(this).siblings('.table-active').removeClass('table-active');
      $(this).siblings('.table-active-first').removeClass('table-active-first');

      if ($(this).hasClass('table-active')) {      
        $(this).removeClass('table-active');
        $(this).removeClass('table-active-first');
      } else {
        $(this).addClass('table-active');
        $(this).addClass('table-active-first');
      }
    }
    updateActionButtonsStyles();
  });

  $container.find('.table-body tr .btn').on('click', function(e) {
    e.stopPropagation();

    var $model = $('.modal-resource-details');
    var $row = $(this).closest('tr');
    $model.find('.modal-title').text($row.find('td:nth-child(2)').text());
    $model.find('.attribute:nth-child(1) .attribute-value')
      .text($row.find('td:nth-child(3)').text());
    $model.find('.attribute:nth-child(2) .attribute-value')
      .text($row.find('td:nth-child(4)').text());
    if ($row.find('td:nth-child(5) a[data-toggle="popover"]').length === 0) {
      $model.find('.attribute:nth-child(3) .attribute-value')
        .text($row.find('td:nth-child(5)').text());
    } else {
      $model.find('.attribute:nth-child(3) .attribute-value')
        .html($row.find('td:nth-child(5) a[data-toggle="popover"]').attr('data-content'));
    }
    if ($row.find('td:nth-child(6) a[data-toggle="popover"]').length === 0) {
      $model.find('.attribute:nth-child(4) .attribute-value')
        .text($row.find('td:nth-child(6)').text());
    } else {
      $model.find('.attribute:nth-child(4) .attribute-value')
        .html($row.find('td:nth-child(6) a[data-toggle="popover"]').attr('data-content'));
    }
    $model.find('.attribute:nth-child(5) .attribute-value')
      .text($row.find('td:nth-child(7)').text());
    $('.modal-resource-details').modal('show');
  });
});
