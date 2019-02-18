$(document).ready(function() {
  var $container = $('.article-resources');

  function updateActionButtonsStyles() {
    var resourcesSelected = $container.find('.card-group').hasClass('d-none') 
      ? ($container.find('.table-body .table-active').length > 0)
      : ($container.find('.card-group .card-active').length > 0);

    if (resourcesSelected) {
      if ($container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').removeClass('d-none');
      }

      if ($container.find('.btn-download').hasClass('d-none')) {
        $container.find('.btn-download').removeClass('d-none');
      }
    } else {
      if (!$container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').addClass('d-none');
      }

      if (!$container.find('.btn-download').hasClass('d-none')) {
        $container.find('.btn-download').addClass('d-none');
      }
    }
  }

  $container.find('.navbar-nav:not(.nav-main) .btn-search').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').addClass('d-none');
    $container.find('.nav-main').addClass('d-block');
  });

  $container.find('.navbar-nav.nav-main .btn-search').on('click', function(e) {
    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .empty-state').removeClass('d-none');
    }, 3500);
  });

  $(window).on('resize', function(e) {
    if ($(window).width() > 992) {
      if ($container.find('.nav-main').hasClass('d-block')) {
        $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
        $container.find('.nav-main').removeClass('d-block');
      }
    }
  });

  $container.find('.nav-main .input-group .btn-search').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
    var search = $container.find('.nav-main .input-group .form-control').val();
    $container.find('.nav-item-result .item-text').text(search);
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $container.find('.nav-main .input-group .form-control').val('');
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-toggle').click(function(e) {
    e.stopPropagation();
    $container.find('.nav-main .dialog').toggleClass('open');
    $container.find('.nav-main .dialog .dialog-menu').toggleClass('show');
  });

  $(document).on('click', function(e) {
    if (($(e.target).closest('.dialog-menu').length === 0)
        && $container.find('.nav-main .dialog').hasClass('open')) {
      $container.find('.nav-main .dialog').removeClass('open');
      $container.find('.nav-main .dialog .dialog-menu').removeClass('show');
    }
  });

  $container.find('.nav-main .dialog .dialog-menu .btn-primary').on('click', function(e) {
    var selectedCurriculum = $('#selCurriculum').selectpicker('val');
    var query = (selectedCurriculum === 'All') ? '' : 'curriculum:' + selectedCurriculum;

    var selectedGrade = $('#selGrade').selectpicker('val');
    query += (selectedGrade === 'All') ? '' : ' grade:' + selectedGrade;

    var selectedSubject = $('#selSubjet').selectpicker('val');
    query += (selectedSubject === 'All') ? '' : ' subject:' + selectedSubject;

    var keyword = $(txtKeyword).val();
    query += (query === '') ? keyword : ' ' + keyword;
    $container.find('.nav-main .input-group .form-control').val(query);
    $container.find('.nav-main .dialog').removeClass('open');
    $container.find('.nav-main .dialog .dialog-menu').removeClass('show');
  });

  $container.find('.btn-list-view').on('click', function(e) {
    $container.find('.btn-card-view').removeClass('d-none');
    $(this).addClass('d-none');

    $container.find('.article-body .card-group').addClass('d-none');
    $container.find('.article-body .table-head').removeClass('d-none');
    $container.find('.article-body .table-body').removeClass('d-none');
  });

  $container.find('.btn-card-view').on('click', function(e) {
    $container.find('.btn-list-view').removeClass('d-none');
    $(this).addClass('d-none');

    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');
    $container.find('.article-body .card-group').removeClass('d-none');
  });

  $container.find('.table-body tr a').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    $('.modal-resource-preview').on('show.bs.modal', function (e) {
      setTimeout(function() {
        $('.modal-backdrop.show').addClass('modal-backdrop-preview');
      });
    });
    $('.modal-resource-preview').on('hide.bs.modal', function (e) {
      $('.modal-resource-preview .content').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/hE834L-rRtE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    });
    $('.modal-resource-preview').modal('show');
  });

  $container.find('.table-body tr').on('click', function(e) {
    if (e.shiftKey) {
      e.preventDefault();

      if ($(this).parent().find('.table-active-first').length > 0) {
        $(this).parent().find(':not(.table-active-first)').removeClass('table-active');
        if ($(this).siblings('.table-active-first').index() < $(this).index()) {
          var $nextSibling = $(this).siblings('.table-active-first').next();
          while (($nextSibling.index() > -1) && ($nextSibling.index() <= $(this).index())) {
            $nextSibling.addClass('table-active');
            $nextSibling = $nextSibling.next();
          };
        } else {
          var $prevSibling = $(this).siblings('.table-active-first').prev();
          while ($prevSibling.index() >= $(this).index()) {
            $prevSibling.addClass('table-active');
            $prevSibling = $prevSibling.prev();
          };
        }
        updateActionButtonsStyles();
        return;
      }
    }

    if ($(this).siblings('.table-active').length > 0) {
      $(this).siblings('.table-active').removeClass('table-active');
      $(this).siblings('.table-active-first').removeClass('table-active-first');

      if ($(this).hasClass('table-active')) {      
        if (!$(this).hasClass('table-active-first')) {
          $(this).addClass('table-active-first');
        }
      } else {
        $(this).addClass('table-active');
        $(this).addClass('table-active-first');
      }
    } else {
      $(this).siblings('.table-active').removeClass('table-active');
      $(this).siblings('.table-active-first').removeClass('table-active-first');

      if ($(this).hasClass('table-active')) {      
        $(this).removeClass('table-active');
        $(this).removeClass('table-active-first');
      } else {
        $(this).addClass('table-active');
        $(this).addClass('table-active-first');
      }
    }
    updateActionButtonsStyles();
  });

  $container.find('.table-body tr .btn').on('click', function(e) {
    e.stopPropagation();

    var $model = $('.modal-resource-details');
    var $row = $(this).closest('tr');
    $model.find('.modal-title').text($row.find('td:nth-child(2)').text());
    $model.find('.attribute:nth-child(1) .attribute-value')
      .text($row.find('td:nth-child(3)').text());
    $model.find('.attribute:nth-child(2) .attribute-value')
      .text($row.find('td:nth-child(4)').text());
    $model.find('.attribute:nth-child(3) .attribute-value')
      .text($row.find('td:nth-child(5)').text());
    $model.find('.attribute:nth-child(4) .attribute-value')
      .text($row.find('td:nth-child(6)').text());
    $('.modal-resource-details').modal('show');
  });

  $container.find('.card-group .card').on('click', function(e) {
    if (e.shiftKey) {
      e.preventDefault();

      if ($(this).parent().find('.card-active-first').length > 0) {
        $(this).parent().find(':not(.card-active-first)').removeClass('card-active');
        if ($(this).siblings('.card-active-first').index() < $(this).index()) {
          var $nextSibling = $(this).siblings('.card-active-first').next();
          while (($nextSibling.index() > -1) && ($nextSibling.index() <= $(this).index())) {
            $nextSibling.addClass('card-active');
            $nextSibling = $nextSibling.next();
          };
        } else {
          var $prevSibling = $(this).siblings('.card-active-first').prev();
          while ($prevSibling.index() >= $(this).index()) {
            $prevSibling.addClass('card-active');
            $prevSibling = $prevSibling.prev();
          };
        }
        updateActionButtonsStyles();
        return;
      }
    }

    if ($(this).siblings('.card-active').length > 0) {
      $(this).siblings('.card-active').removeClass('card-active');
      $(this).siblings('.card-active-first').removeClass('card-active-first');

      if ($(this).hasClass('card-active')) {      
        if (!$(this).hasClass('card-active-first')) {
          $(this).addClass('card-active-first');
        }
      } else {
        $(this).addClass('card-active');
        $(this).addClass('card-active-first');
      }
    } else {
      $(this).siblings('.card-active').removeClass('card-active');
      $(this).siblings('.card-active-first').removeClass('card-active-first');

      if ($(this).hasClass('card-active')) {      
        $(this).removeClass('card-active');
        $(this).removeClass('card-active-first');
      } else {
        $(this).addClass('card-active');
        $(this).addClass('card-active-first');
      }
    }
    updateActionButtonsStyles();
  });
});
