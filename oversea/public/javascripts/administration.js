$(document).ready(function() {
  var $container = $('.article-manage-school');
  if ($container.length === 0) $container = $('.article-manage-user-account');
  if ($container.length === 0) $container = $('.article-manage-form-class');
  if ($container.length === 0) $container = $('.article-manage-school-group');
  if ($container.length === 0) $container = $('.article-login-as-student');
  if ($container.length === 0) $container = $('.article-login-as-teacher');

  function updateActionButtonsStyles() {
    var groupSelected = ($container.find('.table tr input[type="radio"]:checked').length > 0);

    if (groupSelected) {
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

  if ($container.hasClass('article-manage-school')) {
    var allTimezones = moment.tz.names();
    var timezoneOptions = [];
    for (var i = 0; i < allTimezones.length; i++) {
      var timezoneOption = '<option>' + allTimezones[i] + '</option>';
      timezoneOptions.push(timezoneOption);
    }
    $('#selTimezone').append(timezoneOptions.join());
    $('#selTimezone').selectpicker('refresh');

    $('#txtExpiryDate').val(moment().endOf("year").format('DD MMM YYYY'));
    $('#txtExpiryDate').daterangepicker({
      parentEl: '.form-school-group',
      drops: 'up',
      singleDatePicker: true,
      showDropdowns: true,
      timePicker: false,
      minYear: 1901,
      maxYear: moment().add(10, 'y').format('YYYY'),
      locale: {
        format: 'DD MMM YYYY'
      }
    });

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
          width: 120,
          targets: 1
        },
        {
          width: 160,
          targets: 3
        },
        {
          width: 120,
          targets: 4
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.article-manage-school').addClass('d-none');
      $('.article-create-school').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  
    $('.article-create-school .form-school .btn-create').on('click', function(e) {
      $('.article-create-school').addClass('d-none');
      $('.article-manage-school').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  }

  if ($container.hasClass('article-manage-user-account')) {
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
          targets: 2
        },
        {
          width: 160,
          targets: 3
        },
        {
          width: 100,
          targets: 4
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $('.article-create-user-account .form-user-account .input-autocomplete').autocomplete({ hint: true, debug: true }, [{
      displayKey: 'name',
      source: function(query, callback) {
        var records = [
          { id: 1, name: 'Administrators' }, 
          { id: 2, name: 'HOD Teachers' },
          { id: 3, name: 'Teachers' }, 
          { id: 4, name: 'ICT Executives' },
          { id: 5, name: 'Students' }
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

    $('#selRole').on('changed.bs.select', function (e) {
      var selectedRole = $('#selRole').selectpicker('val');
      
      if (selectedRole === 'Student') {
        if ($('#selGrade').closest('.form-group').hasClass('d-none')) {
          $('#selGrade').closest('.form-group').removeClass('d-none')
        }
        if ($('#selClass').closest('.form-group').hasClass('d-none')) {
          $('#selClass').closest('.form-group').removeClass('d-none')
        }
      } else {
        if (!$('#selGrade').closest('.form-group').hasClass('d-none')) {
          $('#selGrade').closest('.form-group').addClass('d-none')
        }
        if (!$('#selClass').closest('.form-group').hasClass('d-none')) {
          $('#selClass').closest('.form-group').addClass('d-none')
        }
      }
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.article-manage-user-account').addClass('d-none');
      $('.article-create-user-account').removeClass('d-none');
      $('.app-container').scrollTop(0);

      $('.article-create-user-account .form-user-account .btn-add').on('click', function(e) {
        $('.article-create-user-account .form-user-account .list-groups').removeClass('d-none');
      });

      $('.article-create-user-account .form-user-account .btn-select').on('click', function(e) {
        $('.modal-group-select').modal('show');
      });
    });
  
    $('.article-create-user-account .form-user-account .btn-create').on('click', function(e) {
      $('.article-create-user-account').addClass('d-none');
      $('.article-manage-user-account').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  }

  if ($container.hasClass('article-manage-form-class')) {
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
          width: 120,
          targets: 2
        },
        {
          width: 160,
          targets: 3
        },
        {
          width: 180,
          targets: 4
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.article-manage-form-class').addClass('d-none');
      $('.article-create-form-class').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  
    $('.article-create-form-class .form-form-class .btn-create').on('click', function(e) {
      $('.article-create-form-class').addClass('d-none');
      $('.article-manage-form-class').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  }

  if ($container.hasClass('article-manage-school-group')) {
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
          width: 180,
          targets: 1
        },
        {
          orderable: false,
          targets: 2
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });

    $container.find('.article-body .navbar .btn-create').on('click', function(e) {
      $('.article-manage-school-group').addClass('d-none');
      $('.article-create-school-group').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  
    $('.article-create-school-group .form-school-group .btn-create').on('click', function(e) {
      $('.article-create-school-group').addClass('d-none');
      $('.article-manage-school-group').removeClass('d-none');
      $('.app-container').scrollTop(0);
    });
  }
  
  if ($container.hasClass('article-login-as-student')) {
    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          width: 160,
          targets: 1
        },
        {
          orderable: false,
          width: 60,
          targets: 2
        }
      ],
      dom: 'rt<"bottom">',
      order: [[0, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });
  }
  
  if ($container.hasClass('article-login-as-teacher')) {
    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          width: 160,
          targets: 1
        },
        {
          orderable: false,
          width: 60,
          targets: 2
        }
      ],
      dom: 'rt<"bottom">',
      order: [[0, 'asc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });
  }

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

  $(window).on('resize', function(e) {
    if ($(window).width() < 992) {
      if (!$container.find('.article-sidebar').hasClass('dialog')) {
        $container.find('.article-sidebar').addClass('dialog');
        $container.find('.article-sidebar .form-filters').addClass('dialog-menu');
      }
    } else {
      if ($container.find('.article-sidebar').hasClass('dialog')) {
        $container.find('.article-sidebar').removeClass('dialog');
        $container.find('.article-sidebar .form-filters').removeClass('dialog-menu');
      }
    }
  });

  if ($(window).width() < 992) {
    $container.addClass('collapse-sidebar');
    $container.find('.article-sidebar').addClass('dialog');
    $container.find('.article-sidebar .form-filters').addClass('dialog-menu');
  }
});
