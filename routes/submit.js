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
    
    return words
        .split(' ')
        //Do we need to do any validation?
        .filter(function(word){ return word.length; })
        .map(function(word) { return { word: word }; });
    
}


router.post('/words', function(req, res, next) {

    var words = validateWords(req.body.words);

    db.words.insert(words, function(err, result) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/cloud');
        }
    });
  
});