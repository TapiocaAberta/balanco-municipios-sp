(function() {

    function expenseService(utils) {

        function buildDetailsKey(cat, year) {
            return cat + " | Ano " + year;
        }

        function searchSeries(series, year) {
            return series.filter(function(serie) {
                return serie.year === year;
            })[0];
        }

        function buildChartData(data) {
            var series = [];
            var categories = [];
            var detailsMap = {};
            var totals = {};

            var colors = utils.generateColors();

            var pieSerie = {
                type: 'pie',
                name: 'Total',
                data: [],
                center: [30, 0],
                size: 50,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            };

            // extracting chart information from the data
            data.forEach(function(item) {
                var cat = item.funcao;
                var year = item.ano;
                var serie = searchSeries(series, year);
                if(!serie) {
                    serie = { year: year, name: year, mapCategories: {}, data: [], color: colors[year]};
                    series.push(serie);
                }
                if(categories.indexOf(cat) === -1) {
                    categories.push(cat);
                }
                if(!serie.mapCategories[cat]) {
                    serie.mapCategories[cat] = 0;
                }
                // sum all the values for this category
                serie.mapCategories[cat] += item.valor;
                // totals for the pie chart
                if(!totals[year]) totals[year] = 0;
                totals[year] += item.valor;
                // let's build the drilldown data now
                // the ID is the key
                var key = buildDetailsKey(cat, year);

                if(!detailsMap[key]) {
                    detailsMap[key] = [];
                }
                detailsMap[key].push({ "name" : item.subFuncao, "value" : item.valor });
            });

            // build the data for each category of each series(it might come in a random order, must organize)
            series.forEach(function(serie) {
                categories.forEach(function(category) {
                    var val = serie.mapCategories[category];
                    serie.data.push({
                        type: 'column',
                        name: category,
                        y: val
                    });
                });
            });

            // add the data for the small pie chart
            for(var year in totals) {
                pieSerie.data.push({
                    name: year,
                    y: totals[year],
                    color: colors[year]
                });
            }
            series.push(pieSerie);

            return {categories: categories, series: series, detailsMap: detailsMap};
        };

        return {
            buildChartData: buildChartData
        };

    }

    expenseService.$inject = ['utils'];
    angular.module('BalancoApp').factory('expenseService', expenseService);
}());
