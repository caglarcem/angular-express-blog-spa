/*
 * Serve JSON to our AngularJS client
 */

var data = {
	"posts": [
		{
			"title": "Whatcha doin?",
			"text": "What's going on? I'm working with angular and node, hoping" +
				"to create some cool webapp goodness."
		},
		{
			"title": "Interesting things",
			"text": "Some interesting things are afoot. I'll give you the deets, but" +
				"suffice it to say, some things are going on that may prove different."
		}
	]
};

// GET
exports.posts = function(req, res) {
	var posts = [];
	data.posts.forEach(function(post, i) {
		posts.push({
			id: i,
			title: post.title,
			text: post.text.substr(0, 50) + '...'
		});
	});
	res.json({
		posts: posts
	});
};

exports.post = function(req, res) {
	var id = req.params.id;
	if(id >= 0 && id < data.posts.length) {
		res.json({
			post: data.posts[id]
		});
	} else {
		res.json(false);
	}
};

// POST
exports.addPost = function(req, res) {
	data.posts.push(req.body);
	res.json(req.body);
};

// PUT
exports.editPost = function(req, res) {
	var id = req.params.id;

	if(id >= 0 && id < data.posts.length) {
		data.posts[id] = req.body;
		res.json(true);
	} else {
		res.json(false);
	}
};

// DELETE
exports.deletePost = function(req, res) {
	var id = req.params.id;

	if(id >= 0 && id < data.posts.length) {
		data.posts.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};