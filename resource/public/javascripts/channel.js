$(document).ready(function() {
  $('.nav-side .nav-link').on('click', function(e) {
    e.preventDefault();

    var href = $(this).attr('href');
    var container = $('.tab-pane.show');
    var isDataTable = $.fn.DataTable.isDataTable;

    switch (href) {
      case '#unitPreparation':
        if ($(container).find('.article-content').hasClass('d-none')) {
          $(container).find('.article-overview').addClass('d-none');
          $(container).find('.article-content').removeClass('d-none');

          if (isDataTable($(container).find('.article-content table'))) {
            break;
          }

          var classData = [
            [ 'Unit Opener (TE)', 'Completed' ],
            [ 'Unit Overview (TG)', 'Completed' ],
            [ 'Unit SOW (TG)', '' ],
            [ 'Unit Opener (Interactive)', '' ],
            [ 'Whole Numbers: Pre-Test', '' ]
          ];

         $(container).find('.article-content table').dataTable({
            data: classData,
            columns: [
              { title: 'Whole Numbers: Unit Preparation' },
              { title: '' }
            ],
            columnDefs: [{
              targets: -1,
              className: 'success'
            }],
            dom: '',
            ordering: false,
            responsive: true,
            drawCallback: function(settings) {
              $(this).find('tr').on('click', function(e) {
                location.href = '/channel/resource';
              });
            }
          });
        }
        break;
      default:
        if ($(container).find('.article-overview').hasClass('d-none')) {
          $(container).find('.article-overview').removeClass('d-none');
          $(container).find('.article-content').addClass('d-none');
        }
        break;
    }
  });

  $('.app-header .btn-close').on('click', function(e) {
    location.href = '/channel';
  });
});
