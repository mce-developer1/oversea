$(document).ready(function() {
  var studentUser = (location.href.indexOf('student') > 0);
  var inlineChart;
  var modalChart;

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

  function drawStudentUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Math Buddies', 90, '#8cc432', '90%'],
      ['Marshall Cavendish Maths', 50, '#bf6692', '50%'],
      ['Marshall Cavendish Science', 70, '#ff8b1a', '70%'],
      ['My Pals are here! Science', 80, '#53a7df', '80%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { height: '80%', width: '50%' },
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
        minValue: 0,
        maxValue: 100
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    inlineChart.draw(dataTable, options);
  }

  function drawStudentChannelUsageReport() {
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
      chartArea: { height: '80%', width: '50%' },
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
        minValue: 0,
        maxValue: 100
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    inlineChart.draw(dataTable, options);
  }

  function drawStudentProficiencyReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Math Buddies', 80, '#8cc432', '80%'],
      ['Marshall Cavendish Maths', 70, '#bf6692', '70%'],
      ['Marshall Cavendish Science', 70, '#ff8b1a', '70%'],
      ['My Pals are here! Science', 60, '#53a7df', '60%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { height: '80%', width: '50%' },
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
        minValue: 0,
        maxValue: 100
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    inlineChart.draw(dataTable, options);
  }

  function drawStudentChannelProficiencyReport() {
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
      chartArea: { height: '80%', width: '50%' },
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
        minValue: 0,
        maxValue: 100
      }
    };
    
    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
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
      chartArea: { height: '80%', width: '70%' },
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
        minValue: 0,
        maxValue: 100
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
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
      chartArea: { height: '80%', width: '60%' },
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
    inlineChart.draw(dataTable, options);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      $('.modal-usage-summary').modal('show');
      $('.modal-usage-summary').on('shown.bs.modal', function (e) {
        clearModalChart();
        drawClassStudentUsageReport(student);
      });
    });
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
      chartArea: { height: '80%', width: '50%' },
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
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
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
      chartArea: { height: '80%', width: '70%' },
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
        minValue: 0,
        maxValue: 100
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    inlineChart.draw(dataTable, options);
  }

  function drawClassProficiencyReport() {
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
      chartArea: { height: '80%', width: '60%' },
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
    inlineChart.draw(dataTable, options);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      $('.modal-proficiency-summary').modal('show');
      $('.modal-proficiency-summary').on('shown.bs.modal', function (e) {
        clearModalChart();
        drawClassStudentProficiencyReport(student);
      });
    });
  }

  function drawClassStudentProficiencyReport(student) {
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
      chartArea: { height: '80%', width: '50%' },
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
    $('.article-reports .nav .nav-link').on('click', function(e) {
      e.preventDefault();

      $('.article-reports').addClass('d-none');
      $('.article-report').removeClass('d-none');
      clearInlineChart();

      switch ($(this).attr('href')) {
        case '#usage':
          $('.article-usage-report').removeClass('d-none');
          $('#selReport').selectpicker('val', 'usage');          
          if (studentUser) drawStudentUsageReport();
          else drawAllClassesUsageReport();
          break;
        case '#proficiency':          
          $('.article-proficiency-report').removeClass('d-none');
          $('#selReport').selectpicker('val', 'proficiency');
          if (studentUser) drawStudentProficiencyReport();
          else drawAllClassesProficiencyReport();
          break;
      }
    });

    $('.article-report .article-sidebar .navbar .btn').on('click', function(e) {
      if ($('.article-report').hasClass('collapse-sidebar')) {
        $('.article-report').removeClass('collapse-sidebar');
      } else {
        $('.article-report').addClass('collapse-sidebar');
      }
    });

    $('#selReport').on('changed.bs.select', function (e) {
      var selectedClass = $('#selClass').selectpicker('val');
      var selectedChannel = $('#selChannel').selectpicker('val');
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
  }

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(initPage());
});
