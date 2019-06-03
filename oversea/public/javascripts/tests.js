$(document).ready(function() {
  var $container = $('.article-tests');

  function updateActionButtonsStyles() {
    var testsSelected = ($container.find('.table-body .table-active').length > 0);

    if (testsSelected) {
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
      if (testsSelected) {
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

  function searchTests(e) {
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

  $container.find('.nav-main .input-group .input-autocomplete').on('keyup', function(e) {
    if ($(this).val().trim() !== '') {
      $container.find('.nav-main .input-group .btn-clear').removeClass('d-none');
    } else {
      $container.find('.nav-main .input-group .btn-clear').addClass('d-none');
    }
  });

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

  $container.find('.navbar-nav.nav-main .btn-search').on('click', searchTests);
  $container.find('.nav-main .input-group .aa-input').on('keypress', function(e) {
    if (e.which === 13) searchTests(e);
  });

  $container.find('.navbar-nav.nav-main .btn-back').on('click', function(e) {
    $container.find('.navbar-nav:not(.nav-main)').removeClass('d-none');
    $container.find('.nav-main').removeClass('d-block');
  });

  $container.find('.nav-main .input-group .btn-clear').on('click', function(e) {
    $(this).addClass('d-none');
    $container.find('.nav-main .input-group .aa-input').val('');
    searchTests(e);
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
      location.href = '/teacher/tests/create_test';
    } else if (/\/admin\//i.test(location.href)) {
      location.href = '/admin/tests/create_test';
    }
  });

  $container.find('.navbar-nav .btn-share').on('click', function(e) {
    $('.modal-resource-share').modal('show');
  });

  $container.find('.dropdown-menu .item-delete').on('click', function(e) {
    $('.modal-test-delete-confirmation').modal('show');
  });

  $container.find('.table-body tr .custom-control-input').on('click', function(e) {
    var $row = $(this).closest('tr');
        
    if ($row.hasClass('table-active')) {
      $row.removeClass('table-active');
    } else {
      $row.addClass('table-active');
    }
    updateActionButtonsStyles();
  });

  $container.find('.table-body tr').on('click', function(e) {
    if ($(e.target).is('a')) return;
    if ($(e.target).closest('a') > 0) return;
    if ($(e.target).hasClass('.badge')) return;
    if ($(e.target).closest('.badge').length > 0) return;
    if ($(e.target).hasClass('.btn')) return;
    if ($(e.target).closest('.btn').length > 0) return;
    if ($(e.target).hasClass('.custom-control')) return;
    if ($(e.target).closest('.custom-control').length > 0) return;
    if ($(this).hasClass('table-active')) {
      $(this).removeClass('table-active');
      $(this).find('.custom-control-input').prop('checked', false);
    } else {
      $(this).addClass('table-active');
      $(this).find('.custom-control-input').prop('checked', true);
    }
    updateActionButtonsStyles();
  });

  $container.find('.table-body tr .btn').on('click', function(e) {
    e.stopPropagation();

    var $model = $('.modal-test-details');
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
    $('.modal-test-details').modal('show');
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

  $('.form-test-attributes .btn-create').on('click', function(e) {
    $('.article-create-test .navbar-nav .btn-preview').removeClass('d-none');
    $('.article-create-test .navbar-nav .divider-close').removeClass('d-none');
    $('.article-create-test .navbar-nav .btn-close').removeClass('d-none');
    $('.article-create-test .form-test-attributes').addClass('d-none');    
    $('.article-create-test .article-test-components').removeClass('d-none');

    var list = $('.article-test-components .list-components').get(0);
    var sortableList = Sortable.create(list, {
      animation: 350,
      scroll: true,
      bubbleScroll: true,
      handle: '.btn-handle',
      onStart: function(e) {
        console.log(e.oldIndex, e.newIndex);
      },
      onSort: function(e) {
        console.log(e.oldIndex, e.newIndex);
      },
      onMove: function(e) {
        return !$(e.related).hasClass('component-section-default');
      }
    });
  });

  $('.article-create-test .btn-close').on('click', function(e) {
    var url = window.location.pathname;
    window.location = url.replace('/create_test', '/tests');
  });

  function toggleComponentMode($component) {
    if ($component.hasClass('component-section')) {
      if ($component.hasClass('component-editing')) {
        $component.find('.form-textarea').each(function(index, textarea) {
          window.Utils.destroyTextEditor(textarea);
        });
        $component.find('.section-summary').removeClass('d-none');
        $component.find('.section-edit').addClass('d-none');
        $component.removeClass('component-editing');
      } else {
        $component.siblings('.component-editing').each(function(index, component) {
          toggleComponentMode($(component));
        });
        $component.find('.form-textarea').each(function(index, textarea) {
          window.Utils.initTextEditor(textarea);
        });
        $component.find('.section-summary').addClass('d-none');
        $component.find('.section-edit').removeClass('d-none');
        $component.addClass('component-editing');
        scrollToComponent($component);
      }
    } else {
      if ($component.hasClass('component-editing')) {
        $component.find('.form-textarea').each(function(index, textarea) {
          window.Utils.destroyTextEditor(textarea);
        });
        $component.find('.question-preview').removeClass('d-none');
        $component.find('.question-edit').addClass('d-none');
        $component.removeClass('component-editing');
      } else {
        $component.siblings('.component-editing').each(function(index, component) {
          toggleComponentMode($(component));
        });
        $component.find('.form-textarea').each(function(index, textarea) {
          window.Utils.initTextEditor(textarea);
        });
        $component.find('.question-preview').addClass('d-none');
        $component.find('.question-edit').removeClass('d-none');
        $component.addClass('component-editing');
        scrollToComponent($component);
      }
    }    
  }

  function scrollToComponent($component) {
    var positionTop = $component.position().top;
    var scrollTop = (positionTop > 80) ? (positionTop - 80) : 0;
    $('.app-container').scrollTop(scrollTop);
  }

  function showAddResourceModal(srcUrl) {
    $('.modal-resource-resource-add').find('iframe').attr('src', srcUrl);
    $('.modal-resource-resource-add').on('keydown', function(e) {
      if ((e.which == 27) && window._pageDirty) {
        e.which = Number.NaN;
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-resource-add').modal('hide');
        });
      }
    });
    $('.modal-resource-resource-add .btn-close').on('click', function(e) {
      if (window._pageDirty) {
        e.stopPropagation();
        showCancelUploadConfirmationModal(function() {
          $('.modal-resource-resource-add').modal('hide');
        });
      }
    });
    $('.modal-resource-resource-add').modal('show');
  }
  
  $('.article-test-components .navbar .btn-edit-test').on('click', function(e) {
    $('.modal-test-edit-attributes').modal('show');
  });

  $('.article-test-components .list-components').on('click', '.section-summary', function(e) {
    var $component = $(this).closest('.component');
    toggleComponentMode($component);
  });

  $('.article-test-components .list-components').on('click', '.section-edit .btn-done', function(e) {
    var $component = $(this).closest('.component');
    toggleComponentMode($component);
  });

  $('.article-test-components .list-components').on('click', '.question-preview', function(e) {
    var $component = $(this).closest('.component');
    toggleComponentMode($component)
  });

  $('.article-test-components .list-components').on('click', '.question-preview .custom-control-input', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $('.article-test-components .list-components').on('click', '.question-edit .btn-done', function(e) {
    var $component = $(this).closest('.component');
    toggleComponentMode($component)
  });

  $('.article-test-components .list-components').on('click', '.question-edit .btn-generate-answers', function(e) {
    var $form = $(this).closest('.form-edit-question');
    $form.find('.question-answers').removeClass('d-none');
  });

  $('.article-test-components .article-body .dropup .item-add-questions').on('click', function(e) {
    showAddResourceModal('/shared/add_questions');
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
