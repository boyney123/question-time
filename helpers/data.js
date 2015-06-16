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