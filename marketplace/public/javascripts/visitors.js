$(document).ready(function() {
  var visitors = [
    { id: 1, name: 'Aaron Tan', ident: 'A98765432Z', mobile: '98765432', category: 'Parents' }, 
    { id: 2, name: 'Arya Suman', ident: 'A96543219Z', mobile: '96543219', category: 'Parents' },
    { id: 3, name: 'Ashar Ahmad', ident: 'A97654321Z', mobile: '97654321', category: 'Delivery' }, 
    { id: 4, name: 'Chua Chin Hui', ident: 'A95432198Z', mobile: '95432198', category: 'Delivery' },
    { id: 5, name: 'Derrick Lee', ident: 'A94321987Z', mobile: '94321987', category: 'Contractor' },
    { id: 6, name: 'Nurulhuda bte Sazali', ident: 'A93219876Z', mobile: '93219876', category: 'Contractor' },
    { id: 7, name: 'Siow Poh Piah Irene', ident: 'A92198765Z', mobile: '92198765', category: 'Ministry Staff' },
    { id: 8, name: 'Tan Boon Huat', ident: 'A91987654Z', mobile: '91987654', category: 'Ministry Staff' }
  ];
  var $container = $('.article-current-visitors');
  if ($container.length === 0) $container = $('.article-school-visitors');
  if ($container.length === 0) $container = $('.article-visitors-report');
  if ($container.length === 0) $container = $('.article-visitor-categories');
  if ($container.length === 0) $container = $('.article-notification-rules');

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

  if ($container.hasClass('article-current-visitors')) {
    $container.find('.nav-main .input-group .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
      displayKey: 'name',
      source: function(query, callback) {
        var pattern = new RegExp(query, 'i');
        var hits = visitors.filter(function(record) {
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

    $('#txtDateTimeIn').daterangepicker({
      parentEl: '.dialog-menu-search',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('#txtDateTimeOut').daterangepicker({
      parentEl: '.dialog-menu-search',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

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
          width: 100,
          targets: 1
        },
        {
          width: 140,
          targets: 2
        },
        {
          width: 100,
          targets: 3
        },
        {
          width: 150,
          targets: 4
        },
        {
          width: 150,
          targets: 5
        },
        {
          orderable: false,
          width: 80,
          targets: 6
        }
      ],
      dom: 'rt<"bottom">',
      order: [[4, 'desc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $('.modal-visitor-checkin .form-checkin-visitor .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
      displayKey: 'name',
      source: function(query, callback) {
        var pattern = new RegExp(query, 'i');
        var hits = visitors.filter(function(record) {
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
      $('#txtIdentification').attr('readonly', true);
      $('#selCategory').attr('disabled', true);
      $('#txtCompany').attr('readonly', true);
      $('#txtMobile').attr('readonly', true);

      if (suggestion && suggestion.name) {
        $('#txtIdentification').val(suggestion.ident);
        $('#selCategory').selectpicker('val', suggestion.category);
        $('#txtCompany').val(suggestion.company);
        $('#txtMobile').val(suggestion.mobile);
      } else {
        $('#txtIdentification').val('');
        $('#selCategory').selectpicker('val', 'Contractors');
        $('#txtCompany').val('');
        $('#txtMobile').val('');
      }
    });

    $('.modal-visitor-checkin .form-checkin-visitor .input-autocomplete').on('change', function(e) {
      var name = $(this).val();
      var result = visitors.filter(function(record) {
        return (record.name === name);
      });

      if (name === 'Arya Suman') {
        $('.modal-visitor-checkin .text-danger').removeClass('d-none');
      } else {
        $('.modal-visitor-checkin .text-danger').addClass('d-none');
      }

      if (result.length === 0) {
        $('#txtIdentification').removeAttr('readonly').val('');
        $('#selCategory').removeAttr('disabled')
          .selectpicker('val', 'Contractors');
        $('#selCategory').selectpicker('refresh');
        $('#txtCompany').removeAttr('readonly').val('');
        $('#txtMobile').removeAttr('readonly').val('');
      } else {
        $('#txtIdentification').attr('readonly', true)
          .val(result[0].ident);
        $('#selCategory').attr('disabled', true)
          .selectpicker('val', result[0].category);
        $('#selCategory').selectpicker('refresh');
        $('#txtCompany').attr('readonly', true)
          .val(result[0].company);
        $('#txtMobile').attr('readonly', true)
          .val(result[0].mobile);;
      }
    });

    $('#selCategory').on('changed.bs.select', function (e) {
      if ($('#selCategory').selectpicker('val') === 'Parents') {
        $('.modal-visitor-checkin .form-checkin-visitor .form-group-child').removeClass('d-none');
      } else {
        $('.modal-visitor-checkin .form-checkin-visitor .form-group-child').addClass('d-none');
      }
    });

    $('#txtTimeIn').daterangepicker({
      drops: 'up',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('.modal-visitor-checkin .form-checkin-visitor .btn-remove').on('click', function(e) {
      $('.modal-visitor-checkin .form-checkin-visitor .bubble-student').addClass('d-none');
      $('.modal-visitor-checkin .form-checkin-visitor .btn-select').removeClass('d-none');
    });

    $('.modal-visitor-checkin .form-checkin-visitor .btn-select').on('click', function(e) {
      $('.modal-user-select .btn-primary').on('click', function(e) {
        $('.modal-visitor-checkin .form-checkin-visitor .btn-select').addClass('d-none');
        $('.modal-visitor-checkin .form-checkin-visitor .bubble-student').removeClass('d-none');
        $('.modal-user-select').modal('hide');
      });
      $('.modal-user-select').modal('show');
    });

    $('#txtTimeOut').daterangepicker({
      drops: 'up',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $container.find('.article-body .navbar .btn-checkin').on('click', function(e) {
      $('.modal-visitor-checkin').on('shown.bs.modal', function(e) {
        $('.modal-visitor-checkin .input-autocomplete').autocomplete('val', '');
        $('.modal-visitor-checkin .input-autocomplete').trigger('autocomplete:selected');
      });
      $('.modal-visitor-checkin').modal('show');
    });

    $container.find('.table tr .btn-checkin').on('click', function(e) {
      $('.modal-visitor-checkin').on('shown.bs.modal', function(e) {
        $('.modal-visitor-checkin .input-autocomplete').autocomplete('val', visitors[0].name);
        $('.modal-visitor-checkin .input-autocomplete').trigger('autocomplete:selected', visitors[0]);
      });
      $('.modal-visitor-checkin').modal('show');
    });

    $container.find('.table tr .btn-checkout').on('click', function(e) {
      var index = $(this).attr('data-index');
      $('.modal-visitor-checkout').on('shown.bs.modal', function(e) {
        $('.modal-visitor-checkout #txtName').val(visitors[index].name);
        $('.modal-visitor-checkout #txtIdentification').val(visitors[index].ident);
      });
      $('.modal-visitor-checkout').modal('show');
    });
  }

  if ($container.hasClass('article-school-visitors')) {
    $container.find('.nav-main .input-group .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
      displayKey: 'name',
      source: function(query, callback) {
        var pattern = new RegExp(query, 'i');
        var hits = visitors.filter(function(record) {
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
          orderable: false,
          width: 24,
          targets: 0
        },
        {
          width: 120,
          targets: 2
        },
        {
          width: 160,
          targets: 3
        },
        {
          width: 120,
          targets: 4
        },
        {
          width: 80,
          targets: 5
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
      if ($(e.target).is('a')) return;
      if ($(e.target).closest('a') > 0) return;
      if ($(e.target).hasClass('.btn')) return;
      if ($(e.target).closest('.btn').length > 0) return;
      if ($(e.target).hasClass('.custom-control')) return;
      if ($(e.target).closest('.custom-control').length > 0) return;
      $container.find('.table tr .custom-control-input').prop('checked', false);
      $container.find('.table tr').removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
      $(this).addClass('table-active');
      updateActionButtonsStyles();
    });

    var dataTable = $('.modal-visitor-view .table').DataTable({
      ordering: false,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          width: 120,
          targets: 0
        },
        {
          width: 120,
          targets: 2
        },
        {
          width: 120,
          targets: 3
        }
      ],
      dom: 'rt<"bottom">',
      order: [[2, 'desc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.table tr a').on('click', function(e) {
      e.preventDefault();
      $('.modal-visitor-view .modal-dialog .modal-title').text('Aaron Tan');
      $('.modal-visitor-view').modal('show');
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.modal-visitor-create').modal('show');
    });

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-visitor-edit').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-visitor-delete-confirmation').modal('show');
    });
  }

  if ($container.hasClass('article-visitors-report')) {
    $('#txtDateTimeIn').daterangepicker({
      parentEl: '.dialog-menu-filters',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('#txtDateTimeOut').daterangepicker({
      parentEl: '.dialog-menu-filters',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      ordering: false,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          width: 100,
          targets: 1
        },
        {
          width: 140,
          targets: 2
        },
        {
          width: 100,
          targets: 3
        },
        {
          width: 150,
          targets: 4
        },
        {
          width: 150,
          targets: 5
        },
        {
          width: 180,
          targets: 6
        }
      ],
      dom: 'rt<"bottom">',
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });
  }

  if ($container.hasClass('article-visitor-categories')) {
    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          orderable: false,
          width: 24,
          targets: 0
        },
        {
          width: 140,
          targets: 1
        },
        {
          width: 140,
          targets: 2
        },
        {
          orderable: false,
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
      $('.modal-notification-rule-create .custom-control-input').on('click', function(e) {
        if ($(this).attr('id') === 'other0') {
          if ($(this).is(':checked')) $('#txtRecipient0').removeClass('d-none');
          else $('#txtRecipient0').addClass('d-none');
        }
      });
      $('.modal-notification-rule-create').modal('show');
    });

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-notification-rule-edit .custom-control-input').on('click', function(e) {
        if ($(this).attr('id') === 'other1') {
          if ($(this).is(':checked')) $('#txtRecipient1').removeClass('d-none');
          else $('#txtRecipient1').addClass('d-none');
        }
      });
      $('.modal-notification-rule-edit').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-notification-rule-delete-confirmation').modal('show');
    });
  }
});
