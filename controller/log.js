var elasticsearch = require('elasticsearch');
var parse = require('co-body');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

exports.createLog = function *(next){
	var body = yield parse(this);
	//make sure all parameters and available
	if(body.actionId && body.userId && body.data){
		var log = yield postLog(body.actionId, body.userId, body.data);
		this.body = log;
	} else {
    	this.status = 404;	
	}
};

var postLog = function *postLog(actionId, userId, data){
	//log data to Elastic Search
	return yield client.create({
	  index: 'log',
	  type: actionId,
	  body: {
	  	userId: userId,
	  	data: data
	  }
	});
};

exports.postLog = postLog;