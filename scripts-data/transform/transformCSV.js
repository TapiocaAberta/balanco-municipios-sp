/* * IMPORTS */
var csv = require("fast-csv"), normalizer = require('diacritics'), util = require('../util.js');


/* * CONSTANTS */
var PATH_MUNICIPIOS = 'app/data/municipios.json'
var PATH_DESPESAS = 'app/data/despesas/'
var PATH_RECEITAS = 'app/data/receitas/'
var PATH_TODAS_RECEITAS = 'app/data/receitas.json'

/* * Globals */
var municipiosMapa = {};
var expenses = [], revenues = [];
var lastId = '';

var retrieveExpenses = function(data) {    // TODO: need to be adjusted according to the CSV, this is a workaround
    var years = ['2012', '2013', '2014']    
    for(i in years) {        var yearIndex = parseInt(i) + 7;        if(data[yearIndex] != '') {            var expense = { 
                funcao: data[5],
                subFuncao: data[6],
                ano: years[i],
                valor: util.toFloat(data[yearIndex])              };
            expenses.push(expense);        }    }
}
/* * need to write a JSON with cities human readable name and a normalized lower case name to: *  * APP_ROOT/data/municipios.json *  * This data is taken from the expenses JSON *  */
csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){    var cityName = data[2];    if(cityName != 'Município') {        var id = util.transformName(cityName);
        municipiosMapa[id] = cityName;
        if(lastId == '') {            lastId = id;        }
        if(id == lastId) {            retrieveExpenses(data);        } else {            util.writeJSON(PATH_DESPESAS + lastId + '.json', expenses);
            expenses = [];
            lastId = id;        }
    } })
  .on("end", function(){    // save the last expense list
    util.writeJSON(PATH_DESPESAS + lastId + '.json', expenses);    var municipios = [];    for(m in municipiosMapa) {          municipios.push({              id: m,
              nome: municipiosMapa[m]          });    }
    util.writeJSON(PATH_MUNICIPIOS, municipios);
 });

/* * Will read the expenses data and write a JSON with the revenues of a given year to: *  * APP_ROOT/data/receitas.json * */
var pRevenueId = '';
csv
 .fromPath("./data/receitas_resultantes_de_impostos.csv", {delimiter: ';' })
 .on("data", function(data){    var cityName = data[0];    if(cityName != 'Município') {        var id = util.transformName(cityName);
        if(pRevenueId == '') pRevenueId = id;
        if(id != pRevenueId) {             util.writeJSON(PATH_RECEITAS + pRevenueId + '.json', revenues);
             revenues = [];
             pRevenueId = id;                 }
        revenues.push({            id: id,
            nome: cityName,
            ano: data[2],
            impostosProprios: util.toFloat(data[3]),
            impostosEstado: util.toFloat(data[4]),
            impostosUniao: util.toFloat(data[5]),
            total: util.toFloat(data[6])
        })
    } })
  .on("end", function(){
    util.writeJSON(PATH_RECEITAS + pRevenueId + '.json', revenues);
 });

