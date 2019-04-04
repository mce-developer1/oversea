$(document).ready(function() {
  var $container = $('.article-lessons');

  function updateActionButtonsStyles() {
    var lessonsSelected = ($container.find('.table-body .table-active').length > 0);

    if (lessonsSelected) {
      if ($container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').removeClass('d-none');
      }

      if ($container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').removeClass('d-none');
      }

      if ($container.find('.btn-assign').hasClass('d-none')) {
        $container.find('.btn-assign').removeClass('d-none');
      }

      if ($container.find('.btn-more').hasClass('d-none')) {
        $container.find('.btn-more').removeClass('d-none');
      }      
    } else {
      if (!$container.find('.btn-edit').hasClass('d-none')) {
        $container.find('.btn-edit').addClass('d-none');
      }

      if (!$container.find('.btn-share').hasClass('d-none')) {
        $container.find('.btn-share').addClass('d-none');
      }

      if (!$container.find('.btn-assign').hasClass('d-none')) {
        $container.find('.btn-assign').addClass('d-none');
      }

      if (!$container.find('.btn-more').hasClass('d-none')) {
        $container.find('.btn-more').addClass('d-none');
      }      
    }

    if ($(window).width() < 992) {
      if (lessonsSelected) {
        if ($container.find('.divider-search').hasClass('d-none')) {
          $container.find('.divider-search').removeClass('d-none');
        }
      } else {
        if (!$container.find('.divider-search').hasClass('d-none')) {
          $container.find('.divider-search').addClass('d-none');
        }
      }
    } else {
      if (!$container.find('.divider-search').hasClass('d-none')) {
        $container.find('.divider-search').addClass('d-none');
      }
    }
  }

  function searchLessons(e) {
    var search = $container.find('.nav-main .input-group .aa-input').val();
    if (search === '') return;

    $container.find('.article-body .loading-state').removeClass('d-none');
    $container.find('.article-body .navbar').addClass('d-none');
    $container.find('.article-body .table-head').addClass('d-none');
    $container.find('.article-body .table-body').addClass('d-none');

    setTimeout(function() {
      $container.find('.article-body .loading-state').addClass('d-none');
      $container.find('.article-body .navbar').removeClass('d-none');
      $container.find('.article-body .table-head').removeClass('d-none');
      $container.find('.article-body .table-body').removeClass('d-none');
      $container.find('.nav-item-result .item-text').text(search);

      var searchTitle = 'Search results for "'+ search + '"';
      $container.find('.article-body .navbar .navbar-text').html(searchTitle);
    }, 5000);
  }

  $container.find('.nav-main .input-group .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
    displayKey: 'name',
    source: function(query, callback) {
      var records = [
        { name: 'Counting To 10' }, 
        { name: 'Comparing Numbers' },
        { name: 'Making Number Patterns' }, 
        { name: 'Making Number Bonds' },
        { name: 'Making Addition Stories' },
        { name: 'Making Subtraction Stories' },
        { name: 'Making Fact Families' },
        { name: 'Making Patterns With Shapes' }
      ];
      var pattern = new RegExp(query, 'i');
      var hits = records.filter(function(record) {
        return record.name.match(pattern);
      });
      hits.forEach(function(hit) {
        var match = hit.name.match(pattern)[0];
        var highlighted = '<em>' + match + '</em>';
        hit.highlighted = hit.name.replace(match, highlighted);
      });
      callback(hits);
    },
    templates: {
      suggestion: function(suggestion) {
        return suggestion.highlighted;
      }
    }
  }]);

  $container.find('.navbar-nav:not(.nav-main) .btn-search').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').addClass('d-none');
    $container.find('.nav-main').addClass('d-block');
  });

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchLessons);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchLessons(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $container.find('.nav-main .input-group .aa-input').val('');
    searchLessons(e);
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
    $container.find('.nav-main .input-group .aa-input').val(query);
    $container.find('.nav-main .dialog').removeClass('open');
    $container.find('.nav-main .dialog .dialog-menu').removeClass('show');
  });

  $container.find('.navbar-nav .btn-create').on('click', function(e) {
    if (/\/teacher\//i.test(location.href)) {
      location.href = '/teacher/lessons/create_lesson';
    } else if (/\/admin\//i.test(location.href)) {
      location.href = '/admin/lessons/create_lesson';
    }
  });

  $container.find('.navbar-nav .btn-share').on('click', function(e) {
    $('.modal-resource-share').modal('show');
  });

  $container.find('.dropdown-menu .item-delete').on('click', function(e) {
    $('.modal-lesson-delete-confirmation').modal('show');
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

    var $model = $('.modal-lesson-details');
    var $row = $(this).closest('tr');
    $model.find('.modal-title').text($row.find('td:nth-child(2)').text());
    $model.find('.attribute:nth-child(1) .attribute-value')
      .text($row.find('td:nth-child(3)').text());
    $model.find('.attribute:nth-child(2) .attribute-value')
      .text($row.find('td:nth-child(4)').text());
    if ($row.find('td:nth-child(5) a[data-toggle="popover"]').length === 0) {
      $model.find('.attribute:nth-child(3) .attribute-value')
        .text($row.find('td:nth-child(5)').text());
    } else {
      $model.find('.attribute:nth-child(3) .attribute-value')
        .html($row.find('td:nth-child(5) a[data-toggle="popover"]').attr('data-content'));
    }
    if ($row.find('td:nth-child(6) a[data-toggle="popover"]').length === 0) {
      $model.find('.attribute:nth-child(4) .attribute-value')
        .text($row.find('td:nth-child(6)').text());
    } else {
      $model.find('.attribute:nth-child(4) .attribute-value')
        .html($row.find('td:nth-child(6) a[data-toggle="popover"]').attr('data-content'));
    }
    $model.find('.attribute:nth-child(5) .attribute-value')
      .text($row.find('td:nth-child(7)').text());
    $('.modal-lesson-details').modal('show');
  });

  $('.modal-resource-share .btn-primary').on('click', function(e) {
    if ($('.modal-resource-share .users-permissions').hasClass('d-none')) {
      $('.modal-resource-share .form-add-user .text-danger').removeClass('d-none');
    } else {
      $('.modal-resource-share .form-add-user .text-danger').addClass('d-none');
    }
  });

  $('.modal-resource-share .form-add-user .btn-add').on('click', function(e) {
    if ($('.modal-resource-share .list-users .list-group-item').length > 0) {
      $('.modal-resource-share .users-permissions').removeClass('d-none');
      $('.modal-resource-share .form-add-user .text-muted').addClass('d-none');
    }
  });

  $('.modal-resource-share .form-add-user .btn-select').on('click', function(e) {
    $('.modal-resource-share .modal-content').addClass('d-none');
    $('.modal-user-select').on('hidden.bs.modal', function (e) {
      $('.modal-resource-share .modal-content').removeClass('d-none');
    });
    $('.modal-user-select').modal('show');
  });

  $('.modal-resource-share .list-users .list-group-item .btn-light').on('click', function(e) {
    if ($('.modal-resource-share .list-users .list-group-item').length === 1) {
      $('.modal-resource-share .list-users').addClass('d-none');
    }

    $(this).closest('.list-group-item').remove();
  });

  $('.modal-resource-share .form-add-user .input-autocomplete').autocomplete({ hint: true, debug: false }, [{
    displayKey: 'name',
    source: function(query, callback) {
      var records = [
        { name: 'Aaron Tan' }, 
        { name: 'Arya Suman' },
        { name: 'Ashar Ahmad' }, 
        { name: 'Chua Chin Hui' },
        { name: 'Derrick Lee' }
      ];
      var pattern = new RegExp(query, 'i');
      var hits = records.filter(function(record) {
        return record.name.match(pattern);
      });
      hits.forEach(function(hit) {
        var match = hit.name.match(pattern)[0];
        var highlighted = '<em>' + match + '</em>';
        hit.highlighted = hit.name.replace(match, highlighted);
      });
      callback(hits);
    },
    templates: {
      suggestion: function(suggestion) {
        return suggestion.highlighted;
      }
    }
  }]);

  function updateComponentsActionButtonsStyles() {
    var componentsSelected = ($('.article-lesson-resources .table-body .table-active').length > 0);

    if (componentsSelected) {
      if ($('.article-create-lesson .article-header .btn-edit').hasClass('d-none')) {
        $('.article-create-lesson .article-header .btn-edit').removeClass('d-none');
      }

      if ($('.article-create-lesson .article-header .btn-move-to').hasClass('d-none')) {
        $('.article-create-lesson .article-header .btn-move-to').removeClass('d-none');
      }

      if ($('.article-create-lesson .article-header .divider-preview').hasClass('d-none')) {
        $('.article-create-lesson .article-header .divider-preview').removeClass('d-none');
      }
    } else {
      if (!$('.article-create-lesson .article-header .btn-edit').hasClass('d-none')) {
        $('.article-create-lesson .article-header .btn-edit').addClass('d-none');
      }

      if (!$('.article-create-lesson .article-header .btn-move-to').hasClass('d-none')) {
        $('.article-create-lesson .article-header .btn-move-to').addClass('d-none');
      }

      if (!$('.article-create-lesson .article-header .divider-preview').hasClass('d-none')) {
        $('.article-create-lesson .article-header .divider-preview').addClass('d-none');
      }
    }
  }

  function showFolderResources() {
    $('.article-lesson-resources .nav-main').addClass('d-none');
    $('.article-lesson-resources .navbar:not(.nav-main)').removeClass('d-none');
    $('.article-lesson-resources .navbar:not(.nav-main) .btn-add-resource').removeClass('d-none');
    $('.article-lesson-resources .navbar:not(.nav-main) .btn-actions').removeClass('d-none');
    $('.article-lesson-resources .table-head').removeClass('d-none');
    $('.article-lesson-resources .table-body').removeClass('d-none');
  }

  $('.form-lesson-attributes .btn-create').on('click', function(e) {
    $('.article-create-lesson .navbar-nav .btn-preview').removeClass('d-none');
    $('.article-create-lesson .navbar-nav .divider-close').removeClass('d-none');
    $('.article-create-lesson .navbar-nav .btn-close').removeClass('d-none');
    $('.article-create-lesson .form-lesson-attributes').addClass('d-none');    
    $('.article-create-lesson .article-lesson-resources').removeClass('d-none');

    if ($(window).width() < 768) {
      $('.article-create-lesson .btn-more').removeClass('d-none');
    }

    var tree = $('.article-lesson-resources .tree-resources').get(0);
    var sortableTree = Sortable.create(tree, {
      animation: 350,
      onStart: function(e) {
        console.log(e.oldIndex, e.newIndex);
      },
      onSort: function(e) {
        console.log(e.oldIndex, e.newIndex);
      }
    });

    var tbody = $('.article-lesson-resources .table-body tbody').get(0);
    var sortableTable = Sortable.create(tbody, {
      animation: 350,
      handle: '.btn-handle',
      onStart: function(e) {
        console.log(e.oldIndex, e.newIndex);
      },
      onSort: function(e) {
        console.log(e.oldIndex, e.newIndex);
      }
    });
  });
  
  $('.article-lesson-resources .article-sidebar .btn-edit-lesson').on('click', function(e) {
    $('.modal-lesson-edit-attributes').modal('show');
  });

  $('.article-lesson-resources .article-sidebar .btn-add-folder').on('click', function(e) {
    $('.modal-lesson-folder-create').modal('show');
  });

  $('.article-lesson-resources .article-body .btn-edit-folder').on('click', function(e) {
    $('.modal-lesson-folder-edit').modal('show');
  });

  $('.article-lesson-resources .article-body .link-add-mylibrary').on('click', function(e) {
    $('.modal-resource-mylibrary-add').on('hide.bs.modal', function (e) {
      showFolderResources();
    });
    $('.modal-resource-mylibrary-add').modal('show');
  });

  $('.article-lesson-resources .article-body .link-add-myresources').on('click', function(e) {
    $('.modal-resource-myresources-add').on('hide.bs.modal', function (e) {
      showFolderResources();
    });
    $('.modal-resource-myresources-add').modal('show');
  });

  $('.article-lesson-resources .article-body .btn-add-resource').on('click', function(e) {
    $('.modal-resource-type-select').modal('show');
  });

  $('.article-lesson-resources .article-body .item-add-resource').on('click', function(e) {
    $('.modal-resource-type-select').modal('show');
  });

  $('.modal-resource-type-select .navbar .link-add-mylibrary').on('click', function(e) {
    $('.modal-resource-mylibrary-add').on('hide.bs.modal', function (e) {
      showFolderResources();
    });
    $('.modal-resource-type-select').modal('hide');
    $('.modal-resource-mylibrary-add').modal('show');
  });

  $('.modal-resource-type-select .navbar .link-add-myresources').on('click', function(e) {
    $('.modal-resource-myresources-add').on('hide.bs.modal', function (e) {
      showFolderResources();
    });
    $('.modal-resource-type-select').modal('hide');
    $('.modal-resource-myresources-add').modal('show');
  });

  $('.article-lesson-resources .table-body tr').on('click', function(e) {
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
        updateComponentsActionButtonsStyles();
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
    updateComponentsActionButtonsStyles();
  });

  $('a[data-toggle="popover"]').on('click', function(e) {
    e.stopPropagation();
  });

  $('a[data-toggle="popover"]').popover({
    html: true,
    container: 'body',    
    placement: 'top',
    trigger: 'focus'
  });

  $(window).on('resize', function(e) {
    if ($(window).width() > 992) {
      if ($container.find('.nav-main').hasClass('d-block')) {
        $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
        $container.find('.nav-main').removeClass('d-block');
      }
    }
  });
});
