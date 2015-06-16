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


router.post('/mood', function(req, res, next) {
  
  var mood = {
    feeling: req.body.feeling,
    word: req.body.word
  };
  
  db.moods.insert(mood, function(err, result) {
    if (err) {
      res.render('error');
    } else {
        res.redirect('/');
    }
  });
  
});