var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var image_dir = "./image/";

exports.upload = function(req, res, body) {
    var form = new formidable.IncomingForm();

    console.log(req.method);
    form.uploadDir = image_dir;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });

        console.log('Successfully inserted: ' + JSON.stringify(files));
        res.end(JSON.stringify(files));
    });


}

exports.download = function(req, res, body) {
    var query = url.parse(req.url).query;
    var where = querystring.parse(query);
    console.log(where);

    var vpath = querystring.parse(query)['path'];
    console.log(vpath);

    if (vpath.length > 0) {
        fs.readFile(image_dir + vpath, function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'content-type': 'text/plain'
                });
                res.end(404);
            }
            res.writeHead(200, {
                'content-type': 'image/jpeg'
            });
            res.end(data);
        });
    } else {
        res.writeHead(404, {
            'content-type': 'text/plain'
        });
        res.end('404');
    }
}