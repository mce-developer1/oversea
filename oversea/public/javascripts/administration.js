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

  $container.find('.navbar .btn-create').on('click', function(e) {
    $container.find('.navbar').addClass('d-none');
    $container.find('.table-form-class').addClass('d-none');
    $container.find('.form-form-class').removeClass('d-none');
  });

  $container.find('.form-form-class .btn-create').on('click', function(e) {
    $container.find('.form-form-class').addClass('d-none');
    $container.find('.navbar').removeClass('d-none');
    $container.find('.table-form-class').removeClass('d-none');
  });

  var dataTable = $('.table').DataTable({
    language: {
      infoEmpty: 'No groups found.',
    },
    columnDefs: [{
      orderable: false,
      width: 24,
      targets: 0
    }],
    dom: 'rt<"bottom">',
    order: [[1, 'asc']]
  });
});
