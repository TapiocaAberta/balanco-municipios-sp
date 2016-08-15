(function() {

  function balancoController($scope, expense, revenue, utils, balancoService, $rootScope) {      $scope.showAbout = function() {          $('#modalSobre').modal();      };
      $scope.showHowItWorks = function() {          $('#modalFuncionamento').modal();      };

      balancoService.getCities().success(
          function(data) {
              $scope.municipios = data;
              var urlId = utils.getUrlMap()['id'];
              if(urlId) {                  $scope.municipio = $scope.municipios.filter(function(municipio) {                      return municipio.id == urlId;                  })[0];                  $scope.loadApp();              }
      });

      $scope.loadApp = function(){          var munId = $scope.municipio.id;
          var params = {};
          params['id'] = munId;
          utils.saveUrlMap(params);
          $scope.revenue = null;
          $scope.expenses = null;

          balancoService.getRevenueFrom(munId).success(function(data) {
              $scope.revenue = data;              var revenueChartData = revenue.buildChartData(data);              buildRevenueChart(revenueChartData);
          });

          balancoService.getExpensesFrom(munId).success(function(data) {
              $scope.expenses = data;
              var expenseChartData = expense.buildChartData(data);
              buildExpenseChart(expenseChartData);
          });

          $('html, body').animate({
			          scrollTop: $("#cmbMunicipios").offset().top - 70
		      }, 1000);      };
    };

    balancoController.$inject = ['$scope', 'expenseService', 'revenueService', 'utils', 'BalancoService'];
    angular.module('BalancoApp').controller('BalancoController', balancoController);

    //TODO Move this functions to other files
    function buildExpenseChart(data) {
        var chart = $('#expensesChart').highcharts({
            chart: {
                type: 'column'
            },
            title: { text: "Despesas por área" },
            xAxis: {
                categories: data.categories,
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
    			pointFormat: 'Total R$ {point.y:,.3f}',
                formatter: function() {
                    console.log(this);
                    if(!this.x) {
                        return "<b> Total de despesas em " + this.key + "</b>: R$ " + this.y.toLocaleString();
                    } else {
                        var area = this.x.split("-")[1];
                        var output = "<b>Despesas com " + area + " em " + this.series.name + ": ";
                        output += "<span style=\"color: red\">R$: " + this.y.toLocaleString() + "</span>";
                        var key = buildDetailsKey(this.x, this.series.name);
                        console.log(key);
                        var details = data.detailsMap[key];
                        if(details) {
                            output += "<br /> <br /><em>Detalhes:</em><br/>";
                            for(var d in details) {
                                var detail = details[d];
                                output += "<b>" + detail.name + "</b>" + ": R$ " + detail.value.toLocaleString() + "<br />";
                            }
                        }
                        return output;
                    }
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return 'R$ ' + this.y.toLocaleString();
                        }
                    }
                }
            },
            series: data.series
        });

    }

    function buildRevenueChart(data) {
       var chart = $('#revenuesChart').highcharts({
            chart: {
                type: 'column'
            },
            title: { text: "Receita de impostos" },
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
                valuePrefix: ' R$ ',
                formatter: function() {
                console.log(this);
                    if(!this.x) {
                        return "<b>Arrecadação com impostos em " + this.key + "</b>: R$ " + this.y.toLocaleString();
                    } else {
                    return "<b>" + this.x + " em " + this.series.name + "<br/></b> R$: " + this.y.toLocaleString();
                }
            }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                        return 'R$ ' + this.y.toLocaleString();
                    }
                    }
                }
            },
            series: data.series
        });

    }

    function buildDetailsKey(cat, year) {
        return cat + " | Ano " + year;
    }
}());
