$(document).ready(function() {
  var $container = $('.article-resources');
  var dropzone;

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
      $container.find('.article-body .empty-state').removeClass('d-none');
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
      $('.modal-resource-folder-edit').modal('show');
    } else {
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
    var $upload = $('.modal-resource-file-upload .file-upload');
    destroyDropZone();

    dropzone = new Dropzone($upload.get(0), {
      previewsContainer: $upload.find('.file-group').get(0),
      previewTemplate: $('#previewEdit').html(),
      clickable: $upload.find('.btn-upload').get(0),
      url: "/shared/upload",
      uploadMultiple: false,
      parallelUploads: 1,
      maxFiles: 5,
      maxfilesreached: function(files) {
        var maxFiles = dropzone.options.maxFiles;
        
        if (files.length > maxFiles) {
          for (var i = maxFiles; i < files.length; i++) {
            dropzone.removeFile(files[i]);
          }
        }

        if ($('.toast-stack').hasClass('d-none')) {
          clearTimeout(window.toastTimeout);
          delete window.toastTimeout;
          
          $('.toast-stack').removeClass('d-none');
          $('.toast-stack .toast').toast('dispose').toast('show');
    
          window.toastTimeout = setTimeout(function() {
            $('.toast-stack').addClass('d-none');
          }, 5000);
        }
      },
      processing: function(file) {
        if ($upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').removeClass('d-none');
        }
      },
      success: function(file) {
        console.log(file);
      }
    });

    $('.modal-resource-file-upload').on('click', '.btn-edit', function(e) {
      $('.modal-resource-file-edit-attributes').modal('show');
    });
    $('.modal-resource-file-upload').modal('show');
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

    dropzone = new Dropzone($upload.get(0), {
      previewsContainer: $upload.find('.file-group').get(0),
      previewTemplate: $('#preview').html(),
      clickable: $upload.find('.btn-upload').get(0),
      url: "/shared/upload",
      uploadMultiple: false,
      parallelUploads: 1,
      maxFiles: 1,
      maxfilesreached: function(files) {
        var maxFiles = dropzone.options.maxFiles;
        
        if (files.length > maxFiles) {
          for (var i = maxFiles; i < files.length; i++) {
            dropzone.removeFile(files[i]);
          }
        }

        if ($('.toast-stack').hasClass('d-none')) {
          clearTimeout(window.toastTimeout);
          delete window.toastTimeout;
          
          $('.toast-stack').removeClass('d-none');
          $('.toast-stack .toast').toast('dispose').toast('show');
    
          window.toastTimeout = setTimeout(function() {
            $('.toast-stack').addClass('d-none');
          }, 5000);
        }
      },
      processing: function(file) {
        if ($upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').removeClass('d-none');
        }
      },
      success: function(file) {
        if (!$upload.find('.file-group').hasClass('d-none')) {
          $upload.find('.file-group').addClass('d-none');
        }
        clearDropZoneFiles();
      }
    });

    $('.modal-resource-manage-revisions .list-group-item .btn-delete').on('click', function(e) {
      $('.modal-resource-delete-confirmation').modal('show');
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

  $container.find('.table-body tr a').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var pdfPreview = '<iframe class="full" src="/viewers/pdf_viewer?file=/static/pdfs/teachers-portal-user-guide.pdf" frameborder="0" allowfullscreen></iframe>';
    var noPreview = '<p class="font-italic">Hmm... looks like this file doesn\'t have a preview that we can show you.</p>';
    $('.modal-resource-preview .modal-body .content').html(Math.round(Math.random()) ? pdfPreview : noPreview);
    $('.modal-resource-preview').modal('show');
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
    $model.find('.attribute:nth-child(3) .attribute-value')
      .text($row.find('td:nth-child(5)').text());
    $model.find('.attribute:nth-child(4) .attribute-value')
      .text($row.find('td:nth-child(6)').text());
    $('.modal-resource-details').modal('show');
  });

  $container.find('.card-group .card').on('click', function(e) {
    if (e.shiftKey) {
      e.preventDefault();

      if ($(this).parent().find('.card-active-first').length > 0) {
        $(this).parent().find(':not(.card-active-first)').removeClass('card-active');
        if ($(this).siblings('.card-active-first').index() < $(this).index()) {
          var $nextSibling = $(this).siblings('.card-active-first').next();
          while (($nextSibling.index() > -1) && ($nextSibling.index() <= $(this).index())) {
            $nextSibling.addClass('card-active');
            $nextSibling = $nextSibling.next();
          };
        } else {
          var $prevSibling = $(this).siblings('.card-active-first').prev();
          while ($prevSibling.index() >= $(this).index()) {
            $prevSibling.addClass('card-active');
            $prevSibling = $prevSibling.prev();
          };
        }
        updateActionButtonsStyles();
        return;
      }
    }

    if ($(this).siblings('.card-active').length > 0) {
      $(this).siblings('.card-active').removeClass('card-active');
      $(this).siblings('.card-active-first').removeClass('card-active-first');

      if ($(this).hasClass('card-active')) {      
        if (!$(this).hasClass('card-active-first')) {
          $(this).addClass('card-active-first');
        }
      } else {
        $(this).addClass('card-active');
        $(this).addClass('card-active-first');
      }
    } else {
      $(this).siblings('.card-active').removeClass('card-active');
      $(this).siblings('.card-active-first').removeClass('card-active-first');

      if ($(this).hasClass('card-active')) {      
        $(this).removeClass('card-active');
        $(this).removeClass('card-active-first');
      } else {
        $(this).addClass('card-active');
        $(this).addClass('card-active-first');
      }
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
