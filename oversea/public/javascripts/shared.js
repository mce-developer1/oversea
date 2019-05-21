$(document).ready(function() {
  var $container = $('.article-resources');
  var dropzone;
  if ($container.length === 0) $container = $('.article-tests');
  if ($container.length === 0) $container = $('.article-questions');
  if ($container.length === 0) $container = $('.article-file-upload');

  function removeAllDropZoneFiles() {
    if (dropzone && dropzone.removeAllFiles) {
      dropzone.removeAllFiles(true);
    }
  }

  function removeDropZoneFile(uuid) {
    if (dropzone && dropzone.removeFile) {
      for (var i = 0; i < dropzone.files.length; i++) {
        if (dropzone.files[i].upload.uuid === uuid) {
          dropzone.removeFile(dropzone.files[i]);
          break;
        }
      }
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
    $container.find('.list-components .component-active .question-checkbox .custom-control-input').prop('checked', false);
    $container.find('.list-components .component-active').removeClass('component-active');
    updateActionButtonsStyles();
  }

  function updateActionButtonsStyles() {
    var resourcesSelected = ($container.find('.table-body .table-active').length > 0);

    if (!resourcesSelected) {
      resourcesSelected = ($container.find('.list-components .component-active').length > 0);
    }

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
    removeAllDropZoneFiles();
    clearRecordsSelection();
    clearTimeout(window.toastTimeout);
    delete window.toastTimeout;

    $('.toast-stack').removeClass('d-none');
    $('.toast-stack .toast').toast('dispose').toast('show');
    
    window.toastTimeout = setTimeout(function() {
      $('.toast-stack').addClass('d-none');
    }, 5000);
  });
  
  $container.find('.table-body tr .custom-control-input').on('click', function(e) {
    var $row = $(this).closest('tr');
        
    if ($row.hasClass('table-active')) {
      $row.removeClass('table-active');
    } else {
      $row.addClass('table-active');
    }
    updateActionButtonsStyles();
  });

  $container.find('.table-body tr').on('click', function(e) {
    if ($(e.target).is('a')) return;
    if ($(e.target).closest('a') > 0) return;
    if ($(e.target).hasClass('.badge')) return;
    if ($(e.target).closest('.badge').length > 0) return;
    if ($(e.target).hasClass('.btn')) return;
    if ($(e.target).closest('.btn').length > 0) return;
    if ($(e.target).hasClass('.custom-control')) return;
    if ($(e.target).closest('.custom-control').length > 0) return;
    if ($(this).find('.custom-control-input').prop('disabled')) return;
    if ($(this).hasClass('table-active')) {
      $(this).removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', false);
    } else {
      $(this).addClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
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

  function updateUploadFormStyles() {
    if (window._pageDirty) return;
    if (!dropzone) return;

    var uploadedFiles = [];

    for (var i = 0; i < dropzone.files.length; i++) {
      if (dropzone.files[i].status === 'success') {
        uploadedFiles.push(dropzone.files[i]);
      }
    }

    if (uploadedFiles.length > 0) {
      if ($container.find('.navbar .nav-form').hasClass('d-none')) {
        $container.find('.navbar .nav-form').removeClass('d-none');
      }
    } else {
      if (!$container.find('.navbar .nav-form').hasClass('d-none')) {
        $container.find('.navbar .nav-form').addClass('d-none');
      }
    }
  }

  if ($('.article-file-upload .file-upload').length === 1) {
    var $upload = $('.article-file-upload .file-upload');
    destroyDropZone();

    dropzone = new Dropzone($upload.get(0), {
      previewsContainer: '.file-upload .file-group',
      previewTemplate: $('#preview').html(),
      clickable: '.file-upload .btn-upload',
      url: "/shared/upload",
      chunking: true,
      chunkSize: 500,
      retryChunks: true,
      retryChunksLimit: 3,
      parallelUploads: 1,
      maxFilesize: .25,
      addedfile: function(file) {
        var previewTemplate = this.options.previewTemplate;
        var previewElement = $(previewTemplate).get(0);
        var $details = $(previewElement).find('.file-details');
        var fileIcon = window.Utils.getFileIcon(file);
        $details.find('.file-thumbnail').append(fileIcon);
        $details.find('.file-thumbnail').attr('title', file.name);

        var $filename = $details.find('.file-filename');
        $filename.find('.file-name').html(file.name);
        $filename.find('.file-size').html(this.filesize(file.size));
        $(previewElement).find('.file-uuid').val(file.upload.uuid);

        file.previewElement = previewElement;
        $upload.find('.file-group').append(previewElement);        

        if ($upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').removeClass('d-none');
        }
      },
      processing: function(file) {
        window._pageDirty = true;
        window.top._pageDirty = true;
      },
      uploadprogress: function(file, progress) {
        if ((progress === 100) || window._progressTimeout) return;
        if (!window._pageDirty) window._pageDirty = true;
        if (!window.top._pageDirty) window.top._pageDirty = true;
        window._progressTimeout = setTimeout(function() {
          var $progress = $(file.previewElement).find('.file-progress');
          var style = 'width: ' + progress + '%;';
          $progress.find('.progress-bar').attr('style', style);
          delete window._progressTimeout;
        }, 100);
      },
      error: function(file) {
        var $actions = $(file.previewElement).find('.file-actions');
        $actions.find('.btn-edit').addClass('d-none');
        $(file.previewElement).addClass('file-preview-error');

        var $message = $(file.previewElement).find('.file-message');
        var error = 'Failed to upload the file.';
        var maxFilesize = this.options.maxFilesize;
        
        if (file.size > (maxFilesize * 1024 * 1024)) {
          error = 'File size excceeds the limit of ' + maxFilesize + 'MB.'
        }

        error = '<i class="fas fa-exclamation"></i> ' + error;
        $message.find('.text-danger').html(error);
      },
      success: function(file) {
        var $message = $(file.previewElement).find('.file-message');
        var success = 'File uploaded successfully.';
        success = '<i class="fas fa-check"></i> ' + success;
        $message.find('.text-success').html(success);

        setTimeout(updateUploadFormStyles, 100);
      },
      complete: function(file) {
        var $progress = $(file.previewElement).find('.file-progress');
        if (!$progress.hasClass('d-none')) $progress.addClass('d-none');
        
        window._pageDirty = false;
        window.top._pageDirty = false;
      }
    });

    $('.article-file-upload .file-upload').on('click', '.btn-edit', function(e) {
      $('.modal-file-edit-attributes').modal('show');
    });
    $('.article-file-upload .file-upload').on('click', '.btn-delete', function(e) {
      var $file = $(this).closest('.file-preview');
      var uuid = $file.find('.file-uuid').val();

      if ($file.hasClass('file-preview-error')) {
        removeDropZoneFile(uuid);
        return;
      }

      $('.modal-file-remove-confirmation .btn-primary').on('click', function(e) {
        $('.modal-file-remove-confirmation').modal('hide');
        removeDropZoneFile(uuid);
        setTimeout(updateUploadFormStyles, 100);
      });
      $('.modal-file-remove-confirmation').modal('show');
    });
  }
});
