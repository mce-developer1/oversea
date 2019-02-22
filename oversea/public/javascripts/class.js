$(document).ready(function() {
  var contentData = [
    [ 'Adam Smit', 'adamsmith@sjijunior.edu.au' ],
    [ 'Billy Zane', 'billyzane@sjijunior.edu.au' ],
    [ 'Cheryl Crow', 'cherylcrow@sjijunior.edu.au' ]
  ];
  var buttons = '<button class="btn btn-light btn-delete" type="button">'
    + '<i class="fas fa-times"></i></button>';

  $('.form-class-details .user-table').dataTable({
    data: contentData,
    columns: [
      { title: 'Name' },
      { title: 'Email' },
      { title: 'Action' }
    ],
    columnDefs: [{
      targets: -1,
      data: null,
      defaultContent: buttons,
      className: 'actions'
    }],
    dom: '',
    ordering: false,
    responsive: true
  });

  $('.app-header .btn-close').on('click', function(e) {
    $('#mdlDiscardChanges').modal('show');
  });

  $('.form-class-details .btn-cancel').on('click', function(e) {
    $('#mdlDiscardChanges').modal('show');
  });

  $('.form-class-details .btn-primary').on('click', function(e) {
    $('#mdlChangesSaved').modal('show');
  });

  $('.form-discard-changes .btn-primary').on('click', function(e) {
    location.href = '/admin/tools';
  });

  $('.form-changes-saved .btn-primary').on('click', function(e) {
    location.href = '/admin/tools';
  });
});
