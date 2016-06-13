var SEPARADOR_URL = "&";
var balancoApp = angular.module('BalancoApp', []);

// básico para começar, ainda não aprendi os módulos
balancoApp.controller('BalancoController',
    ['$scope', '$http', function($scope, $http) {        // listeners
        $scope.showAbout = function() {            $('#modalSobre').modal();        };
        $scope.showHowItWorks = function() {            $('#modalFuncionamento').modal();        };
        $scope.anos = [2013, 2014];
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

function loadExpenses(data) {    }

function loadRevenue(data) {    }
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
