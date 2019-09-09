$(document).ready(function() {
  var $container = $('.article-assignments');

  function searchAssignments(e) {
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
      $container.find('.article-body .table-head').removeClass('d-none');
      $container.find('.article-body .table-body').removeClass('d-none');
      $container.find('.nav-item-result .item-text').text(search);

      var searchTitle = 'Search results for "'+ search + '"';
      $container.find('.article-body .navbar .navbar-text').html(searchTitle);
    }, 1000);
  }

  function showAssignResourceModal(srcUrl) {
    $('.modal-resource-assign').find('iframe').attr('src', srcUrl);
    $('.modal-resource-assign').on('keydown', function(e) {
      if ((e.which == 27) && window._pageDirty) {
        e.which = Number.NaN;
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-assign').modal('hide');
        });
      }
    });
    $('.modal-resource-assign .btn-close').on('click', function(e) {
      if (window._pageDirty) {
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-assign').modal('hide');
        });
      }
    });
    $('.modal-resource-assign').on('hide.bs.modal', function(e) {
      // To do
    });
    $('.modal-resource-assign').modal('show');
  }

  function showTrackAssignmentModal(srcUrl) {
    var title = 'Track ' + ((srcUrl.indexOf('/shared/track_lesson') > -1) ? 'Lesson' : 'Test');
    $('.modal-assignment-track .navbar .navbar-nav .item-text').text(title);
    $('.modal-assignment-track').find('iframe').attr('src', srcUrl);
    $('.modal-assignment-track').on('keydown', function(e) {
      if ((e.which == 27) && window._pageDirty) {
        e.which = Number.NaN;
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-assignment-track').modal('hide');
        });
      }
    });
    $('.modal-assignment-track .btn-close').on('click', function(e) {
      if (window._pageDirty) {
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-assignment-track').modal('hide');
        });
      }
    });
    $('.modal-assignment-track').modal('show');
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

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchAssignments);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchAssignments(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $(this).addClass('d-none');
    $container.find('.nav-main .input-group .aa-input').val('');
    searchAssignments(e);
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

  $container.find('.article-sidebar .nav-side .nav-link').on('click', function(e) {
    $container.find('.article-sidebar .nav-side .nav-link').removeClass('active');
    $(this).addClass('active')

    if ($(this).text() === 'Assigned to Me') {
      $container.find('.card-group .card:eq(1)').addClass('d-none');
      $container.find('.card-group .card:eq(2)').addClass('d-none');
      $container.find('.table-body tr:eq(1)').addClass('d-none');
      $container.find('.table-body tr:eq(2)').addClass('d-none');
    } else {
      $container.find('.card-group .card:eq(1)').removeClass('d-none');
      $container.find('.card-group .card:eq(2)').removeClass('d-none');
      $container.find('.table-body tr:eq(1)').removeClass('d-none');
      $container.find('.table-body tr:eq(2)').removeClass('d-none');
    }
  });

  $container.find('.table-body tr .btn').on('click', function(e) {
    var $model = $('.modal-assignment-details');
    var $row = $(this).closest('tr');
    $model.find('.modal-title').text($row.find('td:nth-child(1)').text());
    $model.find('.attribute:nth-child(1) .attribute-value')
      .text($row.find('td:nth-child(2)').text());
    $model.find('.attribute:nth-child(2) .attribute-value')
      .text($row.find('td:nth-child(3)').text());
    if ($row.find('td:nth-child(4) a[data-toggle="popover"]').length === 0) {
      $model.find('.attribute:nth-child(3) .attribute-value')
        .text($row.find('td:nth-child(4)').text());
    } else {
      $model.find('.attribute:nth-child(3) .attribute-value')
        .html($row.find('td:nth-child(4) a[data-toggle="popover"]').attr('data-content'));
    }
    if ($row.find('td:nth-child(5) a[data-toggle="popover"]').length === 0) {
      $model.find('.attribute:nth-child(4) .attribute-value')
        .text($row.find('td:nth-child(5)').text());
    } else {
      $model.find('.attribute:nth-child(4) .attribute-value')
        .html($row.find('td:nth-child(5) a[data-toggle="popover"]').attr('data-content'));
    }
    $model.find('.attribute:nth-child(5) .attribute-value')
      .text($row.find('td:nth-child(6)').text());
    $('.modal-assignment-details').modal('show');
  });

  $container.find('.table-body tr .period').on('click', function(e) {
    e.preventDefault();
    if(!$(this).attr("href")) return;
    showAssignResourceModal('/shared/assign_resource');
  });

  $container.find('.table-body tr .percentage').on('click', function(e) {
    e.preventDefault();

    if ($(this).data('type') === 'lesson') {
      showTrackAssignmentModal('/shared/track_lesson');
    } else {
      showTrackAssignmentModal('/shared/track_test');
    }
  });

  $container.find('.card-group .card .period').on('click', function(e) {
    e.preventDefault();
    if(!$(this).attr("href")) return;
    showAssignResourceModal('/shared/assign_resource');
  });

  $container.find('.card-group .card .percentage').on('click', function(e) {
    e.preventDefault();
    
    if (/^\/student/i.test(window.location.pathname)) {
      if ($(this).data('type') === 'lesson') {
        showTrackAssignmentModal('/shared/track_lesson_user');
      } else {
        showTrackAssignmentModal('/shared/track_test_user');
      }
    } else {
      if ($(this).data('type') === 'lesson') {
        showTrackAssignmentModal('/shared/track_lesson');
      } else {
        showTrackAssignmentModal('/shared/track_test');
      }
    }
  });

  $('a[data-toggle="popover"]').on('click', function(e) {
    e.stopPropagation();
  });

  $('a[data-toggle="popover"]').popover({
    html: true,
    container: 'body',    
    placement: 'top',
    trigger: 'focus'
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
