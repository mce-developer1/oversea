$(document).ready(function() {
  function getRandomDay(date, days) {
    var randomDate = new Date(date.getTime());
    randomDate.setDate(randomDate.getDate() + days);
    
    var randomDay = randomDate.getDay();
    if ((randomDay === 0) || (randomDay === 6)) {
      randomDate.setDate(randomDate.getDate() + 2);
    }
    return randomDate;
  }

  var events = [];
  for (var i = 0; i < 5; i++) {
    var start = new Date();
    var days = Math.floor(Math.random() * 10);
    start = getRandomDay(start, days);
    var groupId = (i + 1);
    var groupName =  'P' + groupId + ' Maths Remedial';
    events.push({
      title: groupName,
      group: { id: groupId, name: groupName},
      attendance: { present: 5, total: 10 },
      start: start.toISOString().substring(0,10)
    });
  }
  console.log(events);

  var $container = $('.article-attendance-sessions');
  if ($container.length === 0) $container = $('.article-long-absences');
  if ($container.length === 0) $container = $('.article-attendance-report');
  if ($container.length === 0) $container = $('.article-notification-rules');

  function updateActionButtonsStyles() {
    var studentSelected = ($('.article-attendance-taking .table tr input[type="checkbox"]:checked').length > 0);

    if (studentSelected) {
      if ($('.article-attendance-taking .btn-bulk-update').hasClass('d-none')) {
        $('.article-attendance-taking .btn-bulk-update').removeClass('d-none');
      }
    } else {
      if (!$('.article-attendance-taking .btn-bulk-update').hasClass('d-none')) {
        $('.article-attendance-taking .btn-bulk-update').addClass('d-none');
      }
    }

    var statusSelected = ($container.find('.table tr input[type="radio"]:checked').length > 0);

    if (statusSelected) {
      if ($container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').removeClass('d-none');
      }

      if ($container.find('.btn-delete').hasClass('d-none')) {
        $container.find('.btn-delete').removeClass('d-none');
      }

      if ($container.find('.btn-bulk-update').hasClass('d-none')) {
        $container.find('.btn-bulk-update').removeClass('d-none');
      }
    } else {
      if (!$container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').addClass('d-none');
      }

      if (!$container.find('.btn-delete').hasClass('d-none')) {
        $container.find('.btn-delete').addClass('d-none');
      }

      if (!$container.find('.btn-bulk-update').hasClass('d-none')) {
        $container.find('.btn-bulk-update').addClass('d-none');
      }
    }
  }

  if ($container.hasClass('article-attendance-sessions')) {
    function renderStudentTable() {
      if ($.fn.DataTable.isDataTable('.article-attendance-taking .table')) return;
      var dataTable = $('.article-attendance-taking .table').DataTable({
        scrollY: '100%',
        scrollX: true,
        ordering: false,
        paging: false,
        language: {
          infoEmpty: 'Oops, nothing to see here!',
        },
        columnDefs: [
          {
            width: 24,
            targets: 0
          },
          {
            width: 100,
            targets: 2
          },
          {
            width: 180,
            targets: 3
          },
          {
            width: 280,
            targets: 4
          }
        ],
        dom: 'rt<"bottom">',
        order: [[1, 'asc']],
        headerCallback: function( thead, data, start, end, display ) {
          $(thead).closest('.dataTables_scrollHead').css('position', '');
        }
      });
      
      $('.article-attendance-taking .table tr input[type="checkbox"]').on('change', function(e) {
        var $row = $(this).closest('tr');
        if ($row.hasClass('table-active')) {
          $row.removeClass('table-active');
        } else {
          $row.addClass('table-active');
        }
        updateActionButtonsStyles();
      });
  
      $('.article-attendance-taking .table tr').on('click', function(e) {
        if ($(e.target).hasClass('.form-input')) return;
        if ($(e.target).closest('.form-input').length > 0) return;
        if ($(e.target).hasClass('.bootstrap-select')) return;
        if ($(e.target).closest('.bootstrap-select').length > 0) return;        
        if ($(e.target).hasClass('.custom-control')) return;
        if ($(e.target).closest('.custom-control').length > 0) return;
        if ($(this).hasClass('table-active')) {
          $(this).find('.custom-control-input').prop('checked', false);
          $(this).removeClass('table-active');
        } else {
          $(this).find('.custom-control-input').prop('checked', true);
          $(this).addClass('table-active');
        }
        updateActionButtonsStyles();
      });
    }

    $('#txtDate').daterangepicker({
      parentEl: '.article-attendance-taking',
      singleDatePicker: true,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
    });

    $(document).on('click', '.popover .btn-edit', function(e) {
      if (window.eventElement) $(window.eventElement).popover('hide');
      $('.article-attendance-sessions').addClass('d-none');
      $('.article-attendance-taking').removeClass('d-none');
      renderStudentTable();
    });

    $(document).on('click', '.popover .btn-delete', function(e) {
      if (window.eventElement) $(window.eventElement).popover('hide');
      $('.modal-attendance-delete-confirmation').modal('show');
    });

    $(document).on('click', function(e) {
      if ($(e.target).closest('.popover').length === 0) {
        if (window.eventElement) {
          $(window.eventElement).popover('hide');
          delete window.eventElement;
        }
      }
    });

    var calendar = $container.find('.calendar').get(0);
    var fullCalendar = new FullCalendar.Calendar(calendar, {
      plugins: ['interaction','dayGrid'],
      defaultView: 'dayGridMonth',
      aspectRatio: 2,
      selectable: true,
      editable: true,
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
        //right: 'resourceTimelineDay,resourceTimelineWeek'
      },
      events: events,
      eventRender: function(info) {
        var properties = info.event.extendedProps;
        var period = 'Date: ' + moment(info.event.start).format('DD MMM YYYY');
        var attendance = 'Present: ' + properties.attendance.present 
          + '/' + properties.attendance.total;
        var content = `
          <nav class="navbar">
            <div class="navbar-text">` + info.event.title + `</div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <button class="btn btn-light btn-edit" type="button" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
              </li>
              <li class="nav-item">
                <button class="btn btn-light btn-delete" type="button" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </li>
            </ul>
          </nav>
          <div class="calendar-event">
            <div class="event-header">
              <div class="event-datetime">` + period + `</div>
            </div>
            <div class="event-body">
              <div class="attendance">` + attendance + `</div>
            </div>
          </div>
        `;
        $(info.el).popover({
          content: content,
          container: 'body',
          placement: 'bottom',
          trigger: 'manual',
          html: true,
          sanitize: true
        });
      },
      select: function(info) {
        $('#txtDate').attr('disabled', false);
        $('#txtDate').data('daterangepicker')
          .setStartDate(info.start);
        $('#txtDate').data('daterangepicker')
          .setEndDate(info.start);
        $('#selGrade').prop('disabled', false);
        $('#selGrade').selectpicker('refresh');
        $('#selClass').prop('disabled', false);
        $('#selClass').selectpicker('refresh');
        $('.article-attendance-sessions').addClass('d-none');
        $('.article-attendance-taking').removeClass('d-none');
        renderStudentTable();
      },
      eventClick: function(info) {
        var properties = info.event.extendedProps;
        $('#txtDate').attr('disabled', true);
        $('#txtDate').data('daterangepicker')
          .setStartDate(info.event.start);
        $('#txtDate').data('daterangepicker')
          .setEndDate(info.event.start);
        $('#selGrade').prop('disabled', true);
        $('#selGrade').selectpicker('refresh');
        $('#selClass').prop('disabled', true);
        $('#selClass').selectpicker('val', properties.group.name);        
        $('#selClass').selectpicker('refresh');

        setTimeout(function() {
          if (info.el === window.eventElement) {
            $(info.el).popover('toggle')
          } else {
            if (window.eventElement) {
              $(window.eventElement).popover('hide');
            }
            window.eventElement = info.el;
          }

          $(info.el).popover('show');
        });
      }
    });

    fullCalendar.render();
    
    $('.article-attendance-taking .btn-bulk-update').on('click', function(e) {
      $('.modal-attendance-status-update').modal('show');
    });

    $('.article-attendance-taking .btn-cancel').on('click', function(e) {
      $('.article-attendance-taking').addClass('d-none');
      $('.article-attendance-sessions').removeClass('d-none');
    });

    $('.article-attendance-taking .btn-save').on('click', function(e) {
      $('.article-attendance-taking').addClass('d-none');
      $('.article-attendance-sessions').removeClass('d-none');
    });
  }

  if ($container.hasClass('article-long-absences')) {
    $('#txtStartDate').daterangepicker({
      parentEl: '.dialog-menu-filters',
      singleDatePicker: true,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
    });

    $('#txtEndDate').daterangepicker({
      parentEl: '.dialog-menu-filters',
      singleDatePicker: true,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
    });

    $('#txtPeriod').daterangepicker({
      singleDatePicker: false,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
    });

    $('#txtPeriod').daterangepicker({
      parentEl: '.modal-long-absence-taking',
      singleDatePicker: false,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
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
          width: 140,
          targets: 2
        },
        {
          width: 160,
          targets: 3
        },
        {
          width: 140,
          targets: 4
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
      $('.modal-long-absence-taking').modal('show');
    });

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-long-absence-taking').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-attendance-delete-confirmation').modal('show');
    });
  }

  if ($container.hasClass('article-attendance-report')) {
    function renderStudentTable() {
      if ($.fn.DataTable.isDataTable('.modal-class-attendance-view .table')) return;
      var dataTable = $('.modal-class-attendance-view .table').DataTable({
        ordering: false,
        paging: false,
        language: {
          infoEmpty: 'Oops, nothing to see here!',
        },
        columnDefs: [
          {
            width: 160,
            targets: 0
          },
          {
            width: 140,
            targets: 1
          },
          {
            width: 160,
            targets: 2
          }
        ],
        dom: 'rt<"bottom">',
        order: [[1, 'asc']],
        headerCallback: function( thead, data, start, end, display ) {
          $(thead).closest('.dataTables_scrollHead').css('position', '');
        }
      });
    }

    $('#txtStartDate').daterangepicker({
      parentEl: '.dialog-menu-filters',
      singleDatePicker: true,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
    });

    $('#txtEndDate').daterangepicker({
      parentEl: '.dialog-menu-filters',
      singleDatePicker: true,
      timePicker: false,
      minYear: 2019,
      maxYear: 2019,
      locale: {
        format: 'DD MMM YYYY'
      }
    });

    var dataTable = $container.find('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      ordering: false,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          width: 140,
          targets: 1
        },
        {
          width: 100,
          targets: 2
        },
        {
          width: 80,
          targets: 3
        },
        {
          width: 80,
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

    $container.find('.table tr a').on('click', function(e) {
      e.preventDefault();
      var className = $(this).text();
      $('.modal-class-attendance-view .modal-dialog .modal-title').text(className);
      $('.modal-class-attendance-view').on('shown.bs.modal', function (e) {
        renderStudentTable();
      });
      $('.modal-class-attendance-view').modal('show');
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
          orderable: false,
          width: 24,
          targets: 0
        },
        {
          width: 160,
          targets: 2
        },
        {
          width: 160,
          targets: 3
        },
        {
          width: 100,
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
