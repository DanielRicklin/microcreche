const colors = [
    "#FF6600", "#B0DE09"
    ];

/*AmCharts.ready(function () {
    createStockChart();
});*/

function createStockChart() {
                  
    var chart = new AmCharts.AmStockChart();
    chart.validateData();
    
    var dataSet1 = new AmCharts.DataSet();
    dataSet1.fieldMappings = [{fromField: "value1", toField: "value1"}];
    dataSet1.dataProvider = dataGraph1;
    dataSet1.categoryField = "date";
    dataSet1.title = "Capteur 1";
    dataSet1.color = colors[0];

    var dataSet2 = new AmCharts.DataSet();
    dataSet2.fieldMappings = [{fromField: "value2", toField: "value2"}];
    dataSet2.dataProvider = dataGraph2;
    dataSet2.categoryField = "date";
    dataSet2.title = "Capteur 2";
    dataSet2.color = colors[1];

    // set data sets to the chart
    chart.dataSets = [dataSet1,dataSet2];

    // PANELS ///////////////////////////////////////////                                                  
    // first stock panel
    var stockPanel = new AmCharts.StockPanel();
    stockPanel.recalculateToPercents = "never";
    stockPanel.title = "";

    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    categoryAxesSettings.minPeriod = "mm";
    chart.categoryAxesSettings = categoryAxesSettings;

    // apply custom style for value axes
    var valueAxesSettings = new AmCharts.ValueAxesSettings();
    valueAxesSettings.axisAlpha = 1; 
    valueAxesSettings.gridThickness = 0;
    valueAxesSettings.axisThickness = 2; 
    valueAxesSettings.inside = false;
    chart.valueAxesSettings = valueAxesSettings;

    // apply custom style for panels settings
    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.marginLeft = 100;
    panelsSettings.marginRight = 100;
    chart.panelsSettings = panelsSettings;

    // add first value axes
    var valueAxis1 = new AmCharts.ValueAxis();
    valueAxis1.axisColor = colors[0];
    valueAxis1.color = colors[0];
    valueAxis1.offset = 0;
    stockPanel.addValueAxis(valueAxis1);

    // add second value axes
    var valueAxis2 = new AmCharts.ValueAxis();
    valueAxis2.axisColor = colors[1];
    valueAxis2.color = colors[1];
    valueAxis2.offset = 0;
    valueAxis2.position = "right";
    stockPanel.addValueAxis(valueAxis2);


    // graph of first stock panel
    var graph1 = new AmCharts.StockGraph();
    graph1.valueField = "value1";
    graph1.comparable = true;
    graph1.title = "Capteur 1";
    graph1.useDataSetColors = false;
    graph1.lineColor = colors[0];
    graph1.bullet = "round";
    graph1.bulletBorderColor = "#FFFFFF";
    graph1.bulletBorderAlpha = 1;
    graph1.balloonText = "[[title]]:<b>[[value]]</b>";
    graph1.compareGraphBalloonText = "[[title]]:<b>[[value]]</b>";
    graph1.compareGraphBullet = "round";
    graph1.compareGraphBulletBorderColor = "#FFFFFF";
    graph1.compareGraphBulletBorderAlpha = 1;
    graph1.valueAxis = valueAxis1;
    stockPanel.addStockGraph(graph1);

    // graph of second stock panel
    var graph2 = new AmCharts.StockGraph();
    graph2.valueField = "value2";
    graph2.comparable = true;
    graph2.title = "Capteur 2";
    graph2.useDataSetColors = false;
    graph2.lineColor = colors[1];
    graph2.bullet = "round";
    graph2.bulletBorderColor = "#FFFFFF";
    graph2.bulletBorderAlpha = 1;
    graph2.balloonText = "[[title]]:<b>[[value]]</b>";
    graph2.compareGraphBalloonText = "[[title]]:<b>[[value]]</b>";
    graph2.compareGraphBullet = "round";
    graph2.compareGraphBulletBorderColor = "#FFFFFF";
    graph2.compareGraphBulletBorderAlpha = 1;
    graph2.valueAxis = valueAxis2;
    stockPanel.addStockGraph(graph2);

    

    // create stock legend                
    var stockLegend1 = new AmCharts.StockLegend();
    stockLegend1.periodValueTextComparing = "[[percents.value.close]]%";
    stockLegend1.periodValueTextRegular = "[[value.close]]";
    stockPanel.stockLegend = stockLegend1;
    
    var periodSelector = new AmCharts.PeriodSelector();
    periodSelector.periods = [{period: "MAX",label: "MAX"}];
    periodSelector.position = "left";
    chart.periodSelector = periodSelector;

    //DATA SET SELECTOR
    var dataSetSelector = new AmCharts.DataSetSelector();
    dataSetSelector.position = "left";
    chart.dataSetSelector = dataSetSelector;

    // set panels to the chart
    chart.panels = [stockPanel];
    
    // OTHER SETTINGS ////////////////////////////////////
    var sbsettings = new AmCharts.ChartScrollbarSettings();
    sbsettings.backgroundColor = "#222";
    sbsettings.selectedBackgroundColor = "#555";
    sbsettings.selectedGraphFillAlpha = 1;
    chart.chartScrollbarSettings = sbsettings;
    
    var chartScrollbar = new AmCharts.ChartScrollbar();
    chartScrollbar.autoGridCount = true;
    chartScrollbar.scrollbarHeight = 40;
    chart.chartScrollbar = chartScrollbar;

    // CURSOR settings
    var cursorSettings = new AmCharts.ChartCursorSettings();
    cursorSettings.valueBalloonsEnabled = true;
    cursorSettings.cursorAlpha = 0.5;
    cursorSettings.valueLineBalloonEnabled = true;
    cursorSettings.valueLineEnabled = true;
    cursorSettings.valueLineAlpha = 0.5;
    cursorSettings.cursorPosition = "mouse";
    chart.chartCursorSettings = cursorSettings;

    var categoryAxis = new AmCharts.CategoryAxis();
    chart.categoryAxis = categoryAxis;

    chart.write('chartdiv');
}