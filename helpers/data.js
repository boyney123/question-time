var db = require('../db');
var when = require('when');

module.exports.getAllQuestions = function(){

    var d = when.defer();

    db.questions.find(function(err, result) {
        if (err) {
            d.reject(err);
        } else {
            d.resolve(result);
        }
    });

    return d.promise;
}

module.exports.getAllWords = function(){

    var d = when.defer();

    db.words.find(function(err, result) {
        if (err) {
            d.reject(err);
        } else {
            
            d.resolve(result.map(function(word) {
                return word.word;
            }));
            
        }
    });
  
    // db.words.aggregate([
    //     {
    //         $group: {
    //             _id: "$word",
    //             count: {
    //                 $sum: 1
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             word: "$_id",
    //             count: 1
    //         }
    //     }
    // ], function(err, words) {
    //      if(err) return d.reject(err);
    //      d.resolve(words);
    // });

    return d.promise;
}