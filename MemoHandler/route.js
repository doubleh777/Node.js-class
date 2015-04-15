var memoHandler = require('./memo_handler.js'); 
var image = require('./image.js');
var url = require('url');   

exports.route = (function() { 
	var handlers = {};   

	handlers['/memo'] = { 
		POST: memoHandler.create, 
		GET: memoHandler.read, 
		PUT: memoHandler.update, 
		DELETE: memoHandler.remove 
	};   

	handlers['/image'] = {
		POST: image.upload,
		GET : image.download
	}
 
	function route(req, res, body) { 
		var pathname = url.parse(req.url).pathname; 
		var method = req.method.toUpperCase(); 

		//
		 if (req.url == '/') {
        	res.writeHead(200, {
            	'content-type': 'text/html'
        	});
        	res.end(
           		'<form action="/image" enctype="multipart/form-data" method="POST">' +
           	 	'<input type="text" name="title"><br>' +
           	 	'<input type="file" name="upload" multiple="multiple"><br>' +
           	 	'<input type="submit" value="Upload">' +
           	 	'</form>'
        	);
    	}else if(typeof handlers[pathname][method] === 'function') {
			  handlers[pathname][method](req, res, body); 
		}else { 
			res.writeHead(404, {"Content-Type": "text/plain"}); 
			res.write('pathname error'); 
			res.end(); 
		}
	}

	return route;
})();