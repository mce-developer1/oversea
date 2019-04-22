$(document).ready(function() {
  var $container = $('.article-update-profile-picture');
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

  function initProfilePictureForm() {
    var $upload = $container.find('.form-profile-picture .file-upload');
    destroyDropZone();

    dropzone = new Dropzone($upload.get(0), {
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
      maxfilesreached: function(files) {
        var maxFiles = dropzone.options.maxFiles;

        if (files.length > maxFiles) {
          for (var i = maxFiles; i < files.length; i++) {
            dropzone.removeFile(files[i]);
          }
        }
      },
      addedfile: function(file) {
        var maxFiles = dropzone.options.maxFiles;

        if (dropzone.files.length > maxFiles) {
          dropzone.removeFile(dropzone.files[0]);
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

        if (!$upload.hasClass('file-upload-button')) {
          $upload.addClass('file-upload-button');
        }

        if (!$upload.find('.file-upload-control').hasClass('d-none')) {
          $upload.find('.file-upload-control').addClass('d-none');
        }
        
        if ($upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').removeClass('d-none');
        }

        if (!$container.find('.form-profile-picture .image-cropper').hasClass('d-none')) {
          $container.find('.form-profile-picture .image-cropper').addClass('d-none');
        }

        if (!$container.find('.form-profile-picture .form-group-actions').hasClass('d-none')) {
          $container.find('.form-profile-picture .form-group-actions').addClass('d-none');
        }
      },
      removedfile: function(file) {
        if (dropzone.files && (dropzone.files.length > 0)) {
          $(file.previewElement).remove();
          return;
        }

        if ($upload.hasClass('file-upload-button')) {
          $upload.removeClass('file-upload-button');
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
      success: function(file) {
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

        $container.find('.form-profile-picture .image-cropper').removeClass('d-none');
        $container.find('.form-profile-picture .form-group-actions').removeClass('d-none');
        initProfilePictureCropper();
      },
      complete: function(file) {
        var $progress = $(file.previewElement).find('.file-progress');
        if (!$progress.hasClass('d-none')) $progress.addClass('d-none');

        window._pageDirty = false;
      }
    });

    $('.form-profile-picture .file-upload').on('click', '.btn-delete', function(e) {
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
  }

  function initProfilePictureCropper() {
    var $image = $container.find('.form-profile-picture .image-cropper img');
    const cropper = new Cropper($image.get(0), {
      aspectRatio: 1 / 1,
      crop: function(e) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      }
    });
  }

  if ($container.length > 0) {
    initProfilePictureForm();
  }
});
