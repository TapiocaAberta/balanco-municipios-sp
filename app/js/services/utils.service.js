(function() {

    function utilsService() {
        var SEPARADOR_URL = "&";

        function recuperaMapaUrl() {
        	var location = window.location.hash.replace('#', '');
        	var params = {};

            location.split(SEPARADOR_URL).forEach(function(parameter) {
                var fieldData = parameter.split("=");
                params[fieldData[0]] = fieldData[1];
            });

            return params;
        };

        function salvaMapaUrl(params) {
        	var newUrl = '';

            Object.keys(params).forEach(function(parameterName) {
                newUrl += parameterName + '=' + params[parameterName];
            })

        	window.location.hash = newUrl;
        };

        function generateColors() {
            var colors = {};
            // set defaul colors
             Highcharts.getOptions().colors.forEach(function(color, i) {
                 colors[2012 + i] = color;
             });

            return colors;
        }

        return {
            getUrlMap: recuperaMapaUrl,
            saveUrlMap: salvaMapaUrl,
            generateColors: generateColors
        }

    }

    angular.module('BalancoApp').factory('utils', utilsService);

}());
