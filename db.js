if (process.env.NODE_ENV == 'production') {

	var collection = function() {
	
		var records = [];
	
		return {
			insert: function(data, callback) {
	
	            //quick check if data is an array
	            if(data.length) {
					records.push.apply(records,data);
	            }
	            else{
	                records.push(data);
	            }
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
		words: collection()
	};
	
} else {
	
	// local env uses mongo.
	var mongojs = require('mongojs');
	module.exports = mongojs('question-time', ['questions', 'words']);
	
}
