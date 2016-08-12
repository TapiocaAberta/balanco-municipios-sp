(function() {

    function urlUtils() {
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

        return {
            getUrlMap: recuperaMapaUrl,
            saveUrlMap: salvaMapaUrl
        }

    }

    angular.module('BalancoApp').factory('urlUtils', urlUtils);

}());
