$(document).ready(function() {
  var $container = $('.article-manage-form-class');
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

  if ($container.hasClass('article-manage-form-class')) {
    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      fixedHeader: true,
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
          width: 170,
          targets: 4
        }
      ],
      dom: 'rt<"bottom">',
      order: [[1, 'asc']]
    });
  } else if ($container.hasClass('article-login-as-student')) {
    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      fixedHeader: true,
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
      order: [[0, 'asc']]
    });
  } else if ($container.hasClass('article-login-as-teacher')) {
    var dataTable = $('.table').DataTable({
      scrollY: '100%',
      scrollX: true,
      fixedHeader: true,
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
      order: [[0, 'asc']]
    });
  }

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
