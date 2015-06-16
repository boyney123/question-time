var mongojs = require('mongojs');

module.exports = mongojs('question-time', ['questions', 'moods']);
