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
        { id: 1, title: 'Computer Lab 1', category: 'FACILITY', eventColor: '#3788d8' }, 
        { id: 2, title: 'Computer Lab 2', category: 'FACILITY', eventColor: '#3788d8' },
        { id: 3, title: 'Computer Lab 3', category: 'FACILITY', eventColor: '#3788d8' }, 
        { id: 4, title: 'Computer Lab 4', category: 'FACILITY', eventColor: '#3788d8' }        
      ]
    },
    { 
      id: 10, 
      title: 'Meeting Rooms',
      eventColor: '#3788d8',
      children: [
        { id: 11, title: 'Meeting Room 1', category: 'FACILITY', eventColor: '#3788d8' },
        { id: 12, title: 'Meeting Room 2', category: 'FACILITY', eventColor: '#3788d8' },
        { id: 13, title: 'Meeting Room 3', category: 'FACILITY', eventColor: '#3788d8' },
        { id: 14, title: 'Meeting Room 4', category: 'FACILITY', eventColor: '#3788d8' }
      ]
    }
  ];

  var facilityEvents = [];
  for (var i = 1; i < 4; i++) {    
    var start = new Date();
    start.setHours(14,0,0);
    var end = new Date();
    end.setHours(15,0,0);
    facilityEvents.push({
      resourceId: (i + 1),
      resource: facilities[0].children[i],
      title: teachers[i].name,
      teacher: teachers[i],
      start: start.toISOString(),
      end: end.toISOString()
    });
  }

  var equipment = [
    { 
      id: 0, 
      title: 'Equipment',
      eventColor: '#3788d8',
      children: [
        { id: 1, title: 'Projector 1', category: 'EQUIPMENT', eventColor: '#3788d8' }, 
        { id: 2, title: 'Projector 2', category: 'EQUIPMENT', eventColor: '#3788d8' },
        { id: 3, title: 'Projector 3', category: 'EQUIPMENT', eventColor: '#3788d8' }, 
        { id: 4, title: 'Projector 4', category: 'EQUIPMENT', eventColor: '#3788d8' }        
      ]
    }
  ];

  var equipmentEvents = [];
  for (var i = 1; i < 3; i++) {    
    var start = new Date();
    start.setHours(9,0,0);
    var end = new Date();
    end.setHours(10,0,0);
    equipmentEvents.push({
      resourceId: (i + 1),
      resource: equipment[0].children[i],
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

    $('#selCategory').on('changed.bs.select', function(e) {
      var selectedCategory = $('#selCategory').selectpicker('val');
      if (selectedCategory === 'Equipment') {
        fullCalendar.setOption('resourceLabelText', 'Equipment');
      } else {
        fullCalendar.setOption('resourceLabelText', 'Facilities');
      }

      fullCalendar.refetchResources();
      fullCalendar.refetchEvents();
    });

    $('.modal-facility-booking-create  #txtStartDate0').daterangepicker({
      parentEl: '.modal-facility-booking-create',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2020,
      maxYear: 2020,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('.modal-facility-booking-create  #txtEndDate0').daterangepicker({
      parentEl: '.modal-facility-booking-create',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2020,
      maxYear: 2020,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('.modal-facility-booking-create  #txtEndDate0').on('apply.daterangepicker', function(ev, picker) {
      var form = $('.form-create-facility-booking');
      $(form).find('.form-group-status').removeClass('d-none');
    });

    $('.modal-facility-booking-create #selRepeat0').on('changed.bs.select', function(e) {
      var form = $('.form-create-facility-booking');
      var selectedRepeatType = $('#selRepeat0').selectpicker('val');
      if (selectedRepeatType === 'None') $(form).find('.form-group-ends').addClass('d-none');
      else $(form).find('.form-group-ends').removeClass('d-none');
    });

    $('.modal-facility-booking-create .btn-add').on('click', function(e) {
      var form = $('.form-create-facility-booking');
      $(form).find('.form-group-equipment .list-equipment').removeClass('d-none');
    });

    $('.modal-equipment-booking-create  #txtStartDate1').daterangepicker({
      parentEl: '.modal-equipment-booking-create',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2020,
      maxYear: 2020,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('.modal-equipment-booking-create  #txtEndDate1').daterangepicker({
      parentEl: '.modal-equipment-booking-create',
      singleDatePicker: true,
      timePicker: true,
      timePickerIncrement: 5,
      minYear: 2020,
      maxYear: 2020,
      locale: {
        format: 'DD MMM YYYY hh:mm A'
      }
    });

    $('.modal-equipment-booking-create  #txtEndDate1').on('apply.daterangepicker', function(ev, picker) {
      var form = $('.form-create-equipment-booking');
      $(form).find('.form-group-status').removeClass('d-none');
    });

    $('.modal-equipment-booking-create #selRepeat1').on('changed.bs.select', function(e) {
      var form = $('.form-create-equipment-booking');
      var selectedRepeatType = $('#selRepeat1').selectpicker('val');
      if (selectedRepeatType === 'None') $(form).find('.form-group-ends').addClass('d-none');
      else $(form).find('.form-group-ends').removeClass('d-none');
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
      resources: function(fetchInfo, successCallback, failureCallback) {
        var selectedCategory = $('#selCategory').selectpicker('val');
        if (selectedCategory === 'Equipment') successCallback(equipment[0].children);
        else successCallback(facilities[0].children);
      },
      events: function(fetchInfo, successCallback, failureCallback) {
        var selectedCategory = $('#selCategory').selectpicker('val');
        if (selectedCategory === 'Equipment') successCallback(equipmentEvents);
        else successCallback(facilityEvents);
      },
      eventRender: function(info) {
        var properties = info.event.extendedProps;
        var period = moment(info.event.start).format('DD MMM YYYY');
        period += ', ' + moment(info.event.start).format('hh:mm A');
        period += ' - ' + moment(info.event.end).format('hh:mm A');

        var teacher = 'Booked by: ' + properties.teacher.name;
        var content = `
          <nav class="navbar">
            <div class="navbar-text">` + properties.resource.title + `</div>
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
              <div class="booked-by text-muted">` + teacher + `</div>
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
        var properties = info.resource.extendedProps;
        if (properties.category === 'EQUIPMENT') {
          $('.modal-equipment-booking-create .modal-title').text(info.resource.title);
          $('.modal-equipment-booking-create').modal('show');
        } else {
          $('.modal-facility-booking-create .modal-title').text(info.resource.title);
          $('.modal-facility-booking-create').modal('show');
        }
      },
      eventClick: function(info) {
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

  if ($container.hasClass('article-facility-bookings')) {
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
          ordering: false,
          width: 24,
          targets: 0
        },
        {
          width: 180,
          targets: 2
        },
        {
          width: 180,
          targets: 3
        },
        {
          width: 180,
          targets: 4
        },
        {
          width: 140,
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
      if ($(e.target).hasClass('.custom-control')) return;
      if ($(e.target).closest('.custom-control').length > 0) return;
      $container.find('.table tr .custom-control-input').prop('checked', false);
      $container.find('.table tr').removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
      $(this).addClass('table-active');
      updateActionButtonsStyles();
    });

    var dataTable = $('.modal-facility-booking-view .table').DataTable({
      ordering: false,
      paging: false,
      language: {
        infoEmpty: 'Oops, nothing to see here!',
      },
      columnDefs: [
        {
          width: 180,
          targets: 0
        },
        {
          width: 180,
          targets: 1
        },
        {
          width: 140,
          targets: 2
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
      $('.modal-facility-booking-view .modal-dialog .modal-title').text('Project 1');
      $('.modal-facility-booking-view').modal('show');
    });
  }
});
