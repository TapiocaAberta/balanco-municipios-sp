/* * IMPORTS */
var csv = require("fast-csv"), normalizer = require('diacritics'), fs = require('fs');


/* * CONSTANTS */
var PATH_MUNICIPIOS = 'app/data/municipios.json'
var PATH_DESPESAS = 'app/data/despesas/'

/* * Globals */
var municipiosMapa = {};
var expenses = [];
var lastId = '';

/* * Util functions */
var writeJSON = function(path, content) {    fs.writeFile(path, JSON.stringify(content), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        } else { 
            console.log("JSON escrito com sucesso em: " + path);
        }
    }); }

var transformName = function(data) {    return normalizer.remove(data).toLowerCase().split(' ').join('_')}

var retrieveExpenses = function(data) {    // TODO: need to be adjusted according to the CSV, this is a workaround
    var years = ['2012', '2013', '2014']    
    for(i in years) {        var yearIndex = parseInt(i) + 7;        if(data[yearIndex] != '') {            var value = data[yearIndex].split('.').join('').replace(',', '.');            var expense = { 
                funcao: data[5],
                subFuncao: data[6],
                ano: years[i],
                valor: parseFloat(value)              };
            expenses.push(expense);        }    }
}
/* * First we need to write a JSON with cities human readable name and a normalized lower case name. *  * This JSON will be written to: *  * APP_ROOT/data/municipios.json *  * This data is taken from the expenses JSON *  */
csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){    var cityName = data[2];    if(cityName != 'Município') {        var id = transformName(cityName);
        municipiosMapa[id] = cityName;
        if(lastId == '') {            lastId = id;        }
        if(id == lastId) {            retrieveExpenses(data);        } else {            writeJSON(PATH_DESPESAS + lastId + '.json', expenses);
            expenses = [];
            lastId = id;        }
    } })
  .on("end", function(){    // save the last expense list
    writeJSON(PATH_DESPESAS + lastId + '.json', expenses);    var municipios = [];    for(m in municipiosMapa) {          municipios.push({              id: m,
              nome: municipiosMapa[m]          });    }
    writeJSON(PATH_MUNICIPIOS, municipios);
 });

/* * Will read the expenses data and write a JSON with the expenses of a given year to: *  * APP_ROOT/data/despesas/{normalized lower case city name}.json *  
csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){
     console.log(data);
 }).on("end", function(){    var municipios = [];    for(m in municipiosMapa) {          municipios.push({              id: m,
              nome: municipiosMapa[m]          });    }
    municipios = municipios.splice(1, municipios.length);
    writeJSON(PATH_MUNICIPIOS, municipios);
 });
*/
