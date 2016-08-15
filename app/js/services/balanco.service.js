(function() {

    function balancoService($http) {

        function getCities() {
            return $http.get("data/municipios.json");
        }

        function getExpensesFrom(cityId) {
            return $http.get("data/despesas/" + cityId + ".json");
        }

        function getRevenueFrom(cityId) {
            return $http.get("data/receitas/" + cityId + ".json");
        }

        return {
            getCities: getCities,
            getExpensesFrom: getExpensesFrom,
            getRevenueFrom: getRevenueFrom
        }

    }

    balancoService.$inject = ['$http'];
    angular.module('BalancoApp').factory('BalancoService', balancoService);

}());
