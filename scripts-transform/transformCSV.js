/*
var csv = require("fast-csv"), normalizer = require('diacritics'), fs = require('fs');


/*
var PATH_MUNICIPIOS = 'app/data/municipios.json'
var PATH_DESPESAS = 'app/data/despesas/'
var PATH_RECEITAS = 'app/data/receitas/'
var PATH_TODAS_RECEITAS = 'app/data/receitas.json'

/*
var municipiosMapa = {};
var expenses = [], revenues = [];
var lastId = '';

/*
var writeJSON = function(path, content) {
        if(err) {
            return console.log(err);
        } else { 
            console.log("JSON escrito com sucesso em: " + path);
        }
    }); 


var toFloat = function(str) {

var transformName = function(data) {

var retrieveExpenses = function(data) {
    var years = ['2012', '2013', '2014']    
    for(i in years) {
                funcao: data[5],
                subFuncao: data[6],
                ano: years[i],
                valor: toFloat(data[yearIndex])  
            expenses.push(expense);
}
/*
csv
 .fromPath("./data/despesa-funcao-subfunc.csv", {delimiter: ';' })
 .on("data", function(data){
        municipiosMapa[id] = cityName;
        if(lastId == '') {
        if(id == lastId) {
            expenses = [];
            lastId = id;
    }
  .on("end", function(){
    writeJSON(PATH_DESPESAS + lastId + '.json', expenses);
              nome: municipiosMapa[m]
    writeJSON(PATH_MUNICIPIOS, municipios);
 });

/*
var pRevenueId = '';
csv
 .fromPath("./data/receitas_resultantes_de_impostos.csv", {delimiter: ';' })
 .on("data", function(data){
        if(pRevenueId == '') pRevenueId = id;
        if(id != pRevenueId) {
             revenues = [];
             pRevenueId = id;         
        revenues.push({
            nome: cityName,
            ano: data[2],
            impostosProprios: toFloat(data[3]),
            impostosEstado: toFloat(data[4]),
            impostosUniao: toFloat(data[5]),
            total: toFloat(data[6])
        })
    }
  .on("end", function(){
    writeJSON(PATH_RECEITAS + pRevenueId + '.json', revenues);
 });
