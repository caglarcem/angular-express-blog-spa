
/**
 * Module dependencies.
 */

var express = require('express'),
  api = require('./routes/api'),
  // Provider = require('./providers/provider-memory').Provider;
  Provider = require('./providers/provider-mongodb').Provider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var provider = new Provider('localhost', 27017);

// JSON API
// app.get('/api/posts', api.posts);
app.get('/api/posts', function(req, res) {
	provider.getAll(function(error, posts) {
		res.json({
			posts: posts
		});
	});
});

// app.get('/api/post/:id', api.post);
app.get('/api/post/:id', function(req, res) {
	var id = req.params.id;
	provider.find(id, function(error, post) {
		res.json({
			post: post
		});
	});
});

// app.post('/api/post', api.addPost);
app.post('/api/post', function(req, res) {
	provider.save({
		title: req.body.title,
		text: req.body.text
	}, function(error, docs) {
      res.json(req.body);
  });
});

// app.put('/api/post/:id', api.editPost);
app.put('/api/post/:id', function(req, res) {
	var id = req.params.id;
	provider.update(id,
		{
			title: req.body.title,
			text: req.body.text
		},
		function(error, docs) {
				res.json(req.body);
		}
	);
});

// app.delete('/api/post/:id', api.deletePost);
app.delete('/api/post/:id', function(req, res) {
	var id = req.params.id;
	provider.delete(id, function(error, post) {
		res.json(req.body);
	});
});

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
