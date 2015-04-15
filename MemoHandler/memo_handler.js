var MongoClient = require('mongodb').MongoClient;

var querystring = require('querystring');
var url = 'mongodb://localhost:27017/memo'

exports.create = function(req, res, body) { 
    _insertMemo(body, function(err, result) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write('creatememo');
        res.end();
    }) ;
};  
exports.read = function(req, res, body) { 
    var where = {};

    _findMemo(where, function(err, results) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        }); 
        res.write(JSON.stringify(results));
        res.end();
    });

};  
exports.update = function(req, res, body) { 
    var where = req.query;

    _updateMemo(where, body, function(err, results) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write("updatemomo");
        res.end();
    });
};  
exports.remove = function(req, res, body) { 
    var where = req.query;

    _removeMemo(where, function(err, results) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        }); 
        res.write('removememo'); 
        res.end();
    });
};

function _insertMemo(body, callback){
	body = typeof body === 'string' ? JSON.parse(body) : body;

	var memo = {
		author : body.author,
		memo : body.memo,
		date : new Date()
	};

	MongoClient.connect(url, function(err, db){
        if(err) throw err;

        db.collection('memoes').insert(memo, function(err, inserted){
            if(err) throw err;

            console.log("Successfully inserted: " + JSON.stringify(memo));
            db.close();
            callback(null, inserted);
        });
    });
}

function _findMemo(where, callback){
	where = where || {};
	
    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        db.collection('memoes').find(where).toArray(function(err, docs){
            if(err) throw err;

            db.close();
            callback(null, docs);
        });
    });
}

function _updateMemo(where, body, callback){
	body = typeof body === 'string' ? JSON.parse(body) : body;
	
    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        db.collection('memoes').update(where,{$set:body}, {strict:true}, function(err, updated){
            if(err) throw err;
            console.log("Successfully updated: " + updated);

            db.close();
            callback(null, updated);
        });
    });
}

function _removeMemo(where, callback){
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        db.collection('memoes').remove(where,{strict:true},function(err, removed){
            if(err) throw err;
            console.log("Successfully deleted: " + removed);
            db.close();
            callback(null, removed);
        });
    });
}