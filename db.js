//var mongojs = require('mongojs');
//module.exports = mongojs('question-time', ['questions', 'moods']);

var collection = function() {
	
	var records = [];
	
	return {
		insert: function(data, callback) {
			records.push(data);
			callback(null, data);
		},
		find: function() {
			if (arguments.length == 1) {
				arguments[0](null, records);
			} else if(arguments.length == 2) {
				arguments[1](null, records);
			}
		}
	};
};

module.exports = {
	questions: collection(),
	moods: collection()
};

