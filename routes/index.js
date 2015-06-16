var express = require('express');
var router = express.Router();
var dataHelper = require('../helpers/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
