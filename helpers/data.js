var db = require('../db');
var when = require('when');

module.exports.getAllQuestions = function(){

    var d = when.defer();

    db.questions.find(function(err, result) {
        if (err) {
            d.reject(err)
        } else {
            d.resolve(result);
        }
    });

    return d.promise;
}

module.exports.getAllMoods = function(){

    var d = when.defer();

    db.moods.find(function(err, result) {
        if (err) {
            d.reject(err)
        } else {

            var allWords = [];

            for(var i = 0; i < result.length; i++){
                allWords.push(result[i].word);
            }

            d.resolve(allWords);
        }
    });

    return d.promise;
}