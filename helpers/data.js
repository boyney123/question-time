var db = require('../db');
var when = require('when');
var mongojs = require('mongojs');

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
    
    return when.promise(function(resolve, reject) {
        
        db.words.aggregate(
            {
                $group: {
                    _id: "$word",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    word: "$_id",
                    count: 1
                }
            }
        , function(err, words) {
             if(err) return reject(err);
             resolve(words);
        });

    });
    
};

module.exports.deleteQuestion = function(_id){

    return when.promise(function(resolve, reject) {

        db.questions.remove({_id: mongojs.ObjectId(_id)}, function(err){
            if(err) return reject(err);
            resolve();
        })

    });

}

module.exports.deleteWord = function(word){

    return when.promise(function(resolve, reject) {

        db.words.remove({word: word}, function(err){
            if(err) return reject(err);
            resolve();
        })

    });

}