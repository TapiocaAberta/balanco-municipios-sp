var csv = require("fast-csv"), normalizer = require('diacritics');

var municipios = {};
/* * First we need to write a JSON will cities human readable name and a normalized lower case name. *  * This JSON will be written to: *  * APP_ROOT/data/municipios/municipios.json *  * This data is taken from the expenses JSON *  */
csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){     municipios[normalizer.remove(data[2])] = data[2] 
 })
  .on("end", function(){	console.log(municipios)
    });

/* * Will read the expenses data and write a JSON with the expenses of a given year to: *  * APP_ROOT/data/despesas/{year}/{normalized lower case city name}.json * csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){
     console.log(data);
 });
 */

