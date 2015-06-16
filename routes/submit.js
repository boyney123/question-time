var express = require('express');
var router = module.exports = express.Router();
var db = require('../db');

router.post('/question', function(req, res, next) {
  
  var question = {
    question: req.body.question
  };
  
  db.questions.insert(question, function(err, result) {
    if (err) {
        res.render('error');
    } else {
      res.redirect('/');
    }
  });
  
});

function validateWords(words){

    var allWords = [];

    words = words.split(' ');

    //Do we need to do any validation?

    for(var i = 0; i < words.length; i++){
        allWords.push({
            word: words[i]
        })
    }

    return allWords;

}


router.post('/mood', function(req, res, next) {

    var words = validateWords(req.body.words);

    db.moods.insert(words, function(err, result) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/');
        }
    });
  
});