$(document).ready(function() {
  var $container = $('.article-resources');
  var dropzone;

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

  function updateActionButtonsStyles() {
    var resourcesSelected = $container.find('.card-group').hasClass('d-none') 
      ? ($container.find('.table-body .table-active').length > 0)
      : ($container.find('.card-group .card-active').length > 0);

    if (resourcesSelected) {
      if ($container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').removeClass('d-none');
      }

      if ($container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').removeClass('d-none');
      }

      if ($container.find('.btn-download').hasClass('d-none')) {
        $container.find('.btn-download').removeClass('d-none');
      }

      if ($container.find('.btn-more').hasClass('d-none')) {
        $container.find('.btn-more').removeClass('d-none');
      }

      if ($container.find('.divider-search').hasClass('d-none')) {
        $container.find('.divider-search').removeClass('d-none');
      }
    } else {
      if (!$container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').addClass('d-none');
      }

      if (!$container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').addClass('d-none');
      }

      if (!$container.find('.btn-download').hasClass('d-none')) {
        $container.find('.btn-download').addClass('d-none');
      }

      if (!$container.find('.btn-more').hasClass('d-none')) {
        $container.find('.btn-more').addClass('d-none');
      }

      if (!$container.find('.divider-search').hasClass('d-none')) {
        $container.find('.divider-search').addClass('d-none');
      }
    }
  }

  function searchLessons(e) {
    var search = $container.find('.nav-main .input-group .aa-input').val();
    if (search === '') return;

    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .empty-state').addClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .navbar-expand .breadcrumb').addClass('d-none');
      $container.find('.article-body .navbar-expand .navbar-nav').addClass('d-none');
      $container.find('.article-body .navbar-expand .navbar-text').removeClass('d-none');
      $container.find('.article-body .navbar').removeClass('d-none');
      $container.find('.nav-item-result .item-text').text(search);

      if (search === 'empty') {
        $container.find('.article-body .empty-state').removeClass('d-none');
      } else {
        $container.find('.article-body .table-head').removeClass('d-none');
        $container.find('.article-body .table-body').removeClass('d-none');
        $container.find('.table').removeClass('table-shared-with-me');
        $container.find('.table').removeClass('table-resource-bank');
        $container.find('.table').addClass('table-search-results');
      }
      
      var searchTitle = 'Search results for "'+ search + '"';
      $container.find('.article-body .navbar .navbar-text').html(searchTitle);
    }, 1000);
  }

  function showCancelUploadConfirmationModal(confirmCallback) {
    $('.modal-file-cancel-upload-confirmation .btn-primary').on('click', function(e) {
      $('.modal-file-cancel-upload-confirmation').modal('hide');
      if (confirmCallback) confirmCallback.apply(null, arguments);
    });
    $('.modal-file-cancel-upload-confirmation').modal('show');
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
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
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
    log.info("MY_RESOURCES", "SEARCH", { grade: 1, level: 1 });
  });

  $container.find('.navbar-nav .btn-edit').on('click', function(e) {
    if ($container.find('.table-body .table-active').find('.fa-folder').length === 1) {
      var readonly = $('.modal-resource-folder-edit .form-input').prop('readonly');
      $('.modal-resource-folder-edit .form-input').prop('readonly', !readonly);
      $('.modal-resource-folder-edit .text-muted').toggleClass('d-none');
      $('.modal-resource-folder-edit .btn').toggleClass('d-none');
      $('.modal-resource-folder-edit').modal('show');
    } else {
      $('.modal-resource-file-edit-attributes .btn-primary').on('click', function(e) {        
        $('.modal-resource-file-edit-attributes button').prop('disabled', true);
        window.Utils.showProcessingOverlay();
  
        setTimeout(function waitProcessing() {          
          $('.modal-resource-file-edit-attributes button').prop('disabled', false);
          window.Utils.hideProcessingOverlay();
        }, 3000);
      });
      $('.modal-resource-file-edit-attributes').modal('show');
    }
  });

  $container.find('.navbar-nav .btn-share').on('click', function(e) {
    $('.modal-resource-share').modal('show');
  });

  $container.find('.dropdown-menu .item-new-folder').on('click', function(e) {
    $('.modal-resource-folder-create').modal('show');
  });

  $container.find('.dropdown-menu .item-upload-file').on('click', function(e) {
    var $upload = $('.modal-resource-resource-add .file-upload');
    destroyDropZone();

    dropzone = new Dropzone($upload.get(0), {
      previewsContainer: $upload.find('.file-group').get(0),
      previewTemplate: $('#previewEdit').html(),
      clickable: $upload.find('.btn-upload').get(0),
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
      },
      uploadprogress: function(file, progress) {
        if ((progress === 100) || window._progressTimeout) return;
        if (!window._pageDirty) window._pageDirty = true;
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
      },
      complete: function(file) {
        var $progress = $(file.previewElement).find('.file-progress');
        if (!$progress.hasClass('d-none')) $progress.addClass('d-none');

        window._pageDirty = false;
      }
    });

    $('.modal-resource-resource-add .file-upload').on('click', '.btn-edit', function(e) {
      $('.modal-resource-file-edit-attributes').modal('show');
    });
    $('.modal-resource-resource-add .file-upload').on('click', '.btn-delete', function(e) {
      var $file = $(this).closest('.file-preview');
      var uuid = $file.find('.file-uuid').val();

      if ($file.hasClass('file-preview-error')) {
        removeDropZoneFile(uuid);
        return;
      }

      $('.modal-file-remove-confirmation .btn-primary').on('click', function(e) {
        $('.modal-file-remove-confirmation').modal('hide');
        removeDropZoneFile(uuid);
      });
      $('.modal-file-remove-confirmation').modal('show');
    });

    $('.modal-resource-resource-add').on('keydown', function(e) {
      if ((e.which == 27) && window._pageDirty) {
        e.which = Number.NaN;
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-resource-add').modal('hide');
          removeAllDropZoneFiles();
        });
      }
    });

    $('.modal-resource-resource-add .btn-close').on('click', function(e) {
      if (window._pageDirty) {
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-resource-add').modal('hide');
          removeAllDropZoneFiles();
        });
      } else {
        removeAllDropZoneFiles();
      }
    });
    $('.modal-resource-resource-add').modal('show');
  });

  $container.find('.dropdown-menu .item-edit').on('click', function(e) {
    $('.modal-resource-file-edit-attributes').modal('show');
  });

  $container.find('.dropdown-menu .item-delete').on('click', function(e) {
    $('.modal-resource-delete-confirmation').modal('show');
  });

  $container.find('.dropdown-menu .item-manage-revisions').on('click', function(e) {
    var $upload = $('.modal-resource-manage-revisions .file-upload');
    destroyDropZone();

    dropzone = new Dropzone($upload.find('.file-dropzone').get(0), {
      previewsContainer: $upload.find('.file-group').get(0),
      previewTemplate: $('#preview').html(),
      clickable: $upload.find('.btn-upload').get(0),
      url: "/shared/upload",
      chunking: true,
      chunkSize: 500,
      retryChunks: true,
      retryChunksLimit: 3,
      parallelUploads: 1,
      maxFiles: 1,
      maxFilesize: .25,
      addedfile: function(file) {
        var maxFiles = dropzone.options.maxFiles;

        if (dropzone.files.length > maxFiles) {
          //dropzone.removeFile(dropzone.files[0]);

          if ($('.toast-stack').hasClass('d-none')) {
            clearTimeout(window.toastTimeout);
            delete window.toastTimeout;
            
            $('.toast-stack').removeClass('d-none');
            $('.toast-stack .toast').toast('dispose').toast('show');
      
            window.toastTimeout = setTimeout(function() {
              $('.toast-stack').addClass('d-none');
            }, 5000);
          }

          return;
        }

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

        if (!$upload.find('.file-upload-control').hasClass('d-none')) {
          $upload.find('.file-upload-control').addClass('d-none');
        }

        if ($upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').removeClass('d-none');
        }
      },
      removedfile: function(file) {
        if (dropzone.files && (dropzone.files.length > 0)) {
          $(file.previewElement).remove();
          return;
        }

        if ($upload.find('.file-upload-control').hasClass('d-none')) {
          $upload.find('.file-upload-control').removeClass('d-none');
        }
        
        if (!$upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').addClass('d-none');
        }

        $upload.find('.file-group').empty();
      },
      processing: function(file) {
        window._pageDirty = true;
      },
      uploadprogress: function(file, progress) {
        if ((progress === 100) || window._progressTimeout) return;
        if (!window._pageDirty) window._pageDirty = true;
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
      success: function(file) {console.log('success');
        var $message = $(file.previewElement).find('.file-message');
        var success = 'File uploaded successfully.';
        success = '<i class="fas fa-check"></i> ' + success;
        $message.find('.text-success').html(success);

        if ($upload.find('.file-upload-control').hasClass('d-none')) {
          $upload.find('.file-upload-control').removeClass('d-none');
        }

        if (!$upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').addClass('d-none');
        }

        removeAllDropZoneFiles();
      },
      complete: function(file) {
        var $progress = $(file.previewElement).find('.file-progress');
        if (!$progress.hasClass('d-none')) $progress.addClass('d-none');

        window._pageDirty = false;
      }
    });

    $('.modal-resource-manage-revisions .file-upload').on('click', '.btn-delete', function(e) {
      var $file = $(this).closest('.file-preview');

      if ($file.hasClass('file-preview-error')) {
        removeAllDropZoneFiles();
        return;
      }

      $('.modal-file-remove-confirmation .btn-primary').on('click', function(e) {
        $('.modal-file-remove-confirmation').modal('hide');
        removeAllDropZoneFiles();
      });
      $('.modal-file-remove-confirmation').modal('show');
    });

    $('.modal-resource-manage-revisions .list-group-item').on('click', '.btn-delete', function(e) {
      $('.modal-resource-delete-confirmation').modal('show');
    });
    $('.modal-resource-manage-revisions').on('keydown', function(e) {
      if (e.which == 27) {
        if (window._pageDirty) {
          e.which = Number.NaN;
          e.stopPropagation();
          showCancelUploadConfirmationModal(function() {
            $('.modal-resource-manage-revisions').modal('hide');
            removeAllDropZoneFiles();
            dropzone.destroy();
          });
        } else {
          dropzone.destroy();
        }
      }
    });
    $('.modal-resource-manage-revisions .btn-close').on('click', function(e) {
      if (window._pageDirty) {
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-manage-revisions').modal('hide');
          removeAllDropZoneFiles();
          dropzone.destroy();
        });
      } else {
        dropzone.destroy();
      }
    });
    $('.modal-resource-manage-revisions').modal('show');
  });

  $container.find('.dropdown-menu .item-move-to').on('click', function(e) {
    $('.modal-resource-move-to').modal('show');
  });

  $container.find('.dropdown-menu .item-import-to').on('click', function(e) {
    $('.modal-resource-import-to').modal('show');
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

  $container.find('.tree-resources .resource a').on('click', function(e) {
    $container.find('.table').removeClass('table-shared-with-me');
    $container.find('.table').removeClass('table-resource-bank');
    $container.find('.table').removeClass('table-search-results');

    if ($(this).attr('title') === 'Shared with Me') {
      $container.find('.table').addClass('table-shared-with-me');
    } else if ($(this).attr('title') === 'Resource Bank') {
      $container.find('.table').addClass('table-resource-bank');
    }
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
    if ($(this).hasClass('table-active')) {
      $(this).removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', false);
    } else {
      $(this).addClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
    }
    updateActionButtonsStyles();
  });

  $container.find('.table-body tr a').on('click', function(e) {
    var pdfPreview = '<iframe class="full" src="/viewers/pdf_viewer?file=/static/pdfs/teachers-portal-user-guide.pdf" frameborder="0" allowfullscreen></iframe>';
    var noPreview = '<p class="font-italic">Hmm... looks like this file doesn\'t have a preview that we can show you.</p>';
    $('.modal-resource-preview .modal-body .content').html(Math.round(Math.random()) ? pdfPreview : noPreview);
    $('.modal-resource-preview').modal('show');
  });

  $container.find('.table-body tr .btn').on('click', function(e) {
    var $model = $('.modal-resource-details');
    var $row = $(this).closest('tr');
    $model.find('.modal-title').text($row.find('td:nth-child(2)').text());
    $model.find('.attribute:nth-child(1) .attribute-value')
      .text($row.find('td:nth-child(3)').text());
    $model.find('.attribute:nth-child(2) .attribute-value')
      .text($row.find('td:nth-child(4)').text());
    $model.find('.attribute:nth-child(3) .attribute-value')
      .text($row.find('td:nth-child(5)').text());
    $model.find('.attribute:nth-child(4) .attribute-value')
      .text($row.find('td:nth-child(6)').text());
    $('.modal-resource-details').modal('show');
  });


  $container.find('.card-group .card .custom-control-input').on('click', function(e) {
    var $card = $(this).closest('.card');
        
    if ($card.hasClass('card-active')) {
      $card.removeClass('card-active');
    } else {
      $card.addClass('card-active');
    }
    updateActionButtonsStyles();
  });

  $container.find('.card-group .card').on('click', function(e) {
    if ($(e.target).is('a')) return;
    if ($(e.target).closest('a') > 0) return;
    if ($(e.target).hasClass('.badge')) return;
    if ($(e.target).closest('.badge').length > 0) return;
    if ($(e.target).hasClass('.custom-control')) return;
    if ($(e.target).closest('.custom-control').length > 0) return;
    if ($(this).hasClass('card-active')) {
      $(this).removeClass('card-active');
      $(this).find('.custom-control-input').prop('checked', false);
    } else {
      $(this).addClass('card-active');
      $(this).find('.custom-control-input').prop('checked', true);
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
        { id: 1, name: 'Aaron Tan' }, 
        { id: 2, name: 'Arya Suman' },
        { id: 3, name: 'Ashar Ahmad' }, 
        { id: 4, name: 'Chua Chin Hui' },
        { id: 5, name: 'Derrick Lee' }
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
  }])
  .on('autocomplete:selected', function(event, suggestion) {
    log.info(suggestion);
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
