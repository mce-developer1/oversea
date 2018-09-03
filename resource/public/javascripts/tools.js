$(document).ready(function() {
  var contentData = [
    [ 'Maths Works!', 'P3-P6', '2 Jan 2018', '31 Dec 2018' ],
    [ 'MPAH Maths', 'P1-P6', '2 Jan 2018', '31 Dec 2018' ],
    [ 'MPAH Science', 'P1-P6', '2 Jan 2018', '31 Dec 2018' ]
  ];

  $(document).ready(function() {
    $('.article-manage-content table').dataTable({
      data: contentData,
      columns: [
        { title: 'Titles' },
        { title: 'Levels' },
        { title: 'Start Date' },
        { title: 'End Date' }
      ],
      dom: '',
      ordering: false,
      responsive: true
    });
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var href = $(this).attr('href');
    var isDataTable = $.fn.DataTable.isDataTable;

    switch (href) {
      case '#manageClass':
        if (isDataTable('.article-manage-class table')) {
          break;
        }

        var classData = [
          [ '1-Amazing', 'P1', '21' ],
          [ '1-Brilliant', 'P1', '23' ],
          [ '1-Courage', 'P1', '22' ]
        ];
        var buttons = '<button class="btn btn-light" type="button">'
          + '<i class="fa fa-times"></i></button>'
          + '<button class="btn btn-light" type="button">'
          + '<i class="fa fa-th-list"></i></button>';

        $(document).ready(function() {
          $('.article-manage-class table').dataTable({
            data: classData,
            columns: [
              { title: 'Class Name' },
              { title: 'Level' },
              { title: 'No. of Students' },
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
        });
        break;
      case "#manageUser":
        if (isDataTable('.article-manage-user table')) {
          break;
        }

        var classData = [
          [ 'Adam Smit', 'P1', '1-Amazing', 'adamsmith@sjijunior.edu.au' ],
          [ 'Billy Zane', 'P1', '1-Amazing', 'billyzane@sjijunior.edu.au' ],
          [ 'Cheryl Crow', 'P1', '1-Amazing', 'cherylcrow@sjijunior.edu.au' ]
        ];
        var buttons = '<button class="btn btn-light" type="button">'
          + '<i class="fa fa-times"></i></button>'
          + '<button class="btn btn-light" type="button">'
          + '<i class="fa fa-th-list"></i></button>';

        $(document).ready(function() {
          $('.article-manage-user table').dataTable({
            data: classData,
            columns: [
              { title: 'Name' },
              { title: 'Level' },
              { title: 'Class' },
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
        });
        break;
      default:
        break;
    }
  });
});
