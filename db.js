if (process.env.NODE_ENV != 'production') {
	
	module.exports = mongojs('question-time', ['questions', 'words']);

	// var collection = function() {
	
	// 	var records = [];
	
	// 	return {
	// 		insert: function(data, callback) {
	
	//             //quick check if data is an array
	//             if(data.length) {
	// 				records.push.apply(records,data);
	//             }
	//             else{
	//                 records.push(data);
	//             }
	// 			callback(null, data);

	// 		},
	// 		find: function() {
	// 			if (arguments.length == 1) {
	// 				arguments[0](null, records);
	// 			} else if(arguments.length == 2) {
	// 				arguments[1](null, records);
	// 			}
	// 		},
	// 		aggregate: function(p1, p2, callback) {
				
	// 			var r = {};
				
	// 			records.forEach(function(word) {
	// 				if (r[word.word] == undefined) {
	// 					r[word.word] = 0;
	// 				}
	// 				r[word.word]++;
	// 			});
				
	// 			var words = Object.keys(r).map(function(key) {
	// 				return {
	// 					word: key,
	// 					count: r[key]
	// 				};
	// 			});
				
	// 			callback(null,words);
				
	// 		}
	// 	};
	// };
	
	// module.exports = {
	// 	questions: collection(),
	// 	words: collection()
	// };
	
} else {
	
	// local env uses mongo.
	var mongojs = require('mongojs');
	module.exports = mongojs('mongodb://bakeoff:'+process.env.MONGO_PASS+'@ds037551.mongolab.com:37551/heroku_6jtjjpvv', ['questions','words']);
	//module.exports = mongojs('question-time', ['questions', 'words']);
	
}
