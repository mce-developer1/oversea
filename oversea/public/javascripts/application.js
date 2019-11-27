window.Utils = {
  initLocalization: function(language, translation, options) {
    options = $.extend({
      interpolation: true,
      serverTimezoneOffset: 0
    }, options);
    moment.locale(language);

    var resources = {};
    resources[language] = {
      translation: translation
    };

    i18next.init({
      lng: language,
      resources: resources,
      interpolation: {
        format: function (value, format, lng) {
          function formatDatetime(datetime, defaultValue, dateonly) {
            if (!datetime.isValid()) return defaultValue;
            var clientTimezoneOffset = moment().utcOffset();
            var differTimezoneOffset = clientTimezoneOffset - options.serverTimezoneOffset;
            var timezoneOffset = clientTimezoneOffset + differTimezoneOffset;

            if (datetime.isSame(moment(), 'day') && !dateonly) {
              return datetime.utcOffset(timezoneOffset).local(true).fromNow();
            } else if (format === 'DAYS') {
              return datetime.utcOffset(timezoneOffset).local(true).fromNow();
            } else {
              var displayFormat = ((format === 'DATE') || (format === 'DATEONLY')) ? 'll' : 'lll';
              return datetime.utcOffset(timezoneOffset).format(displayFormat);
            }
          }

          if (!options.interpolation) return value;
          switch (format) {
            case "DAYS":
            case "DATE":
            case "DATETIME":
              var pattern = "YYYY-MM-DDTHH:mm:ss";
              var date = moment(value, pattern, true);
              return formatDatetime(date, value, false);
            case "DATEONLY":
            case "DATETIMEONLY":
              var pattern = "YYYY-MM-DDTHH:mm:ss";
              var date = moment(value, pattern, true);
              return formatDatetime(date, value, true);
            default:
              return value;
          }
        }
      }
    },
    function (err, t) {
      jqueryI18next.init(i18next, $, {
        useOptionsAttr: true
      });
      if (options.initCallback) {
        options.initCallback.call(null, err, t);
      }
    });
  },
  initTextEditor: function(target, options) {
    options = options ? options : {};
    options = $.extend({
      images_upload_url: '/shared/upload',
      image_uploadtab: true,
      image_dimensions: false
      //language: 'id',
      //language_url: '/static/tinymce/langs/id.js'
    }, options);

    if (tinymce.Env.desktop) {
      // TinyMCE - add wrapper to scroll toolbar when user scrolls window.
      if ($(target).closest('.texteditor').length === 0) {
        window.editorCount = (window.editorCount !== undefined) ? ++window.editorCount : 0;
        $(target).wrap('<div class="texteditor" id="editor_' + window.editorCount + '"></div>');
        $(target).parent('.texteditor').append('<div class="texteditor-toolbar d-none"></div>');
      }
      options = $.extend(options, {
        fixed_toolbar_container: '.texteditor-toolbar'
      });
    } else {
      options = $.extend(options, {
        toolbar_drawer: 'sliding' 
      });
    }

    tinymce.init($.extend(options, {
      target: target,
      min_height: 80,
      max_height: 320,
      autoresize_bottom_margin: 20,
      inline: tinymce.Env.desktop,
      menubar: false,
      statusbar: false,
      plugins: ['autoresize', 'link', 'image', 'media', 'lists', 'table'],
      toolbar: [
        'undo redo',
        'fontsizeselect',
        'bold italic underline',
        'forecolor backcolor',
        'link image media',
        'alignleft aligncenter alignright alignjustify',
        'bullist numlist outdent indent',
        'table'
      ],
      mobile: {
        plugins: ['autoresize', 'link', 'image', 'lists'],
        toolbar: [
          'undo', 'redo',
          'fontsizeselect',
          'bold', 'italic', 'underline',
          'forecolor',
          'link', 'image',
          'bullist', 'numlist'
        ]
      },
      init_instance_callback: function (editor) {
        editor.on('focus', function (e) {
          if (tinymce.Env.desktop) {            
            // TinyMCE - update toolbar position according to editable area.
            var texteditor = $(editor.contentAreaContainer).closest('.texteditor');
            var toolbar = $(texteditor).find('.texteditor-toolbar');
            $(toolbar).removeClass('d-none');
            $(toolbar).css('top', '-' + $(toolbar).height() + 'px');
          }
        });

        editor.on('blur', function (e) {
          if (tinymce.Env.desktop) {
            var texteditor = $(editor.contentAreaContainer).closest('.texteditor');
            var toolbar = $(texteditor).find('.texteditor-toolbar');
            $(toolbar).addClass('d-none');
          }
        });

        editor.on('Change', function (e) {
          if (options.changeCallback) {
            options.changeCallback();
          }
        });

        if (tinymce.Env.desktop) {
          if (editor.settings.fixed_toolbar_container === '.texteditor-toolbar') {
            var texteditor = $(editor.contentAreaContainer).closest('.texteditor');
            var container = '#' + $(texteditor).attr('id') + ' .texteditor-toolbar';
            editor.settings.fixed_toolbar_container = container;console.log(container);
          }
        }
      }
    }));
  },
  destroyTextEditor: function(target) {
    var editor = tinymce.get(target.id);
    if (editor.isDirty()) editor.save();
    tinymce.remove(editor);
  },
  getFileIcon: function(file) {
    var $icon = $('<i class="fas"></i>');
    
    switch (file.type) {
      case 'image/jpeg':
      case 'image/png':
        $icon.addClass('fa-file-image');
        break;
      case 'text/html':
      case 'text/css':
      case 'text/javascript':
        $icon.addClass('fa-file-code');
        break;
      case 'text/csv':
        $icon.addClass('fa-file-csv');
        break;
      case 'audio/mp3':
      case 'audio/ogg':
      case 'audio/webm':
        $icon.addClass('fa-file-audio');
        break;
      case 'video/mp4':
      case 'video/ogg':
      case 'video/webm':
        $icon.addClass('fa-file-video');
        break;
      case 'application/word':
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        $icon.addClass('fa-file-word');
        break;
      case 'application/excel':
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        $icon.addClass('fa-file-excel');
        break;
      case 'application/pdf':
        $icon.addClass('fa-file-pdf');
        break;
      case 'application/zip':
        $icon.addClass('fa-file-archive');
        break;
      default:
        $icon.addClass('fa-file');
        break;
    }

    return $icon;
  },
  showProcessingOverlay: function() {
    $('body').append('<div class="processing-overlay">'
      + '<div class="spinner-border text-primary" role="status">'
      + '<span class="sr-only">Processing...</span>'
      + '</div></div>');
  },
  hideProcessingOverlay: function() {
    $('.processing-overlay').remove();
  },
  showNotificationToast: function(message, delay) {
    $('.toast-notification .btn-close').off('click');
    $('.toast-notification .btn-close').on('click', function(e) {
      $('.toast-notification').removeClass('show');
    });
    $('.toast-notification .toast-body').html(message);
    $('.toast-notification').addClass('show');
    setTimeout(function() {
      $('.toast-notification').removeClass('show');
    }, (delay || 6000));
  }
};

