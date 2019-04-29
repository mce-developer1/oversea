window.Utils = {
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
  }
};

$(document).ready(function() {
  $(document).on('click', '[data-toggle="password"]', function(e) {
    var icon = $(this).find('.fas');
    $(icon).toggleClass('fa-eye-slash');

    var target = $(this).attr('data-target');
    if ($(target).attr("type") === 'password') $(target).attr('type', 'text');
    else $(target).attr('type', 'password');
  });

  $(document).on('click', '[data-toggle="dialog"]', function(e) {
    var dialog = $(e.target).closest('.dialog');

    if (dialog && !$(dialog).hasClass('open')) {
      setTimeout(function() {
        $(dialog).toggleClass('open');
        $(dialog).find('.dialog-menu').toggleClass('show');
      });
    }
  });

  $(document).on('show.bs.dropdown', function(e) {
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
});
