$(document).ready(function() {
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var CHANNELS = [
    ['Maths', 'Works'],
    ['MPAH', 'Science'],
    ['MPAH', 'Maths'],
    ['Take Off', 'with English']
  ];

  var loginTrend = {
    labels: DAYS,
    datasets: [{
      borderColor: '#28a745',
      data: [40, 45, 50, 60, 55, 60, 60],
      fill: false,
    }]
  }

  new Chart($('.article-login-trend canvas').get(0), {
      type: 'line',
      data: loginTrend,
      options: {
        responsive: true,
        layout: {
          padding: {
            left: 8,
            right: 24,
            top: 24,
            bottom: 8
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 12,
              beginAtZero: true,
              stepSize: 50
            }
          }]
        }
      }
  });

  var popularChannels = {
    labels: CHANNELS,
    datasets: [{
      backgroundColor: '#007bff',
      data: [60, 80, 70, 90, 100]
    }]
  };

  new Chart($('.article-popular-channels canvas').get(0), {
    type: 'bar',
    data: popularChannels,
    options: {
      responsive: true,
      layout: {
        padding: {
          left: 8,
          right: 0,
          top: 24,
          bottom: 8
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          barThickness: 24,
          ticks: {
            fontSize: 12
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 12,
            beginAtZero: true,
            stepSize: 50
          }
        }]
      }
    }
  });

  var overallProficiency = {
    labels: CHANNELS,
    datasets: [{
      backgroundColor: '#007bff',
      data: [60, 80, 70, 90, 100]
    }]
  };

  new Chart($('.article-proficiency-report canvas').get(0), {
    type: 'bar',
    data: overallProficiency,
    options: {
      responsive: true,
      layout: {
        padding: {
          left: 8,
          right: 0,
          top: 24,
          bottom: 8
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          barThickness: 24,
          ticks: {
            fontSize: 12
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 12,
            beginAtZero: true,
            stepSize: 50,
            callback: function(value, index, values) {
              return value + '%';
            }
          }
        }]
      }
    }
  });

  $('.form-filters .btn-date-range').daterangepicker();
  $('.form-filters .btn-date-range').on('apply.daterangepicker',
    function(ev, picker) {
      var dateRange = picker.startDate.format('YYYY-MM-DD')
        + ' to ' + picker.endDate.format('YYYY-MM-DD');
      $('.form-filters .btn-date-range .date-range').text(dateRange);
    });

  var overallLogin = {
    labels: DAYS,
    datasets: [{
      borderColor: '#28a745',
      data: [40, 45, 50, 60, 55, 60, 60],
      fill: false,
    }]
  }

  new Chart($('.article-login-report canvas').get(0), {
      type: 'line',
      data: overallLogin,
      options: {
        responsive: true,
        layout: {
          padding: {
            left: 8,
            right: 24,
            top: 24,
            bottom: 8
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 12,
              beginAtZero: true,
              stepSize: 50
            }
          }]
        }
      }
  });

  var overallUsage = {
    labels: CHANNELS,
    datasets: [{
      backgroundColor: '#007bff',
      data: [60, 80, 70, 90, 100]
    }]
  };

  new Chart($('.article-usage-report canvas').get(0), {
    type: 'bar',
    data: overallUsage,
    options: {
      responsive: true,
      layout: {
        padding: {
          left: 8,
          right: 0,
          top: 24,
          bottom: 8
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          barThickness: 24,
          ticks: {
            fontSize: 12
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 12,
            beginAtZero: true,
            stepSize: 50
          }
        }]
      }
    }
  });
});
