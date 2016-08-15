(function() {

    function revenueService(utils) {

        function buildChartData(data) {
            var series = [];
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

            data.forEach(function(item, i) {
                var year = item.ano;
                series[i] = { color: colors[year] };
                series[i].name = year;
                series[i].data = [
                    { type: "column", y: item.impostosProprios },
                    { type: "column", y: item.impostosEstado },
                    { type: "column", y: item.impostosUniao },
                ];
                if(!totals[year]) totals[year] = 0;
                totals[year] += item.impostosProprios + item.impostosEstado + item.impostosUniao;
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

            return {series: series};
        }

        return {
            buildChartData: buildChartData
        };

    }

    revenueService.$inject = ['utils'];
    angular.module('BalancoApp').factory('revenueService', revenueService);
}());
