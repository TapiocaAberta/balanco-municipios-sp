var csv = require("fast-csv"), normalizer = require('diacritics');

var municipiosMapa = {};
/* * First we need to write a JSON will cities human readable name and a normalized lower case name. *  * This JSON will be written to: *  * APP_ROOT/data/municipiosMapa/municipiosMapa.json *  * This data is taken from the expenses JSON *  */
csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){     var id = normalizer.remove(data[2]).toLowerCase().split(' ').join('_')     municipiosMapa[id] = data[2] 
 })
  .on("end", function(){    var municipios = [];    for(m in municipiosMapa) {          municipios.push({              id: m,
              nome: municipiosMapa[m]          });    }
    // TODO: escrever JSON, msa agora presico domirr, amanhá eh labuta tiozao    console.log(municipios)
 });

/* * Will read the expenses data and write a JSON with the expenses of a given year to: *  * APP_ROOT/data/despesas/{year}/{normalized lower case city name}.json * csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){
     console.log(data);
 });
 */

