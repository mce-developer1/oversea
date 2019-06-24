$(document).ready(function() {
  var $container = $('.article-resources');
  var dropzone;
  var inlineChart;

  if ($container.length === 0) $container = $('.article-tests');
  if ($container.length === 0) $container = $('.article-questions');
  if ($container.length === 0) $container = $('.article-file-upload');
  if ($container.length === 0) $container = $('.article-google');
  if ($container.length === 0) $container = $('.article-youtube');
  if ($container.length === 0) $container = $('.article-assign-resource');
  if ($container.length === 0) $container = $('.article-track-lesson');
  if ($container.length === 0) $container = $('.article-track-lesson-user');
  if ($container.length === 0) $container = $('.article-track-test');
  if ($container.length === 0) $container = $('.article-track-test-user');

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
    } else {
      if (!$container.find('.article-body .navbar .navbar-nav.nav-form').hasClass('d-none')) {
        $container.find('.article-body .navbar .navbar-nav.nav-form').addClass('d-none');
        $container.find('.article-body .navbar .navbar-nav.nav-main').removeClass('d-none');
      }
    }
  }

  function searchResources(e) {
    var search = $container.find('.nav-main .input-group .aa-input').val();
    if (search === '') return;

    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');
    $container.find('.article-body .list-components').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .navbar .breadcrumb').addClass('d-none');
      $container.find('.article-body .navbar-expand .navbar-nav').addClass('d-none');
      $container.find('.article-body .navbar-expand .navbar-text').removeClass('d-none');
      $container.find('.article-body .navbar').removeClass('d-none');
      $container.find('.article-body .table-head').removeClass('d-none');
      $container.find('.article-body .table-body').removeClass('d-none');
      $container.find('.article-body .list-components').removeClass('d-none');
      $container.find('.nav-item-result .item-text').text(search);

      var searchTitle = 'Search results for "'+ search + '"';
      $container.find('.article-body .navbar .navbar-text').html(searchTitle);
    }, 1000);
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

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchResources);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchResources(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.article-header .navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.article-header .nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $(this).addClass('d-none');
    $container.find('.nav-main .input-group .aa-input').val('');
    searchResources(e);
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

  function searchGoogle(keyword) {
    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.list-components').addClass('d-none');

    fetch('/shared/search_google?keyword=' + keyword)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        var html = '';
        response.items.forEach(function(item) {
          var thumbnailHtml = `&nbsp;`;

          if (item && item.pagemap && item.pagemap.cse_thumbnail) {
            var thumbnail = item.pagemap.cse_thumbnail[0];
            thumbnailHtml = `<img src="` + thumbnail.src + `"/>`;
          }

          html += `<div class="component component-webresource">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" id="` + item.cacheId + `" class="custom-control-input">
              <label class="custom-control-label" for="` + item.cacheId + `"></label>
            </div>
            <div class="webresource-preview">
              <div class="webresource-thumbnail">
                ` + thumbnailHtml + `
              </div>
              <div class="webresource-details">
                <div class="webresource-title">
                  <a href="` + item.link + `" target="_blank">
                    ` + item.title + `
                  </a>
                </div>
                <div class="webresource-link text-muted">
                  ` + item.link + `
                </div>
                <div class="webresource-description text-muted">
                  ` + item.snippet + `
                </div>
              </div>
            </div>
          </div>`;
        });
        $container.find('.list-components').html(html);
        $container.find('.article-body .loading-state').addClass('d-none');
        $container.find('.article-body .navbar').removeClass('d-none');
        $container.find('.list-components').removeClass('d-none');

        var searchTitle = 'Search results for "'+ keyword + '"';
        $container.find('.article-body .navbar .navbar-text').html(searchTitle);
      });
  }

  if ($container.hasClass('article-google')) {
    $container.find('.navbar-nav.nav-main .btn-search').off('click').on('click', function(e) {
      searchGoogle($container.find('.nav-main .input-group .form-input').val());
    });

    $container.find('.nav-main .input-group .form-input').on('keyup', function(e) {
      if ($(this).val().trim() !== '') {
        $container.find('.nav-main .input-group .btn-clear').removeClass('d-none');
      } else {
        $container.find('.nav-main .input-group .btn-clear').addClass('d-none');
      }
    });

    $container.find('.nav-main .input-group .form-input').on('keypress', function(e) {
      if (e.which === 13) searchGoogle($(this).val());
    });

    $container.find('.list-components').on('click', '.component-webresource .custom-control-input', function(e) {
      var $component = $(this).closest('.component-webresource');
          
      if ($component.hasClass('component-active')) {
        $component.removeClass('component-active');
      } else {
        $component.addClass('component-active');
      }
      updateActionButtonsStyles();
    });

    $container.find('.list-components').on('click', '.component-webresource', function(e) {
      if ($(e.target).is('a')) return;
      if ($(e.target).closest('a') > 0) return;
      if ($(this).hasClass('component-active')) {
        $(this).removeClass('component-active');
        $(this).find('.custom-control-input').prop('checked', false);
      } else {
        $(this).addClass('component-active');
        $(this).find('.custom-control-input').prop('checked', true);
      }
      updateActionButtonsStyles();
    });
  }

  function searchYoutube(keyword) {
    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.list-components').addClass('d-none');

    fetch('/shared/search_youtube?keyword=' + keyword)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        var html = '';
        response.items.forEach(function(item) {
          var snippet = item.snippet;
          var thumbnail = snippet.thumbnails.default;
          html += `<div class="component component-video">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" id="` + item.id.videoId + `" class="custom-control-input">
              <label class="custom-control-label" for="` + item.id.videoId + `"></label>
            </div>
            <div class="video-preview">
              <div class="video-thumbnail">
                <img src="` + thumbnail.url + `"/>
              </div>
              <div class="video-details">
                <div class="video-title">
                  <a href="https://www.youtube.com/watch?v=` + item.id.videoId + `" target="_blank">
                    ` + snippet.title + `
                  </a>
                </div>
                <div class="video-modified-date text-muted">                  
                  ` + snippet.publishedAt + `
                  <span class="video-channel"> — ` + snippet.channelTitle + `</span>
                </div>
                <div class="video-description text-muted">
                  ` + snippet.description + `
                </div>
              </div>
            </div>
          </div>`;
        });
        $container.find('.list-components').html(html);
        $container.find('.article-body .loading-state').addClass('d-none');
        $container.find('.article-body .navbar').removeClass('d-none');
        $container.find('.list-components').removeClass('d-none');

        var searchTitle = 'Search results for "'+ keyword + '"';
        $container.find('.article-body .navbar .navbar-text').html(searchTitle);
      });
  }

  if ($container.hasClass('article-youtube')) {
    $container.find('.navbar-nav.nav-main .btn-search').off('click').on('click', function(e) {
      searchYoutube($container.find('.nav-main .input-group .form-input').val());
    });

    $container.find('.nav-main .input-group .form-input').on('keyup', function(e) {
      if ($(this).val().trim() !== '') {
        $container.find('.nav-main .input-group .btn-clear').removeClass('d-none');
      } else {
        $container.find('.nav-main .input-group .btn-clear').addClass('d-none');
      }
    });

    $container.find('.nav-main .input-group .form-input').on('keypress', function(e) {
      if (e.which === 13) searchYoutube($(this).val());
    });

    $container.find('.list-components').on('click', '.component-video .custom-control-input', function(e) {
      var $component = $(this).closest('.component-video');
      
      if ($component.hasClass('component-active')) {
        $component.removeClass('component-active');
      } else {
        $component.addClass('component-active');
      }
      updateActionButtonsStyles();
    });

    $container.find('.list-components').on('click', '.component-video', function(e) {
      if ($(e.target).is('a')) return;
      if ($(e.target).closest('a') > 0) return;
      if ($(this).hasClass('component-active')) {
        $(this).removeClass('component-active');
        $(this).find('.custom-control-input').prop('checked', false);
      } else {
        $(this).addClass('component-active');
        $(this).find('.custom-control-input').prop('checked', true);
      }
      updateActionButtonsStyles();
    });
  }

  if ($container.hasClass('article-assign-resource')) {
    function updateAssignButtonsStyle() {
      var groupUsersSelected = ($container.find('.list-group .custom-control-input:checked').length > 0);
      
      if (groupUsersSelected) {
        if ($container.find('.article-header .btn-assign').hasClass('d-none')) {
          $container.find('.article-header .btn-assign').removeClass('d-none');
        }
      } else {
        if (!$container.find('.article-header .btn-assign').hasClass('d-none')) {
          $container.find('.article-header .btn-assign').addClass('d-none');
        }
      }
    }

    $('#txtStartDateTime').daterangepicker({
      parentEl: '.form-assign-resource',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('#txtEndDateTime').daterangepicker({
      parentEl: '.form-assign-resource',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $container.find('.form-assign-settings .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
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

    $container.find('.form-assign-settings .btn-add').on('click', function(e) {
      $container.find('.form-assign-settings .list-users').removeClass('d-none');
    });

    $container.find('.form-assign-settings .btn-select').on('click', function(e) {
      $('.modal-user-select').modal('show');
    });

    $container.find('.list-group .custom-control-input').on('click', function(e) {
      var $item = $(this).closest('.list-group-item');

      if ($(this).prop('checked')) {
        $item.find('.collapse .custom-control-input').prop('checked', true);
      } else {
        $item.find('.collapse .custom-control-input').prop('checked', false);
      }
      updateAssignButtonsStyle();
    });
  }

  function getBarColor(percentage) {
    if (percentage >= 91) return '#33cc99';
    else if ((percentage >= 75) && (percentage <= 90)) return '#67cc72';
    else if ((percentage >= 60) && (percentage <= 74)) return '#a8cc41';
    else if ((percentage >= 50) && (percentage <= 59)) return '#e3cc15';
    else if ((percentage >= 35) && (percentage <= 49)) return '#f4a000';
    else if ((percentage >= 20) && (percentage <= 34)) return '#e76d00';
    else return '#d93300';
  }

  function showTrackUserProgressModal(srcUrl) {
    $('.modal-user-progress-track').find('iframe').attr('src', srcUrl);
    $('.modal-user-progress-track').modal('show');
  }

  if ($container.hasClass('article-track-lesson')) {
    function drawLessonProgressReport() {
      var data = [
        ['Element', 'Percentage', { role: 'style' }, { role: 'annotation' }],
        ['P1-EA', { v: 40, f: '40%' }, getBarColor(40), '40%'],
        ['P1-HA', { v: 70, f: '70%' }, getBarColor(70), '70%'],
        ['P1-MA', { v: 80, f: '80%' }, getBarColor(80), '50%'],
        ['P1-PA', { v: 100, f: '100%' }, getBarColor(100), '100%'],
        ['P1-SA', { v: 100, f: '100%' }, getBarColor(100), '100%']
      ];
      var dataTable = google.visualization.arrayToDataTable(data);
      var options = {
        fontName: 'Arial',
        fontSize: 13,
        height: ((data.length * 48) + 48),
        chartArea: { top: 48, right: 32, bottom: 48 },
        title: 'Completion Status',
        bar: { groupWidth: '50%' },
        legend: { position: 'none' },
        hAxis: {
          gridlines: { count: 2, color: '#6c757d' },
          minValue: 0,
          maxValue: 100
        }
      };
      
      var element = $('.article-track-lesson .chart .chart-area').get(0);
      inlineChart = new google.visualization.BarChart(element);
      inlineChart.draw(dataTable, options);
    }

    $container.find('.navbar .btn-notify').on('click', function(e) {
      $('.modal-user-notify-confirmation').modal('show');
    });

    $container.find('.table tr .percentage').on('click', function(e) {
      e.preventDefault();
      showTrackUserProgressModal('/shared/track_lesson_user');
    });

    setTimeout(function waitForVisualizationLib() {
      if (google.visualization && google.visualization.arrayToDataTable) {
        drawLessonProgressReport();
        return;
      }
      setTimeout(waitForVisualizationLib, 500);
    }, 500);
  }

  if ($container.hasClass('article-track-lesson-user')) {
    function drawUserLessonProgressReport() {
      var data = [
        ['Resource', 'Status'],
        ['Completed', 60],
        ['Incomplete', 40],
      ];
      var dataTable = google.visualization.arrayToDataTable(data);
      var options = {
        fontName: 'Arial',
        fontSize: 13,
        height: 240,
        pieHole: 0.4,
        chartArea: { top: 56, right: 32, bottom: 28, left: 32 },
        title: 'Percentage Completed',
        legend: { position: 'none' },
        tooltip: { text: 'percentage' },
        slices: {
          0: { color: '#ff9900' },
          1: { color: '#e9ecef' }
        }
      };
      
      var element = $('.article-track-lesson-user .chart .chart-area').get(0);
      inlineChart = new google.visualization.PieChart(element);
      inlineChart.draw(dataTable, options);
    }

    setTimeout(function waitForVisualizationLib() {
      if (google.visualization && google.visualization.arrayToDataTable) {
        drawUserLessonProgressReport();
        return;
      }
      setTimeout(waitForVisualizationLib, 500);
    }, 500);
  }

  function showTrackUserResultModal(srcUrl) {
    $('.modal-user-result-track').find('iframe').attr('src', srcUrl);
    $('.modal-user-result-track').modal('show');
  }

  if ($container.hasClass('article-track-test')) {
    function drawTestSubmissionStatusReport() {
      var data = [
        ['Element', 'Percentage', { role: 'style' }, { role: 'annotation' }],
        ['P1-EA', { v: 40, f: '40%' }, getBarColor(40), '40%'],
        ['P1-HA', { v: 70, f: '70%' }, getBarColor(70), '70%'],
        ['P1-MA', { v: 80, f: '80%' }, getBarColor(80), '80%'],
        ['P1-PA', { v: 100, f: '100%' }, getBarColor(100), '100%'],
        ['P1-SA', { v: 100, f: '100%' }, getBarColor(100), '100%']
      ];
      var dataTable = google.visualization.arrayToDataTable(data);
      var options = {
        fontName: 'Arial',
        fontSize: 13,
        height: ((data.length * 48) + 48),
        chartArea: { top: 48, right: 32, bottom: 48 },
        title: 'Submission Status',
        bar: { groupWidth: '50%' },
        legend: { position: 'none' },
        hAxis: {
          gridlines: { count: 2, color: '#6c757d' },
          minValue: 0,
          maxValue: 100
        }
      };
      
      var element = $('.article-track-test .chart-submission-status .chart-area').get(0);
      inlineChart = new google.visualization.BarChart(element);
      inlineChart.draw(dataTable, options);
    }

    function drawTestStudentPassedReport() {
      var data = [
        ['Element', 'Percentage', { role: 'style' }, { role: 'annotation' }],
        ['P1-EA', { v: 40, f: '40%' }, getBarColor(40), '40%'],
        ['P1-HA', { v: 50, f: '50%' }, getBarColor(50), '50%'],
        ['P1-MA', { v: 60, f: '60%' }, getBarColor(60), '60%'],
        ['P1-PA', { v: 80, f: '80%' }, getBarColor(80), '80%'],
        ['P1-SA', { v: 100, f: '100%' }, getBarColor(100), '100%']
      ];
      var dataTable = google.visualization.arrayToDataTable(data);
      var options = {
        fontName: 'Arial',
        fontSize: 13,
        height: ((data.length * 48) + 48),
        chartArea: { top: 48, right: 32, bottom: 48 },
        title: 'Students Passed',
        bar: { groupWidth: '50%' },
        legend: { position: 'none' },
        hAxis: {
          gridlines: { count: 2, color: '#6c757d' },
          minValue: 0,
          maxValue: 100
        }
      };
      
      var element = $('.article-track-test .chart-students-passed .chart-area').get(0);
      inlineChart = new google.visualization.BarChart(element);
      inlineChart.draw(dataTable, options);
    }

    $container.find('.navbar .btn-notify').on('click', function(e) {
      $('.modal-user-notify-confirmation').modal('show');
    });

    $container.find('.table tr .percentage').on('click', function(e) {
      e.preventDefault();
      showTrackUserResultModal('/shared/track_test_user');
    });

    setTimeout(function waitForVisualizationLib() {
      if (google.visualization && google.visualization.arrayToDataTable) {
        drawTestSubmissionStatusReport();
        drawTestStudentPassedReport();
        return;
      }
      setTimeout(waitForVisualizationLib, 500);
    }, 500);
  }

  if ($container.hasClass('article-track-test-user')) {
    function drawUserTestResultReport() {
      var data = [
        ['Element', 'Percentage', { role: 'style' }],
        ['Media Score', { v: 60, f: '60%' }, getBarColor(60)],
        ['Your Score', { v: 50, f: '50%' }, getBarColor(50)],
        ['Top Score', { v: 100, f: '100%' }, getBarColor(100)]
      ];
      var dataTable = google.visualization.arrayToDataTable(data);
      var options = {
        fontName: 'Arial',
        fontSize: 13,
        height: 240,
        chartArea: { top: 56, right: 32, bottom: 56, left: 64 },
        title: 'Score Obtained',
        bar: { groupWidth: '40%' },
        legend: { position: 'none' },
        vAxis: {
          gridlines: { count: 2, color: '#6c757d' },
          minValue: 0,
          maxValue: 100
        }
      };
      
      var element = $('.article-track-test-user .chart .chart-area').get(0);
      inlineChart = new google.visualization.ColumnChart(element);
      inlineChart.draw(dataTable, options);
    }

    setTimeout(function waitForVisualizationLib() {
      if (google.visualization && google.visualization.arrayToDataTable) {
        drawUserTestResultReport();
        return;
      }
      setTimeout(waitForVisualizationLib, 500);
    }, 500);
  }

  $(window).on('resize', function(e) {
    if ($(window).width() > 992) {
      if ($container.find('.nav-main').hasClass('d-block')) {
        $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
        $container.find('.nav-main').removeClass('d-block');
      }
    }
  });

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function() {
    // TO DO
  });
});
