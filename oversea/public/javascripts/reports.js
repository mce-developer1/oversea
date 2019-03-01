$(document).ready(function() {
  var studentUser = (location.href.indexOf('student') > 0);
  var mutationObserver;
  var inlineChart;
  var modalChart;

  function getBarColor(percentage) {
    if (percentage >= 91) return '#33cc99';
    else if ((percentage >= 75) && (percentage <= 90)) return '#67cc72';
    else if ((percentage >= 60) && (percentage <= 74)) return '#a8cc41';
    else if ((percentage >= 50) && (percentage <= 59)) return '#e3cc15';
    else if ((percentage >= 35) && (percentage <= 49)) return '#f4a000';
    else if ((percentage >= 20) && (percentage <= 34)) return '#e76d00';
    else return '#d93300';
  }

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
      var barRects = svg.querySelectorAll("rect[width='1'][fill='#6c757d']");
      var startX = 0;
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        var barRectX = parseFloat(barRect.getAttribute('x'));
        if (i > 0) barRect.setAttribute('x', (barRectX - 3));
        else startX = barRectX;
        barRect.setAttribute('width', 3);
      }

      var barRects = svg.querySelectorAll("rect[height='1']");
      var imgWidth = 95, imgHeight = 28;
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        var barRectX = parseFloat(barRect.getAttribute('x'));
        var barRectY = parseFloat(barRect.getAttribute('y'));
        if (barRectX < (startX + imgWidth)) continue;
        var x = (barRectX - imgWidth + 1);
        var y = (barRectY - (imgHeight / 2));
        var image = createImage({
          href: '/static/images/icon_reports_rocket.png',
          x: x,
          y: y,
          width: imgWidth,
          height: imgHeight
        });
        if (barRect.parentElement) barRect.parentElement.appendChild(image);
        else if (barRect.parentNode) barRect.parentNode.appendChild(image);
        barRect.setAttribute('x', parseFloat(x) + 20);
      }

      if (mutationObserver || !MutationObserver) return;
      mutationObserver = new MutationObserver(function() {
        var svg = container.getElementsByTagName('svg')[0];
        var barLabels = svg.querySelectorAll("text[text-anchor='end']");
        for (var i = 0; i < barLabels.length; i++) {
          var barLabel = barLabels[i];
          var barLabelRect = barLabel.nextSibling;
          if (!barLabelRect) continue;
          if (barLabel.getAttribute('data-x')) continue;
          if (barLabelRect.getAttribute('data-x')) continue;
          var barLabelX = parseFloat(barLabel.getAttribute('x'));
          var barLabelRectX = parseFloat(barLabelRect.getAttribute('x'));
          var barLabelRectWidth = parseFloat(barLabelRect.getAttribute('width'));
          barLabel.setAttribute('data-x', barLabelX);
          barLabelRect.setAttribute('data-x', barLabelRectX);
          if (barLabelX < (startX + barLabelRectWidth + imgWidth)) {
            barLabel.setAttribute('x', (barLabelX + barLabelRectWidth + 10));
            barLabel.setAttribute('fill', '#000000');
            barLabelRect.setAttribute('x', (barLabelRectX + barLabelRectWidth + 10));
          } else {
            barLabel.setAttribute('x', (barLabelX - imgWidth));
            barLabel.setAttribute('fill', '#ffffff');
            barLabelRect.setAttribute('x', (barLabelRectX - imgWidth));
          }
        }

        var barLabels = svg.querySelectorAll("text[text-anchor='start']");
        for (var i = 0; i < barLabels.length; i++) {
          var barLabel = barLabels[i];
          var barLabelX = parseFloat(barLabel.getAttribute('x'));
          barLabel.setAttribute('fill', '#000000');
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
      ['Math Buddies', 95, getBarColor(95), 'Almost there!'],
      ['Marshall Cavendish Maths', 80, getBarColor(80), 'Good Progress!'],
      ['Marshall Cavendish Science', 70, getBarColor(70), 'Keep It Up!'],
      ['My Pals are here! Science', 55, getBarColor(55), 'Almost there!']
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
      ['Numbers To 10', 95, getBarColor(95), 'Keep It Up!'],
      ['Number Bonds', 80, getBarColor(80), 'Almost there!'],
      ['Addition Within 10', 70, getBarColor(70), 'Almost there!'],
      ['Subtraction Within 10', 55, getBarColor(55), 'Keep It Up!'],
      ['Shapes And Patterns', 40, getBarColor(40), 'Keep it up!'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), 'Almost there!'],
      ['Numbers To 20', 10, getBarColor(10), 'Keep it up!']
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
      ['Math Buddies', 95, getBarColor(95), 'Master'],
      ['Marshall Cavendish Maths', 80, getBarColor(80), 'Expert'],
      ['Marshall Cavendish Science', 70, getBarColor(70), 'Advanced'],
      ['My Pals are here! Science', 55, getBarColor(55), 'Apprentice']
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
      ['Numbers To 10', 95, getBarColor(95), 'Master'],
      ['Number Bonds', 80, getBarColor(80), 'Expert'],
      ['Addition Within 10', 70, getBarColor(70), 'Advanced'],
      ['Subtraction Within 10', 55, getBarColor(55), 'Apprentice'],
      ['Shapes And Patterns', 40, getBarColor(40), 'Novice'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), 'Learner'],
      ['Numbers To 20', 10, getBarColor(10), 'Beginner']
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
      ['P1-EA', 95, getBarColor(95), '95%'],
      ['P1-HA', 80, getBarColor(80), '80%'],
      ['P1-MA', 70, getBarColor(70), '70%'],
      ['P1-PA', 55, getBarColor(55), '55%'],
      ['P1-SA', 40, getBarColor(40), '40%'],
      ['P1-TA', 30, getBarColor(30), '30%'],
      ['P1-UA', 10, getBarColor(10), '10%']
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
      ['Aaron Tan', 95, getBarColor(95), '95%'],
      ['Arya Suman', 80, getBarColor(80), '80%'],
      ['Ashar Ahmad', 70, getBarColor(70), '70%'],
      ['Chua Chin Hui', 55, getBarColor(55), '55%'],
      ['Derrick Lee', 40, getBarColor(40), '40%'],
      ['Nurulhuda bte Sazali', 30, getBarColor(30), '30%'],
      ['Siow Poh Piah Irene', 10, getBarColor(10), '10%']
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
      ['Numbers To 10', 95, getBarColor(95), '95%'],
      ['Number Bonds', 80, getBarColor(80), '80%'],
      ['Addition Within 10', 70, getBarColor(70), '70%'],
      ['Subtraction Within 10', 55, getBarColor(55), '55%'],
      ['Shapes And Patterns', 40, getBarColor(40), '40%'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), '30%'],
      ['Numbers To 20', 10, getBarColor(10), '10%']
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
      ['P1-EA', 95, getBarColor(95), '95%'],
      ['P1-HA', 80, getBarColor(80), '80%'],
      ['P1-MA', 70, getBarColor(70), '70%'],
      ['P1-PA', 55, getBarColor(55), '55%'],
      ['P1-SA', 40, getBarColor(40), '40%'],
      ['P1-TA', 30, getBarColor(30), '30%'],
      ['P1-UA', 10, getBarColor(10), '10%']
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
      ['Aaron Tan', 95, getBarColor(95), '95%'],
      ['Arya Suman', 80, getBarColor(80), '80%'],
      ['Ashar Ahmad', 70, getBarColor(70), '70%'],
      ['Chua Chin Hui', 55, getBarColor(55), '55%'],
      ['Derrick Lee', 40, getBarColor(40), '40%'],
      ['Nurulhuda bte Sazali', 30, getBarColor(30), '30%'],
      ['Siow Poh Piah Irene', 10, getBarColor(10), '10%']
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
      ['Numbers To 10', 95, getBarColor(95), '95%'],
      ['Number Bonds', 80, getBarColor(80), '80%'],
      ['Addition Within 10', 70, getBarColor(70), '70%'],
      ['Subtraction Within 10', 55, getBarColor(55), '55%'],
      ['Shapes And Patterns', 40, getBarColor(40), '40%'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), '30%'],
      ['Numbers To 20', 10, getBarColor(10), '10%']
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

  $('.btn-light[data-toggle="popover"]').popover({
    container: 'body',
    placement: 'top',
    trigger: 'focus'
  })

  if ($(window).width() < 768) {
    $('.article-report').addClass('collapse-sidebar');
  }

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(initPage());
});
