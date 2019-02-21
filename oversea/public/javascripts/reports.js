$(document).ready(function() {
  var studentUser = (location.href.indexOf('student') > 0);
  var mutationObserver;
  var inlineChart;
  var modalChart;

  function disconnectObserver() {
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }
  }

  function clearInlineChart() {
    if (inlineChart && inlineChart.clearChart) {
      inlineChart.clearChart();
      inlineChart = null;
    }
  }

  function clearModalChart() {
    if (modalChart && modalChart.clearChart) {
      modalChart.clearChart();
      modalChart = null;
    }
  }

  function updateStudentReport(container, chart) {
    google.visualization.events.addListener(chart, 'ready', function() {
      var svg = container.getElementsByTagName('svg')[0];
      var barRects = svg.querySelectorAll("rect[height='1']");
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        var x = (barRect.getAttribute('x') - 94);
        var y = (barRect.getAttribute('y') - 14);
        var image = createImage({
          href: '/static/images/icon_reports_rocket.png',
          x: x,
          y: y,
          width: 95,
          height: 28
        });
        if (barRect.parentElement) barRect.parentElement.appendChild(image);
        else if (barRect.parentNode) barRect.parentNode.appendChild(image);
        barRect.setAttribute('x', parseFloat(x) + 20);
      }

      var barRects = svg.querySelectorAll("rect[width='1'][fill='#6c757d']");
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        var barRectX = parseFloat(barRect.getAttribute('x'));
        if (i > 0) barRect.setAttribute('x', (barRectX - 3));
        barRect.setAttribute('width', 3);
      }

      if (mutationObserver) return;
      mutationObserver = new MutationObserver(function() {
        var svg = container.getElementsByTagName('svg')[0];
        var barLabels = svg.querySelectorAll("text[text-anchor='end'][fill='#ffffff']");
        for (var i = 0; i < barLabels.length; i++) {
          var barLabel = barLabels[i];
          var barLabelRect = barLabel.nextSibling;
          if (barLabel.getAttribute('data-x')) continue;
          if (barLabelRect.getAttribute('data-x')) continue;
          var barLabelX = parseFloat(barLabel.getAttribute('x'));
          var barLabelRectX = parseFloat(barLabelRect.getAttribute('x'));
          barLabel.setAttribute('data-x', barLabelX);
          barLabelRect.setAttribute('data-x', barLabelRectX);
          if (barLabelX < 360) {
            barLabel.setAttribute('x', (barLabelX + 70));
            barLabel.setAttribute('fill', '#000000');
            barLabelRect.setAttribute('x', (barLabelRectX + 70));
          } else {
            barLabel.setAttribute('x', (barLabelX - 90));
            barLabel.setAttribute('fill', '#ffffff');
            barLabelRect.setAttribute('x', (barLabelRectX - 90));
          }
        }
      });
      mutationObserver.observe(container, {
        childList: true,
        subtree: true
      });
    });
  }

  function createImage(options) {
    var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttributeNS(null, 'height', options.height);
    image.setAttributeNS(null, 'width', options.width);
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
    image.setAttributeNS(null, 'x', options.x);
    image.setAttributeNS(null, 'y', options.y);
    image.setAttributeNS(null, 'style', 'background-color: #000000;');
    image.setAttributeNS(null, 'visibility', 'visible');
    return image;
  }

  function drawStudentUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Math Buddies', 90, '#8cc432', 'Well done!'],
      ['Marshall Cavendish Maths', 40, '#bf6692', 'Keep it up!'],
      ['Marshall Cavendish Science', 70, '#ff8b1a', 'Almost there!'],
      ['My Pals are here! Science', 80, '#53a7df', 'Almost there!']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 100, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      disconnectObserver();
      clearInlineChart();
      drawStudentChannelUsageReport();
    });

    inlineChart.draw(dataTable, options);
  }

  function drawStudentChannelUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 70, '#8cc432', 'Almost there!'],
      ['Number Bonds', 80, '#bf6692', 'Almost there!'],
      ['Addition Within 10', 80, '#ff8b1a', 'Almost there!'],
      ['Subtraction Within 10', 70, '#53a7df', 'Almost there!'],
      ['Shapes And Patterns', 60, '#7a7aee', 'Keep it up!'],
      ['Ordinal Numbers And Position', 80, '#609a9a', 'Almost there!'],
      ['Numbers To 20', 60, '#e96968', 'Keep it up!']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 100, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);
    inlineChart.draw(dataTable, options);
  }

  function drawStudentProficiencyReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Math Buddies', 80, '#8cc432', 'Almost there!'],
      ['Marshall Cavendish Maths', 70, '#bf6692', 'Almost there!'],
      ['Marshall Cavendish Science', 70, '#ff8b1a', 'Almost there!'],
      ['My Pals are here! Science', 60, '#53a7df', 'Keep it up!']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 100, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      disconnectObserver();
      clearInlineChart();
      drawStudentChannelProficiencyReport();
    });

    inlineChart.draw(dataTable, options);
  }

  function drawStudentChannelProficiencyReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 70, '#8cc432', 'Almost there!'],
      ['Number Bonds', 80, '#bf6692', 'Almost there!'],
      ['Addition Within 10', 80, '#ff8b1a', 'Almost there!'],
      ['Subtraction Within 10', 70, '#53a7df', 'Almost there!'],
      ['Shapes And Patterns', 60, '#7a7aee', 'Keep it up!'],
      ['Ordinal Numbers And Position', 80, '#609a9a', 'Almost there!'],
      ['Numbers To 20', 60, '#e96968', 'Keep it up!']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 100, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };
    
    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);
    inlineChart.draw(dataTable, options);
  }

  function drawAllClassesUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['P1-EA', 90, '#8cc432', '90%'],
      ['P1-HA', 50, '#bf6692', '50%'],
      ['P1-MA', 70, '#ff8b1a', '70%'],
      ['P1-PA', 80, '#53a7df', '80%'],
      ['P1-SA', 60, '#7a7aee', '60%'],
      ['P1-TA', 50, '#609a9a', '50%'],
      ['P1-UA', 70, '#e96968', '70%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 80, height: '80%', width: '70%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        format: '#\'%\'',
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      disconnectObserver();
      clearInlineChart();
      drawClassUsageReport(student);
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Aaron Tan', 70, '#8cc432', '70%'],
      ['Arya Suman', 80, '#bf6692', '80%'],
      ['Ashar Ahmad', 80, '#ff8b1a', '80%'],
      ['Chua Chin Hui', 70, '#53a7df', '70%'],
      ['Derrick Lee', 60, '#7a7aee', '60%'],
      ['Nurulhuda bte Sazali', 80, '#609a9a', '80%'],
      ['Siow Poh Piah Irene', 60, '#e96968', '60%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 160, height: '80%', width: '70%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    var inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      $('.modal-usage-summary').modal('show');
      $('.modal-usage-summary').on('shown.bs.modal', function (e) {
        clearModalChart();
        drawClassStudentUsageReport(student);
      });
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassStudentUsageReport(student) {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 70, '#8cc432', '70%'],
      ['Number Bonds', 80, '#bf6692', '80%'],
      ['Addition Within 10', 80, '#ff8b1a', '80%'],
      ['Subtraction Within 10', 70, '#53a7df', '70%'],
      ['Shapes And Patterns', 60, '#7a7aee', '60%'],
      ['Ordinal Numbers And Position', 80, '#609a9a', '80%'],
      ['Numbers To 20', 60, '#e96968', '60%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, height: '80%', width: '60%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      }
    };
    var description = 'Math Buddies, ' + student;
    $('.modal-usage-summary .modal-body p').text(description);

    var element = $('.modal-usage-summary .chart').get(0);
    var chart = new google.visualization.BarChart(element);
    chart.draw(dataTable, options);
  }

  function drawAllClassesProficiencyReport() {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['P1-EA', 60, '#8cc432', '60%'],
      ['P1-HA', 70, '#bf6692', '70%'],
      ['P1-MA', 80, '#ff8b1a', '80%'],
      ['P1-PA', 80, '#53a7df', '80%'],
      ['P1-SA', 60, '#7a7aee', '60%'],
      ['P1-TA', 50, '#609a9a', '50%'],
      ['P1-UA', 60, '#e96968', '60%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 80, height: '80%', width: '70%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      disconnectObserver();
      clearInlineChart();
      drawClassProficiencyReport(student);
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassProficiencyReport() {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['Aaron Tan', 70, '#8cc432', '70%'],
      ['Arya Suman', 80, '#bf6692', '80%'],
      ['Ashar Ahmad', 80, '#ff8b1a', '80%'],
      ['Chua Chin Hui', 70, '#53a7df', '70%'],
      ['Derrick Lee', 60, '#7a7aee', '60%'],
      ['Nurulhuda bte Sazali', 80, '#609a9a', '80%'],
      ['Siow Poh Piah Irene', 60, '#e96968', '60%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 160, height: '80%', width: '60%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    var inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      $('.modal-proficiency-summary').modal('show');
      $('.modal-proficiency-summary').on('shown.bs.modal', function (e) {
        clearModalChart();
        drawClassStudentProficiencyReport(student);
      });
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassStudentProficiencyReport(student) {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 70, '#8cc432', '70%'],
      ['Number Bonds', 80, '#bf6692', '80%'],
      ['Addition Within 10', 80, '#ff8b1a', '80%'],
      ['Subtraction Within 10', 70, '#53a7df', '70%'],
      ['Shapes And Patterns', 60, '#7a7aee', '60%'],
      ['Ordinal Numbers And Position', 80, '#609a9a', '80%'],
      ['Numbers To 20', 60, '#e96968', '60%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, height: '80%', width: '60%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      }
    };
    var description = 'Math Buddies, ' + student;
    $('.modal-proficiency-summary .modal-body p').text(description);

    var element = $('.modal-proficiency-summary .chart').get(0);
    var chart = new google.visualization.BarChart(element);
    chart.draw(dataTable, options);
  }

  function initPage() {
    $('#selReport').on('changed.bs.select', function (e) {
      var selectedClass = $('#selClass').selectpicker('val');
      var selectedChannel = $('#selChannel').selectpicker('val');
      disconnectObserver();
      clearInlineChart();

      switch ($('#selReport').selectpicker('val')) {
        case 'usage':
          $('.article-proficiency-report').addClass('d-none');
          $('.article-usage-report').removeClass('d-none');
          if (studentUser) {
            if (selectedChannel === 'All') drawStudentUsageReport();
            else drawStudentChannelUsageReport();
          } else {
            if (selectedClass === 'All') drawAllClassesUsageReport();
            else drawClassUsageReport();
          }
          break;
        case 'proficiency':
          $('.article-usage-report').addClass('d-none');
          $('.article-proficiency-report').removeClass('d-none');
          if (studentUser) {
            if (selectedChannel === 'All') drawStudentProficiencyReport();
            else drawStudentChannelProficiencyReport();
          } else {
            if (selectedClass === 'All') drawAllClassesProficiencyReport();
            else drawClassProficiencyReport();
          }
          break;
      }
    });

    $('#selClass').on('changed.bs.select', function (e) {
      var selectedReport = $('#selReport').selectpicker('val');
      disconnectObserver();
      clearInlineChart();

      switch ($('#selClass').selectpicker('val')) {
        case 'All':
          if (selectedReport === 'usage') drawAllClassesUsageReport();
          else drawAllClassesProficiencyReport();
          break;
        default:
          if (selectedReport === 'usage') drawClassUsageReport();
          else drawClassProficiencyReport();
          break;
      }
    });

    $('#selChannel').on('changed.bs.select', function (e) {
      var selectedReport = $('#selReport').selectpicker('val');
      switch ($('#selChannel').selectpicker('val')) {
        case 'All':
          if (selectedReport === 'usage') drawStudentUsageReport();
          else drawAllClassesUsageReport();
          break;
        default:
          if (selectedReport === 'usage') drawStudentChannelUsageReport();
          else drawStudentChannelProficiencyReport();
          break;
      }
    });

    setTimeout(function waitForVisualizationLib() {
      if (google.visualization && google.visualization.arrayToDataTable) {
        $('#selReport').selectpicker('val', 'proficiency');
        if (studentUser) drawStudentProficiencyReport();
        else drawAllClassesProficiencyReport();
        return;
      }
      setTimeout(waitForVisualizationLib, 500);
    }, 500);
  }

  if ($(window).width() < 768) {
    $('.article-report').addClass('collapse-sidebar');
  }

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(initPage());
});
