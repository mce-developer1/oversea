$(document).ready(function() {
  var $container = $('.article-student-incidents');
  if ($container.length === 0) $container = $('.article-incidents-report');
  if ($container.length === 0) $container = $('.article-incident-categories');
  if ($container.length === 0) $container = $('.article-notification-rules');

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
    var visitorSelected = ($container.find('.table tr input[type="radio"]:checked').length > 0);

    if (visitorSelected) {
      if ($container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').removeClass('d-none');
      }

      if ($container.find('.btn-delete').hasClass('d-none')) {
        $container.find('.btn-delete').removeClass('d-none');
      }
    } else {
      if (!$container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').addClass('d-none');
      }

      if (!$container.find('.btn-delete').hasClass('d-none')) {
        $container.find('.btn-delete').addClass('d-none');
      }
    }
  }

  if ($container.hasClass('article-student-incidents')) {
    $container.find('.navbar-nav:not(.nav-main) .btn-search').on('click', function(e) {
      $container.find('.navbar-nav:not(.nav-main)').addClass('d-none');
      $container.find('.nav-main').addClass('d-block');
    });

    $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
      $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
      $container.find('.nav-main').removeClass('d-block');
    });

    var dataTable = $container.find('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          ordering: false,
          width: 24,
          targets: 0
        },
        {
          width: 160,
          targets: 1
        },
        {
          width: 160,
          targets: 3
        },
        {
          ordering: false,
          width: 140,
          targets: 4
        },
        {
          width: 140,
          targets: 5
        },
        {
          width: 160,
          targets: 6
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.table tr input[type="radio"]').on('change', function(e) {
      var $row = $(this).closest('tr');
      $container.find('.table tr').removeClass('table-active');
      $row.addClass('table-active');
      updateActionButtonsStyles();
    });

    $container.find('.table tr').on('click', function(e) {
      if ($(e.target).hasClass('.custom-control')) return;
      if ($(e.target).closest('.custom-control').length > 0) return;
      $container.find('.table tr .custom-control-input').prop('checked', false);
      $container.find('.table tr').removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
      $(this).addClass('table-active');
      updateActionButtonsStyles();
    });

    $('#txtDateTime0').daterangepicker({
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('#txtDateTime1').daterangepicker({
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      var $upload = $('.modal-student-incident-create .file-upload');
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
        maxFiles: 5,
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
        success: function(file) {console.log('success');
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

      $('.modal-student-incident-create .file-upload').on('click', '.btn-delete', function(e) {
        var $file = $(this).closest('.file-preview');

        if ($file.hasClass('file-preview-error')) {
          removeAllDropZoneFiles();
          return;
        }

        $('.modal-student-incident-create .btn-primary').on('click', function(e) {
          $('.modal-file-remove-confirmation').modal('hide');
          removeAllDropZoneFiles();
        });
        $('.modal-file-remove-confirmation').modal('show');
      });

      $('.modal-student-incident-create').on('keydown', function(e) {
        if (e.which == 27) {
          if (window._pageDirty) {
            e.which = Number.NaN;
            e.stopPropagation();
            showCancelUploadConfirmationModal(function() {
              $('.modal-student-incident-create').modal('hide');
              removeAllDropZoneFiles();
              dropzone.destroy();
            });
          } else {
            dropzone.destroy();
          }
        }
      });
      $('.modal-student-incident-create .btn-close').on('click', function(e) {
        if (window._pageDirty) {
          e.stopPropagation();
          showCancelUploadConfirmationModal(function() {
            $('.modal-student-incident-create').modal('hide');
            removeAllDropZoneFiles();
            dropzone.destroy();
          });
        } else {
          dropzone.destroy();
        }
      });
      $('.modal-student-incident-create').modal('show');
    });

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-student-incident-edit').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-student-incident-delete-confirmation').modal('show');
    });
  }

  if ($container.hasClass('article-incident-categories')) {
    var dataTable = $container.find('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          ordering: false,
          width: 24,
          targets: 0
        },
        {
          width: 180,
          targets: 1
        },
        {
          width: 140,
          targets: 2
        },
        {
          ordering: false,
          targets: 3
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.table tr input[type="radio"]').on('change', function(e) {
      var $row = $(this).closest('tr');
      $container.find('.table tr').removeClass('table-active');
      $row.addClass('table-active');
      updateActionButtonsStyles();
    });

    $container.find('.table tr').on('click', function(e) {
      if ($(e.target).hasClass('.custom-control')) return;
      if ($(e.target).closest('.custom-control').length > 0) return;
      $container.find('.table tr .custom-control-input').prop('checked', false);
      $container.find('.table tr').removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
      $(this).addClass('table-active');
      updateActionButtonsStyles();
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.modal-category-create').modal('show');
    });

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-category-edit').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-category-delete-confirmation').modal('show');
    });
  }

  if ($container.hasClass('article-notification-rules')) {
    var dataTable = $container.find('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          ordering: false,
          width: 24,
          targets: 0
        },
        {
          width: 180,
          targets: 1
        },
        {
          width: 140,
          targets: 2
        },
        {
          ordering: false,
          targets: 3
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.table tr input[type="radio"]').on('change', function(e) {
      var $row = $(this).closest('tr');
      $container.find('.table tr').removeClass('table-active');
      $row.addClass('table-active');
      updateActionButtonsStyles();
    });

    $container.find('.table tr').on('click', function(e) {
      if ($(e.target).hasClass('.custom-control')) return;
      if ($(e.target).closest('.custom-control').length > 0) return;
      $container.find('.table tr .custom-control-input').prop('checked', false);
      $container.find('.table tr').removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
      $(this).addClass('table-active');
      updateActionButtonsStyles();
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.modal-notification-rule-create').modal('show');
    });

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-notification-rule-edit').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-notification-rule-delete-confirmation').modal('show');
    });
  }
});
