$(document).ready(function() {
  var $container = $('.article-resources');
  var dropzone;
  if ($container.length === 0) $container = $('.article-tests');
  if ($container.length === 0) $container = $('.article-file-upload');

  function clearDropZoneFiles() {
    if (dropzone && dropzone.removeAllFiles) {
      dropzone.removeAllFiles();
    }
  }

  function destroyDropZone() {
    if (dropzone && dropzone.off && dropzone.destroy) {
      dropzone.off();
      dropzone.destroy();
    }
  }

  function clearRecordsSelection() {
    $container.find('.table-body .table-active').removeClass('table-active');
    updateActionButtonsStyles();
  }

  function updateActionButtonsStyles() {
    var resourcesSelected = ($container.find('.table-body .table-active').length > 0);

    if (resourcesSelected) {
      if ($container.find('.article-body .navbar .navbar-nav.nav-form').hasClass('d-none')) {
        $container.find('.article-body .navbar .navbar-nav.nav-main').addClass('d-none');
        $container.find('.article-body .navbar .navbar-nav.nav-form').removeClass('d-none');
      }

      if ($(window).width() < 992) {
        if (!$container.find('.navbar .navbar-text').hasClass('d-none')) {
          $container.find('.navbar .navbar-text').addClass('d-none');
        }
      } else {
        if ($container.find('.navbar .navbar-text').hasClass('d-none')) {
          $container.find('.navbar .navbar-text').removeClass('d-none');
        }
      }
    } else {
      if (!$container.find('.article-body .navbar .navbar-nav.nav-form').hasClass('d-none')) {
        $container.find('.article-body .navbar .navbar-nav.nav-form').addClass('d-none');
        $container.find('.article-body .navbar .navbar-nav.nav-main').removeClass('d-none');
      }

      if ($container.find('.navbar .navbar-text').hasClass('d-none')) {
        $container.find('.navbar .navbar-text').removeClass('d-none');
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
    $container.find('.article-header .navbar-nav:not(.nav-main)').addClass('d-none');
    $container.find('.article-header .nav-main').addClass('d-block');
  });

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchLessons);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchLessons(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.article-header .navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.article-header .nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $(this).addClass('d-none');
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

  $container.find('.article-body .btn-create').on('click', function(e) {
    window.location = '/shared/create_test';
  });

  $container.find('.article-body .btn-add').on('click', function(e) {
    clearDropZoneFiles();
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

  if ($('.article-file-upload .file-upload').length === 1) {
    var $upload = $('.article-file-upload .file-upload');
    destroyDropZone();

    dropzone = new Dropzone($upload.get(0), {
      previewsContainer: '.file-upload .file-group',
      previewTemplate: $('#preview').html(),
      clickable: '.file-upload .btn-upload',
      url: "/shared/upload",
      uploadMultiple: true,
      parallelUploads: 1,
      maxFiles: 5,
      maxfilesreached: function(files) {
        var maxFiles = dropzone.options.maxFiles;
        
        if (files.length > maxFiles) {
          for (var i = maxFiles; i < files.length; i++) {
            dropzone.removeFile(files[i]);
          }
        }
      },
      processing: function(file) {
        if ($upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').removeClass('d-none');
        }
      },
      error: function(file) {
        var error = "Failed to upload the file.";
        var $message = $(file.previewElement).find('.file-message');
        $message.find('[data-dz-errormessage]').text(error);
      },
      success: function(file) {
        if ($container.find('.navbar .nav-form').hasClass('d-none')) {
          $container.find('.navbar .nav-form').removeClass('d-none');
        }

        $progress = $(file.previewElement).find('.file-progress');
        $progress.addClass('d-none');

        var success = "File uploaded successfully."
        var $message = $(file.previewElement).find('.file-message');
        $message.find('[data-dz-successmessage]').text(success);
      }
    });
  }
});
