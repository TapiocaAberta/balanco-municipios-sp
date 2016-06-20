var normalizer = require('diacritics'), fs = require('fs');
/* * Util functions */
module.exports = {
    writeJSON: function(path, content) {        fs.writeFile(path, JSON.stringify(content), 'utf8', function(err) {
            if(err) {
                return console.log(err);
            } else { 
                console.log("JSON escrito com sucesso em: " + path);
            }
        });     },

    toFloat: function(str) {        return parseFloat(str.split('.').join('').replace(',', '.'));    },

    transformName: function(data) {        return normalizer.remove(data).toLowerCase().split(' ').join('_')    },
};


