$(document).ready(function() {
  var students = [
    { id: 1, name: 'Amos Chee' },
    { id: 2, name: 'Charles Tan' },
    { id: 3, name: 'Faisal Manaf' },
    { id: 4, name: 'Vivian Lim' },
    { id: 5, name: 'Zachary Teo' }
  ];
  var resources = [
    { 
      id: 0, 
      title: 'Counsellors',
      eventColor: '#3788d8',
      children: [
        { id: 1, title: 'Aaron Tan', eventColor: '#3788d8' }, 
        { id: 2, title: 'Arya Suman', eventColor: '#3788d8' },
        { id: 3, title: 'Ashar Ahmad', eventColor: '#3788d8' }, 
        { id: 4, title: 'Chua Chin Hui', eventColor: '#3788d8' }        
      ]
    },
    { 
      id: 10, 
      title: 'Learning Support',
      eventColor: '#ffa500',
      children: [
        { id: 11, title: 'Derrick Lee', eventColor: '#ffa500' },
        { id: 12, title: 'Nurulhuda bte Sazali', eventColor: '#ffa500' },
        { id: 13, title: 'Siow Poh Piah Irene', eventColor: '#ffa500' },
        { id: 14, title: 'Tan Boon Huat', eventColor: '#ffa500' }
      ]
    }
  ];

  var events = [];
  for (var i = 0; i < 5; i++) {
    var resourceId = (i < 2) ? 1 : i;
    var start = new Date();
    if (i === 1) start.setHours(11,0,0);
    else start.setHours(9,0,0);
    var end = new Date();
    if (i === 1) end.setHours(13,0,0);
    else end.setHours(11,0,0);
    events.push({
      resourceId: resourceId,
      resource: resources[0].children[i % 4],
      title: 'Session ' + (i + 1),
      teacher: { id: 1, name: 'Ernest Goh' },
      student: students[i],
      group: { id: 1, name: 'P1-PA' },
      location: 'Staff Room',
      start: start.toISOString(),
      end: end.toISOString()
    });
  }

  for (var i = 10; i < 12; i++) {
    var resourceId = (i + 1);
    var start = new Date();
    start.setHours(11,0,0);
    var end = new Date();
    end.setHours(13,0,0);
    events.push({
      resourceId: resourceId,
      resource: resources[1].children[(i - 10) % 4],
      title: 'Session ' + (i + 1),
      teacher: { id: 1, name: 'Ernest Goh' },
      student: students[i - 10],
      group: { id: 1, name: 'P1-PA' },
      location: 'Class Room',
      start: start.toISOString(),
      end: end.toISOString()
    });
  }

  var $container = $('.article-eduauthority-booking');
  if ($container.length === 0) $container = $('.article-eduauthority-bookings');
  if ($container.length === 0) $container = $('.article-eduauthority-report');

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

  if ($container.hasClass('article-eduauthority-booking')) {
    $('#txtStartDate0').daterangepicker({
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

    $('#txtEndDate0').daterangepicker({
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

    $('#txtStartDate1').daterangepicker({
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

    $('#txtEndDate1').daterangepicker({
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

    $(document).on('click', '.popover .btn-edit', function(e) {
      if (window.eventElement) $(window.eventElement).popover('hide');
      $('.modal-booking-edit').modal('show');
    });

    $(document).on('click', '.popover .btn-delete', function(e) {
      if (window.eventElement) $(window.eventElement).popover('hide');
      $('.modal-booking-delete-confirmation').modal('show');
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
      plugins: ['interaction','resourceTimeline'],
      defaultView: 'resourceTimelineDay',
      aspectRatio: 2,
      selectable: true,
      editable: true,
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
        //right: 'resourceTimelineDay,resourceTimelineWeek'
      },
      resources: resources,
      events: events,
      eventRender: function(info) {
        var properties = info.event.extendedProps;
        var period = moment(info.event.start).format('DD MMM YYYY');
        period += ', ' + moment(info.event.start).format('hh:mm A');
        period += ' - ' + moment(info.event.end).format('hh:mm A');

        var location = 'Location: ' + properties.location;
        var student = properties.student.name 
          + ' (' + properties.group.name + ')';
        var teacher = 'Submitted by: ' + properties.teacher.name;
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
              <div class="event-location text-muted">` + location + `</div>
            </div>
            <div class="event-body">
              <div class="student-name">` + student + `</div>
              <div class="submitted-by text-muted">` + teacher + `</div>
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
        $('#selEduAuthority0').selectpicker('val', info.resource.title);
        $('#txtStartDate0').data('daterangepicker')
          .setStartDate(info.start);
        $('#txtEndDate0').data('daterangepicker')
          .setStartDate(info.end);
        $('.modal-booking-create').modal('show');
      },
      eventClick: function(info) {
        var properties = info.event.extendedProps;
        $('#selEduAuthority1').selectpicker('val', properties.resource.title);
        $('#selClass1').selectpicker('val', properties.group.name);
        $('#selStudent1').selectpicker('val', properties.student.name);
        $('#txtLocation1').val(properties.location);
        $('#txtStartDate1').data('daterangepicker')
          .setStartDate(info.event.start);
        $('#txtEndDate1').data('daterangepicker')
          .setStartDate(info.event.end);

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
  }

  if ($container.hasClass('article-eduauthority-bookings')) {
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
          width: 150,
          targets: 3
        },
        {
          width: 150,
          targets: 4
        }
      ],
      dom: 'rt<"bottom">',
      order: [[3, 'desc']],
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

    $('#txtStartDate').daterangepicker({
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

    $('#txtEndDate').daterangepicker({
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

    $container.find('.article-body .navbar .btn-edit').on('click', function(e) {
      $('.modal-booking-edit').modal('show');
    });

    $container.find('.article-body .navbar .btn-delete').on('click', function(e) {
      $('.modal-booking-delete-confirmation').modal('show');
    });
  }

  if ($container.hasClass('article-eduauthority-report')) {
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
          width: 150,
          targets: 2
        },
        {
          width: 150,
          targets: 3
        }
      ],
      dom: 'rt<"bottom">',
      order: [[3, 'desc']],
      headerCallback: function( thead, data, start, end, display ) {
        $(thead).closest('.dataTables_scrollHead').css('position', '');
      }
    });
  }
});
