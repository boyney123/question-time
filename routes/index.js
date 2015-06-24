var express = require('express');
var router = express.Router();
var dataHelper = require('../helpers/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cloud', function(req, res, next) {
    res.render('wordcloud', { title: 'Express' });
});

router.get('/question', function(req, res, next) {
    res.render('question', {
        title: 'Express',
        enabelBackToHome:true
    });
});

router.get('/feel', function(req, res, next) {
    res.render('feeling', {
        title: 'Express',
        enabelBackToHome:true
    });
});

router.get('/admin/questions', function(req, res, next){

    dataHelper
        .getAllQuestions()
        .then(function(data){

            var questions = [];

            for(var i = 0; i < data.length; i++){
                if(data[i].question){
                    console.log(data[i])
                    questions.push(data[i]);
                }
            }

            console.log(questions)

            res.render('question-list', {
                title: 'Express',
                enabelBackToHome:true,
                questions:questions
            });

        })
        .catch(function(err){
            res.render('error');
        });
});

router.get('/admin/words', function(req, res, next){

    dataHelper
        .getAllWords()
        .then(function(data){

            var words = [];

            for(var i = 0; i < data.length; i++){
                if(data[i].word){
                    words.push(data[i]);
                }
            }

            res.render('word-list', {
                title: 'Express',
                enabelBackToHome:true,
                words:words
            });

        })
        .catch(function(err){
            console.log(err)
            res.render('error');
        });
});



router.get('/words', function(req, res, next){

    dataHelper
        .getAllWords()
        .then(function(data){
            res.send(200, data);
        })
        .catch(function(err){
            res.render('error');
        });
});

module.exports = router;
