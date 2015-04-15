var http = require('http'),
    util = require('util'),
    path = require('path'),
    url = require('url'),
    fs   = require('fs'),
    querystring = require('querystring'),
    formidable = require('formidable'),server;
 
var TEST_PORT = "8080";
var TEST_TMP = "./image/"
 
 
server = http.createServer(function(req, res) {
 
  var method = req.method.toUpperCase();
 
  if (req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="title"><br>'+
      '<input type="file" name="upload" multiple="multiple"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  } else if (url.parse(req.url).pathname.toString() == '/upload' ) {
 
 
 
 
                //title - string
                //upload - file
 
                if (method == 'POST')
                {
                        var form = new formidable.IncomingForm(),
                            files = [],
                            fields = [];
 
                        console.log(method);
 
                        console.log("execute !! upload folder ")
                        form.uploadDir = TEST_TMP;
                        form.keepExtensions = true;
 
 
                         form.parse(req, function(err, fields, files) {
 
                            res.writeHead(200, {'content-type': 'application/json'});
 
                            console.log('parse - ' + JSON.stringify(files));
 
                            res.end(JSON.stringify(files));
 
                        });
 
                }
                else if ( method == 'GET')
                {
 
 
                var query = url.parse(req.url).query;
                var where = querystring.parse(query);
 
 
                  console.log( "querystring(req.url)['path']   " +  querystring.parse(query)['path']) ;
 
                  var vpath = querystring.parse(query)['path'];
 
                  console.log(vpath);
 
                  if ( vpath.length > 0  )
                  {
                      
                     
 
                     console.log (vpath);
 
                     fs.readFile('./upload/' + vpath ,function(err,data){
 
                          if (err) { 
                               res.writeHead(404, {'content-type': 'text/plain'});
                               res.end('404');
                          }
 
                          res.writeHead(200, {'Content-Type':'image/jpeg'});
                          res.end(data);
 
                      });
 
                  }
                  else {
                     res.writeHead(404, {'content-type': 'text/plain'});
                     res.end('404');
 
                  }
                 
              }
   }
   else {
 
     var query = url.parse(req.url).query;
    var where = querystring.parse(query);
 
    console.log ("mehtod " + method);
    console.log ("req url" + req.url);
    console.log(' url.parse(req.url).pathname == "upload" AAA  ' +  url.parse(req.url).pathname.toString());
    console.log (query);
    console.log (where);
 
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});
server.listen(TEST_PORT);
 
 
 
function error404(){
 
   res.writeHead(404, {'content-type': 'text/plain'});
   res.end('404');
}
 
console.log('listening on http://localhost:'+TEST_PORT+'/');