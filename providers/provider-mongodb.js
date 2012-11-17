var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

Provider = function(host, port){
	this.db = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}), {safe:false});
	this.db.open(function(){});
};

Provider.prototype.getCollection = function(callback) {
	this.db.createCollection('posts', function(error, post_collection) {
		if(error) {
			callback(error);
		} else {
			callback(null, post_collection);
		}
	});
};

Provider.prototype.getAll = function(callback) {
	this.getCollection(function(error, post_collection) {
		if(error) {
			callback(error);
		} else {
			post_collection.find().toArray(function(err, posts) {
				if(error) {
					callback(error);
				} else {
					callback(null, posts);
				}
			});
		}
	});
};

Provider.prototype.find = function(id, callback) {
	this.getCollection(function(error, post_collection) {
		if(error) {
			callback(error);
		} else {
			post_collection.findOne(
				{
					_id: post_collection.db.bson_serializer.ObjectID.createFromHexString(id)
				},
				function(error, result) {
					if(error) {
						callback(error);
					} else {
						callback(null, result);
					}
				}
			);
		}
	});
};

Provider.prototype.save = function(posts, callback) {
	this.getCollection(function(error, post_collection) {
		if(error) {
			callback(error);
		} else {
			if(typeof(posts.length) == "undefined") {
				posts = [posts];
			}

			post_collection.insert(posts, function() {
				callback(null, posts);
			});
		}
	});
};

Provider.prototype.update = function(id, post, callback) {
	this.getCollection(function(error, post_collection) {
		if(error) {
			callback(error);
		} else {
			post_collection.update({_id:post_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, post, true, function(err, result) {
				callback(null, null);
			});
		}
	});
};

Provider.prototype.delete = function(id, callback) {
	this.getCollection(function(error, post_collection) {
		if(error) {
			callback(error);
		} else {
			post_collection.remove({_id:post_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, {safe:true}, function(err, result) {
				callback(null, result);
			});
		}
	});
};

exports.Provider = Provider;