$(document).ready(function() {
  var $container = $('.article-announcements');

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

  $container.find('.article-body .navbar .btn-create').on('click', function(e) {
    $('.article-announcements').addClass('d-none');
    $('.article-create-announcement').removeClass('d-none');
    $('.app-container').scrollTop(0);

    tinymce.init({
      selector: '#txtMessage',
      height: 240,
      menubar: false,
      statusbar: false,
      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
    });

    $('#txtPeriod').daterangepicker({
      minYear: 2019,
      maxYear: 2019
    });

    $('.article-create-announcement .form-announcement .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
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

    $('.article-create-announcement .form-announcement .btn-add').on('click', function(e) {
      $('.article-create-announcement .form-announcement .list-users').removeClass('d-none');
    });

    $('.article-create-announcement .form-announcement .btn-select').on('click', function(e) {
      $('.modal-user-select').modal('show');
    });
  });

  $('.article-create-form-class .form-form-class .btn-create').on('click', function(e) {
    $('.article-create-announcement').addClass('d-none');
    $('.article-announcements').removeClass('d-none');
    $('.app-container').scrollTop(0);
  });
});