$(document).ready(function() {
  $('.app-header .list-notifications').on('click', '.list-group-item-action', function(e) {
    $('.modal-notification-view').modal('show');
  });

  $('.app-header .btn-notifications').on('click', function(e) {
    setTimeout(function waitDropdownTrigger() {
      $('.app-header .btn-notifications .badge').remove();
    });
  });

  /*$('.app-content').on('contextmenu', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });*/

  $(document).on('autocomplete:opened', function(e) {
    var autocomplete = $(e.target).closest('.algolia-autocomplete');
    $(autocomplete).find('.aa-dropdown-menu').css('z-index', '');
  });

  $(document).on('show.bs.collapse', function(e) {
    if (!$(e.target).closest('.collapsible').hasClass('show')) {
      $(e.target).closest('.collapsible').addClass('show');
    }
  });

  $(document).on('hide.bs.collapse', function(e) {
    if ($(e.target).closest('.collapsible').hasClass('show')) {
      $(e.target).closest('.collapsible').removeClass('show');
    }
  });

  $(document).on('click', '[data-toggle="password"]', function(e) {
    var icon = $(this).find('.fas');
    $(icon).toggleClass('fa-eye-slash');

    var target = $(this).attr('data-target');
    if ($(target).attr("type") === 'password') $(target).attr('type', 'text');
    else $(target).attr('type', 'password');
  });

  $(document).on('click', '[data-toggle="dialog"]', function(e) {
    var target = $(this).attr('data-target');
    var dialog = target ? target : $(e.target).closest('.dialog');

    if (dialog && !$(dialog).hasClass('open')) {
      setTimeout(function() {
        $(dialog).toggleClass('open');
        $(dialog).find('.dialog-menu').toggleClass('show');
      });
    }
  });

  $(document).on('hide.bs.dropdown', function(e) {
    var header = $(e.target).closest('.article-header');
    
    if ($(header).hasClass('dropdown-open')) {
      $(header).removeClass('dropdown-open');
    }
  });

  $(document).on('show.bs.dropdown', function(e) {
    var header = $(e.target).closest('.article-header');

    if (!$(header).hasClass('dropdown-open')) {
      $(header).addClass('dropdown-open');
    }

    if ($(e.target).closest('.dialog-menu').length === 0) {
      if ($('.dialog.open').length === 1) {
        $('.dialog.open .dialog-menu').removeClass('show');
        $('.dialog.open').removeClass('open');
      }
    }
  });

  $(document).on('click', function(e) {
    if ($(e.target).closest('.dialog-menu').length === 0) {
      $('.dialog.open .dialog-menu').removeClass('show');
      $('.dialog.open').removeClass('open');
    }
  });

  $(document).on('click', '[data-toggle="drawer"]', function(e) {
    e.preventDefault();

    var target = $(this).attr('data-target');
    if ($(target).hasClass('show')) $('.drawer-toggle').remove();
    else $('body').append('<div class="drawer-backdrop"></div>');
    $(target).toggleClass('show');
  });

  $(document).on('click', '.drawer-backdrop', function(e) {    
    $('.drawer-backdrop').remove();
    $('.drawer.show').removeClass('show');
  });

  $(document).on('click', '[data-toggle="sidebar"]', function(e) {
    e.preventDefault();
    
    var target = $(this).attr('data-target');
    
    if ($(target).hasClass('collapse-sidebar')) {
      $(target).removeClass('collapse-sidebar')
    } else {
      $(target).addClass('collapse-sidebar');
    }
  });

  $(document).on('show.bs.modal', function (e) {
    if ($('.modal.show').length > 0) {
      if (!$('.modal.show').hasClass('modal-base')) {
        $('.modal.show').addClass('modal-base');
      }
    }

    if (!$('.modal-backdrop.show').hasClass('modal-backdrop-base')) {
      $('.modal-backdrop.show').addClass('modal-backdrop-base');
    }

    if ((window != window.top) && window.top.postMessage) {
      window.top.postMessage('show.bs.modal', '*');
    }
  });

  $(document).on('shown.bs.modal', function (e) {
    if ((window != window.top) && window.top.postMessage) {
      window.top.postMessage('shown.bs.modal', '*');
    }

    $(document).off('focusin.modal');
  });

  $(document).on('hide.bs.modal', function (e) {
    if ($('.modal.show.modal-base').length > 0) {
      $('.modal.show.modal-base').removeClass('modal-base');
    }

    if ((window != window.top) && window.top.postMessage) {
      window.top.postMessage('hide.bs.modal', '*');
    }
  });

  $(document).on('hidden.bs.modal', function (e) {
    if ($('.modal.show').length > 0) {
      if (!$('body').hasClass('modal-open')) {
        $('body').addClass('modal-open');
      }
    }

    if ((window != window.top) && window.top.postMessage) {
      window.top.postMessage('hidden.bs.modal', '*');
    }
  });

  if (Dropzone && Dropzone.prototype) {
    var initProxied = Dropzone.prototype.defaultOptions.init;
    Dropzone.prototype.defaultOptions.init = function() {
      var cancelEventHandler = function(e) {
        return false;
      };

      var destroyProxied = this.destroy;
      this.destroy = function() {
        $(document).off('dragover', cancelEventHandler);
        $(document).off('drop', cancelEventHandler);
        destroyProxied.apply(this, [].slice.call(arguments));
      };

      $(document).on('dragover', cancelEventHandler);
      $(document).on('drop', cancelEventHandler);
      initProxied.apply(this, [].slice.call(arguments));
    };
  }

  if (window === window.top) {
    window.addEventListener("message", function(e) {
      switch (e.data) {
        case 'show.bs.modal':
          if (!$('.modal.show .modal-iframe').hasClass('modal-muted')) {
            $('.modal.show .modal-iframe').addClass('modal-muted');
          }
          break;
        case 'hidden.bs.modal':
          if ($('.modal.show .modal-iframe').hasClass('modal-muted')) {
            $('.modal.show .modal-iframe').removeClass('modal-muted');
          }
          break;
        default:
          break;
      }
    }, false);
  }

	window._logStore = window._logStore || {
    endpoint: '/logging',
    bufferSize: 5,
    bufferTimeout: 3000,
    maxFailures: 3,
    argumentsSize: 3,
    logs: [],
    save: function() {
      var self = this;
      if (arguments.length < self.argumentsSize) return;
      clearTimeout(self._bufferTimeout);

      var params = arguments[2];
      if (typeof params === 'object') {
        params = $.param(params);
      } else if (typeof params === 'string') {
        params = params.trim();
      }

      var formatted = {
        module: arguments[0].trim(),
        action: arguments[1].trim(),
        params: params
      }
      self.logs.push(formatted);

      if (self.logs.length >= self.bufferSize) {
        self.send();
      } else {
        self._bufferTimeout = setTimeout(function() {
          delete self._bufferTimeout;
          self.send();
        }, self.bufferTimeout);
      }
    },
    send: function() {
      var self = this;
      if (self.logs.length === 0) return;

      var json = JSON.stringify({ logs: self.logs });
      $.post(self.endpoint, { data: json })
        .done(function(data) {
          self._failures = 0;
          self.logs = [];
        })
        .fail(function(data) {
          self._failures = self._failures || 0;
          self._failures++;

          if (self._failures !== self.maxFailures) {
            var delay = (1000 * self._failures);
            setTimeout(function() {
              self.send.apply(self);
            }, delay);
          } else {
            self._failures = 0;
          }
        });
    }
  };

  if (log && log.methodFactory) {
    var originalFactory = log.methodFactory;
    log.methodFactory = function (methodName, logLevel, loggerName) {
        var rawMethod = originalFactory(methodName, logLevel, loggerName);
        return function () {
          var logStore = window._logStore;
          logStore.save.apply(logStore, arguments);
          rawMethod.apply(undefined, arguments);
        };
    };
    log.setLevel('info');
  }

  $(window).on('beforeunload', function(e) {
    if (window._pageDirty) return 'Changes you made may not be saved.';
  });

  $(window).on('unload', function(e) {
    window._logStore.send();
  });

  $(window).on('resize', function(e) {
    if (window.tinymce && window.tinymce.Env.desktop) {
      // TinyMCE - resize toolbar when user resize window.
      if ($('.texteditor > .texteditor-toolbar:not(.d-none)').length === 1) {
        var toolbar = $('.texteditor > .texteditor-toolbar:not(.d-none)');
        $(toolbar).css('top', '-' + $(toolbar).height() + 'px');
      }
    }
  });

  if (window.tinymce && window.tinymce.DOM && window.tinymce.DOM.bind) {
    var tinymceBind = window.tinymce.DOM.bind;
    window.tinymce.DOM.bind = function(target, name, func, scope) {
      // TODO This is only necessary until https://github.com/tinymce/tinymce/issues/4355 is fixed
      if (name === 'mouseup' && func.toString().includes('throttle()')) {
          return func;
      } else {
          return tinymceBind(target, name, func, scope);
      }
    };
  }
});

var userAgent = window.navigator.userAgent;
var isIE = /MSIE|Trident\//.test(userAgent);
if (isIE) $('body').addClass('msie');
