var SEPARADOR_URL = "&";
var balancoApp = angular.module('BalancoApp', []);

// básico para começar, ainda não aprendi os módulos
balancoApp.controller('BalancoController',
    ['$scope', '$http', function($scope, $http) {        // listeners
        $scope.showAbout = function() {            $('#modalSobre').modal();        };
        $scope.showHowItWorks = function() {            $('#modalFuncionamento').modal();        };
        $http.get("data/municipios.json").success(
            function(data) {
                $scope.municipios = data;
        });

        $scope.loadApp = function(){            var munId = $scope.municipio.id;
            $scope.revenue = null;
            $scope.expenses = null;
            $http.get("data/receitas/" + munId + ".json").success(
            function(data) {                $scope.revenue = data;                loadRevenue(data);
            });
            $http.get("data/despesas/" + munId + ".json").success(
            function(data) {                $scope.expenses = data;
                loadExpenses(data);
            });        };
}]);

function loadExpenses(data) {    var series = [];
    var categories = [];
    var drillDownMap = {};
    var drillDownSeries = [];
    var totals = {};
    var pieSerie = {        type: 'pie',
        name: 'Total por ano',
        data: [],
        center: [30, 0],
        size: 50,
        showInLegend: false,
        dataLabels: {
            enabled: false
        }    };
    // extracting chart information from the data
    for(var i = 0; i < data.length; i++) {        var cat = data[i].funcao;
        var year = data[i].ano;        var serie = searchSeries(series, year);
        if(!serie) {            serie = { year: year, name: "Ano " + year, mapCategories: {}, data: []};            series.push(serie);        }
        if(categories.indexOf(cat) === -1) {            categories.push(cat); 
        }
        if(!serie.mapCategories[cat]) {            serie.mapCategories[cat] = 0;        }
        // sum all the values for this category
        serie.mapCategories[cat] += data[i].valor;
        // totals for the pie chart
        if(!totals[year]) totals[year] = 0;
        totals[year] += data[i].valor;
        // let's build the drilldown data now
        // the ID is the key
        var key = buildDrillDownKey(cat, year);
        if(!drillDownMap[key]) {
            drillDownMap[key] = { data: [], name: data[i].subFuncao };        }
        drillDownMap[key].data.push([data[i].subFuncao, data[i].valor]);
    }
    // build the data for each category of each series(it might come in a random order, must organize)
    for(var i = 0; i < series.length; i++) {        for(var j = 0; j < categories.length; j++) {            var cat = categories[j];            var val = series[i].mapCategories[cat];
            var drillDownKey = buildDrillDownKey(cat, series[i].year);            series[i].data.push({                type: "column",                name: cat,                y: val,
                drilldown: drillDownKey
            });        }    }
    // add the data for the small pie chart
    for(var year in totals) {        pieSerie.data.push({
            name: "Ano " + year,
            y: totals[year]                   });    }
    series.push(pieSerie);
    for(var id in drillDownMap) {        var drillDown = drillDownMap[id];        drillDownSeries.push({            id: id,
            data: drillDown.data,
            name: drillDown.name        });    }
    $('#expensesChart').highcharts({
        chart: {
            type: 'column'
        },
        title: "Gastos",
        xAxis: {
            categories: categories,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor (R$)',
                align: 'high'
            },
		    labels: {
                overflow: 'justify',
			    formatter: function() {
				    return 'R$ ' + this.value.toLocaleString();
			    }				
		    }
        },
        tooltip: {
            valuePrefix: 'R$ '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {                        return 'R$ ' + this.y.toLocaleString();                    }
                }
            }
        },
        series: series,
        drilldown: {            series: drillDownSeries        }
    });
}

    function loadRevenue(data) {        var title = {text: "Receitas para o município " + data[0].nome};    
        var series = [];
        var totals = {};
        var pieSerie = {            type: 'pie',
            name: 'Total por ano',
            data: [],
            center: [30, 0],
            size: 50,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }        };
        for(var i = 0; i< data.length; i++) {            var year = data[i].ano;            series[i] = {};
            series[i].name = "Ano " + year;
            series[i].data = [                { type: "column", y: data[i].impostosProprios },
                { type: "column", y: data[i].impostosEstado },
                { type: "column", y: data[i].impostosUniao },
            ];
            if(!totals[year]) totals[year] = 0;
            totals[year] += data[i].impostosProprios + data[i].impostosEstado + data[i].impostosUniao;        }
    // add the data for the small pie chart
        for(var year in totals) {            pieSerie.data.push({
                name: "Ano " + year,
                y: totals[year]                       });        }
        series.push(pieSerie);       $('#revenuesChart').highcharts({
        chart: {
            type: 'column'
        },
        title: title,
        xAxis: {
            categories: ['Impostos Próprios', 'Impostos do Estado', 'Impostos da União'],

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor (R$)',
                align: 'high'
            },
		    labels: {
                overflow: 'justify',
			    formatter: function() {
				    return 'R$ ' + this.value.toLocaleString();
			    }				
		    }
        },
        tooltip: {
            valuePrefix: ' R$ '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {                        return 'R$ ' + this.y.toLocaleString();                    }
                }
            }
        },
        series: series
    });}
function buildDrillDownKey(cat, year) {    return cat + " | Ano " + year;}
function searchSeries(series, year) {    var serie;    for(var i = 0; i< series.length; i++) {        if(series[i].year === year){            serie = series[i];        }    }
    return serie;}

function recuperaMapaUrl() {
	var todos = window.location.hash.replace('#', '');
	var params = {};
	$.each(todos.split(SEPARADOR_URL), function(i, v) {
		var campos = v.split('=');
		params[campos[0]] = campos[1];
	});
	return params;
}

function salvaMapaUrl(params) {
	var novaUrl = '';
	$.each(params, function(i, v) {
		novaUrl += i + '=' + v + SEPARADOR_URL;
	});
	window.location.hash = novaUrl.substring(0, novaUrl.length - 1);
}
