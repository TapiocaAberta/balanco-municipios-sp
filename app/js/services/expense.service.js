(function() {

    function expenseService() {
        // making global for debug
        var series = [];
        var categories = [];

        var detailsMap = {};

        function buildDetailsKey(cat, year) {
            return cat + " | Ano " + year;
        }

        function loadExpenses(data) {
            var totals = {};

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

            detailsMap = {};
            // extracting chart information from the data
            for(var i = 0; i < data.length; i++) {
                var cat = data[i].funcao;
                var year = data[i].ano;
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
                serie.mapCategories[cat] += data[i].valor;
                // totals for the pie chart
                if(!totals[year]) totals[year] = 0;
                totals[year] += data[i].valor;
                // let's build the drilldown data now
                // the ID is the key
                var key = buildDetailsKey(cat, year);

                if(!detailsMap[key]) {
                    detailsMap[key] = [];
                }
                detailsMap[key].push({ "name" : data[i].subFuncao, "value" : data[i].valor });
            }
                    // build the data for each category of each series(it might come in a random order, must organize)
            for(var i = 0; i < series.length; i++) {
                for(var j = 0; j < categories.length; j++) {
                    var cat = categories[j];
                    var val = series[i].mapCategories[cat];
                    series[i].data.push({
                        type: "column",
                        name: cat,
                        y: val
                    });
                }
            }

            // add the data for the small pie chart
            for(var year in totals) {
                pieSerie.data.push({
                    name: year,
                    y: totals[year],
                    color: colors[year]
                });
            }
            series.push(pieSerie);

            return {categories: categories, series: series};
        };

        return {
            loadData: loadExpenses
        };

    }

    angular.module('BalancoApp').factory('expense', expenseService);
}());
