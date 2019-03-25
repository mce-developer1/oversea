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

  $(document).on('click', '[data-toggle="dropdown"]', function(e) {
    if ( $('.dialog.open').length === 0) {
      $('.dialog.open .dialog-menu').removeClass('show');
      $('.dialog.open').removeClass('open');
    }
  })

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

    if ($(window).width() < 768) {
      var height = $(target).find('.article-sidebar').get(0).scrollHeight;
      $(target).find('.article-sidebar').css('height', height);
    }

    var sidebarCollapsed = $(target).hasClass('collapse-sidebar');
    var delay = (($(window).width() < 768) && sidebarCollapsed) ? 350 : 0;
    setTimeout(function waitBrowserReflow() {
      $(target).find('.article-sidebar').css('height', '');

      if ($(target).hasClass('collapse-sidebar')) {
        $(target).removeClass('collapse-sidebar')
      } else {
        $(target).addClass('collapse-sidebar');
      }
    }, delay);
  });

  $(document).on('show.bs.modal', function (e) {
    if ($(e.target).find('.modal-dialog').hasClass('modal-preview')) {
      setTimeout(function() {
        $('.modal-backdrop.show').addClass('modal-backdrop-preview');
      });
    }
  });

	window._logStore = window._logStore || {
    endpoint: '/logging',
    failures: 0,
    maxFailures: 3,
    bufferSize: 1,
    argumentsSize: 3,
    logs: [],
    save: function() {
      var self = this;
      if (arguments.length < self.argumentsSize) return;

      var formatted = {
        module: arguments[0].trim(),
        action: arguments[1].trim(),
        params: arguments[2].trim()
      }
      self.logs.push(formatted);
      if (self.logs.length >= self.bufferSize) self.send();
    },
    send: function() {
      var self = this;
      if (self.logs.length === 0) return;

      var json = JSON.stringify({ logs: self.logs });
      $.post(self.endpoint, { data: json })
        .done(function(data) {
          self.failures = 0;
          self.logs = [];
        })
        .fail(function(data) {
          self.failures++;
          if (self.failures !== self.maxFailures) {
            var delay = (1000 * self.failures);
            setTimeout(function() {
              self.send.apply(self);
            }, delay);
          } else {
            self.failures = 0;
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

  $(window).on('unload', function(e) {
    window._logStore.send();
  });
});
