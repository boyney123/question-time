var express = require('express');
var router = express.Router();

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

module.exports = router;
