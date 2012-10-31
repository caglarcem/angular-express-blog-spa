var blogCounter = 1;

Provider = function(){};

Provider.prototype.dummyData = [];

Provider.prototype.getAll = function(callback) {
	callback(null, this.dummyData);
};

Provider.prototype.find = function(id, callback) {
	var result = null;
	for(var i = 0; i < this.dummyData.length; i++) {
		if(this.dummyData[i].id == id) {
			result = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
};

Provider.prototype.save = function(posts, callback) {
	var post = null;

	if(typeof(posts.length) == "undefined") {
		posts = [posts];
	}

	for(var i = 0; i < posts.length; i++) {
		post = posts[i];
		post.id = blogCounter++;
		this.dummyData[this.dummyData.length] = post;
	}
	callback(null, posts);

};

Provider.prototype.update = function(post, callback) {

	for(var i = 0; i < this.dummyData.length; i++) {
		if(this.dummyData[i].id == post.id) {
			this.dummyData[i] = post;
			break;
		}
	}
	callback(null, this.dummyData);
};

Provider.prototype.delete = function(id, callback) {
	for(var i = 0; i < this.dummyData.length; i++) {
		if(this.dummyData[i].id == id) {
			this.dummyData.splice(i, 1);
			break;
		}
	}
	callback(null, this.dummyData);
}

new Provider().save([
	{
			"id": "1",
			"title": "Lorem ipsum",
			"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		},
		{
			"id":"2",
			"title": "Sed egestas",
			"text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
		}
], function(error, posts){});

exports.Provider = Provider;