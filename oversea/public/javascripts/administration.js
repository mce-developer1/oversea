$(document).ready(function() {
  var $container = $('.article-manage-form-class');

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

  $container.find('.table tr input[type="radio"]').on('change', function(e) {
    updateActionButtonsStyles();
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

  var dataTable = $('.table').DataTable({
    scrollY: '100%',
    scrollX: true,
    fixedHeader: true,
    paging: false,
    language: {
      infoEmpty: 'No groups found.',
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
        width: 170,
        targets: 3
      },
      {
        width: 170,
        targets: 4
      }
    ],
    dom: 'rt<"bottom">',
    order: [[1, 'asc']]
  });
});
