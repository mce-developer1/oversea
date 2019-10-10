$(document).ready(function() {
  var $container = $('.article-announcements');
  var editor;

  function updateActionButtonsStyles() {
    var announcementsSelected = ($container.find('.table-body .table-active').length > 0);

    if (announcementsSelected) {
      if ($container.find('.table-body .table-active').length === 1) {
        if ($container.find('.btn-edit').hasClass('d-none')) {
          $container.find('.btn-edit').removeClass('d-none');
        }
      } else {
        if (!$container.find('.btn-edit').hasClass('d-none')) {
          $container.find('.btn-edit').addClass('d-none');
        }
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

  function initAnnouncementForm() {
    $('.article-create-announcement .form-announcement .form-textarea').each(function(index, textarea) {
      window.Utils.initTextEditor(textarea);
    });

    $('#txtPeriod').daterangepicker({
      parentEl: '.article-create-announcement',
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY',
        separator: ' - '
      }
    });

    $('.article-create-announcement .form-announcement .input-autocomplete').autocomplete({ hint: true, debug: false, autoselect: true }, [{
      displayKey: 'name',
      source: function(query, callback) {
        var records = [
          { id: 1, name: 'Aaron Tan' }, 
          { id: 2, name: 'Arya Suman' },
          { id: 3, name: 'Ashar Ahmad' }, 
          { id: 4, name: 'Chua Chin Hui' },
          { id: 5, name: 'Derrick Lee' }

          ,{ id: 1, name: 'Aaron Tan' }, 
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
  }

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
    $('.modal-announcement-view .modal-title').text('Lorem ipsum');
    $('.modal-announcement-view .announcement').toggleClass('d-none');
    $('.modal-announcement-view .btn-next').addClass('d-none');
    $('.modal-announcement-view .btn-previous').addClass('d-none');
    $('.modal-announcement-view .btn-close').removeClass('d-none');
    $('.modal-announcement-view .navbar-pagination').remove();
    $('.modal-announcement-view .announcement-actions').remove();
    $('.modal-announcement-view').modal('show');
  });

  $container.find('.article-body .navbar .btn-create').on('click', function(e) {
    $('.article-announcements').addClass('d-none');
    $('.article-create-announcement').removeClass('d-none');
    $('.app-container').scrollTop(0);

    $('.article-create-announcement .form-announcement .btn-add').on('click', function(e) {
      $('.article-create-announcement .form-announcement .list-users').removeClass('d-none');
    });

    $('.article-create-announcement .form-announcement .btn-select').on('click', function(e) {
      $('.modal-user-select').modal('show');
    });
  });

  $('.article-create-announcement .form-announcement .btn-create').on('click', function(e) {
    $('.article-create-announcement').addClass('d-none');
    $('.article-announcements').removeClass('d-none');
    $('.app-container').scrollTop(0);
  });

  initAnnouncementForm();
});
