(function() {
  var Charts;
  Charts = (function() {

    var chartsLoaded = false;

    function SetupCanvas(selector) {
      canvas = selector;
      newWidth = canvas.parent().width();
      canvas.prop("width", newWidth);
      canvas.prop("height", newWidth);
      if (chartsLoaded) {
        animate = false
      }
      else {
        animate = true
      }
      var doughnutOptions = {
        percentageInnerCutout : 70,
        animation : animate
      }
      dataToday = parseInt(canvas.attr("data-today"));
      dataHighest = parseInt(canvas.attr("data-highest"));
      var doughnutData = [
        {
          value: dataToday,
          color:"#37e8d7"
        },
        {
          value : dataHighest,
          color : "#e7e7e3"
        }        
      ];
      // setup chart
      chart = canvas.get(0).getContext("2d")
      // draw it
      new Chart(chart).Doughnut(doughnutData,doughnutOptions);
    }

    function InitCharts() {
      SetupCanvas($("#js-chart-btcs"));
      SetupCanvas($("#js-chart-revenue"));
    }

    function Charts() {
      if ($(".init-charts").length > 0){
        InitCharts();
        chartsLoaded = true;
        $(window).on("resize",_.throttle(InitCharts,100))
      }
    }
    return Charts;

  })();
  return new Charts();
})();
