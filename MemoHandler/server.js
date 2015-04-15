var http = require('http'); 
var route = require('./route.js'); 
  function onRequest(req, res) { 
	var body = ''; 
	req.on('data', function(chunk){
		body += chunk;
	}); 

	route.route(req, res, body); 
 
 
} 
  var server = http.createServer(onRequest); 
server.listen(8080); 