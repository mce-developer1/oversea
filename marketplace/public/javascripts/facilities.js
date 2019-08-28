$(document).ready(function() {
  var teachers = [
    { id: 1, name: 'Aaron Tan' },
    { id: 2, name: 'Ashar Ahmad' },
    { id: 3, name: 'Arya Suman' },
    { id: 4, name: 'Chua Chin Hui' },
    { id: 5, name: 'Derrick Lee' }
  ];
  var facilities = [
    { 
      id: 0, 
      title: 'Computer Labs',
      eventColor: '#3788d8',
      children: [
        { id: 1, title: 'Computer Lab 1', eventColor: '#3788d8' }, 
        { id: 2, title: 'Computer Lab 2', eventColor: '#3788d8' },
        { id: 3, title: 'Computer Lab 3', eventColor: '#3788d8' }, 
        { id: 4, title: 'Computer Lab 4', eventColor: '#3788d8' }        
      ]
    },
    { 
      id: 10, 
      title: 'Meeting Rooms',
      eventColor: '#3788d8',
      children: [
        { id: 11, title: 'Meeting Room 1', eventColor: '#3788d8' },
        { id: 12, title: 'Meeting Room 2', eventColor: '#3788d8' },
        { id: 13, title: 'Meeting Room 3', eventColor: '#3788d8' },
        { id: 14, title: 'Meeting Room 4', eventColor: '#3788d8' }
      ]
    }
  ];

  var events = [];
  for (var i = 1; i < 4; i++) {    
    var start = new Date();
    start.setHours(14,0,0);
    var end = new Date();
    end.setHours(15,0,0);
    events.push({
      resourceId: (i + 1),
      resource: facilities[0].children[i],
      title: teachers[i].name,
      teacher: teachers[i],
      start: start.toISOString(),
      end: end.toISOString()
    });
  }

  var $container = $('.article-facility-booking');
  if ($container.length === 0) $container = $('.article-facility-bookings');

  function updateActionButtonsStyles() {
    var bookingSelected = ($container.find('.table tr input[type="radio"]:checked').length > 0);

    if (bookingSelected) {
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

  if ($container.hasClass('article-facility-booking')) {
    $(document).on('click', '.popover .btn-edit', function(e) {
      if (window.eventElement) $(window.eventElement).popover('hide');
      $('.modal-ed-booking-edit').modal('show');
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
      aspectRatio: 3,
      selectable: true,
      editable: true,
      eventOverlap: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
      },
      resourceLabelText: 'Facilities',
      resources: facilities[0].children,
      events: events,
      eventRender: function(info) {
        var properties = info.event.extendedProps;
        var period = moment(info.event.start).format('DD MMM YYYY');
        period += ', ' + moment(info.event.start).format('hh:mm A');
        period += ' - ' + moment(info.event.end).format('hh:mm A');

        var location = 'Location: ' + properties.location;
        var student = ' (' + properties.teacher.name + ')';
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
        /*$('#selEduAuthority0').selectpicker('val', info.resource.title);
        $('#txtStartDate0').data('daterangepicker')
          .setStartDate(info.start);
        $('#txtEndDate0').data('daterangepicker')
          .setStartDate(info.end);*/
        $('.modal-facility-booking-create .modal-title').text(info.resource.title);
        $('.modal-facility-booking-create').modal('show');
      },
      eventClick: function(info) {
        var properties = info.event.extendedProps;
        /*$('#selEduAuthority1').selectpicker('val', properties.resource.title);
        $('#selClass1').selectpicker('val', properties.group.name);
        $('#selStudent1').selectpicker('val', properties.group.name);
        $('#txtLocation1').val(properties.location);
        $('#txtStartDate1').data('daterangepicker')
          .setStartDate(info.event.start);
        $('#txtEndDate1').data('daterangepicker')
          .setStartDate(info.event.end);*/

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
});
