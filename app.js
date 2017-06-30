var emoji = require('node-emoji');
var Twit = require('twit');


// Twitter authentication info
var TWITTER_BOT_NAME = "";

var T = new Twit({
		consumer_key: "",
		consumer_secret: "",
		access_token: "",
		access_token_secret: ""
	});


	
// Track tweets to bot name	
var stream = T.stream('user', {
		track: TWITTER_BOT_NAME
	});

stream.on('connected', function (response) {
	console.log("Connected to Twitter stream.")
});

stream.on('tweet', function (tweet) {
	var tweet_contents = tweet["text"];
	var tweet_user = tweet["user"]["screen_name"];
	var tweet_id = tweet["id_str"];
	var tweet_time = tweet["user"]["created_at"];
	var tweet_url = ("https://twitter.com/" + tweet_user + "/status/" + tweet_id);

	console.log("Tweet: \"" + tweet_contents + "\" | Source: " + tweet_url);

	var nameID = tweet_id;
	var name = tweet_user;
	var tweet_emojied = tweet.text;
	
	// If sent quoted tweet, use text from quoted tweet
	if (tweet.is_quote_status) {
		tweet_emojied = tweet.quoted_status.text;
	}
	
	// Remove any @names from messages
	var tweet_emojied = tweet_emojied.replace(/(@)\w+/ig, "");

	tweet_emojied = emoji.emojify(tweet_emojied);

	for (var i = 0, len = tweet_emojied.length; i < len; i++) {
		
		// Replace all letters
		tweet_emojied = tweet_emojied.toUpperCase();
		tweet_emojied = tweet_emojied.replace("A", "???");
		tweet_emojied = tweet_emojied.replace("B", "???");
		tweet_emojied = tweet_emojied.replace("C", "???");
		tweet_emojied = tweet_emojied.replace("D", "???");
		tweet_emojied = tweet_emojied.replace("E", "???");
		tweet_emojied = tweet_emojied.replace("F", "???");
		tweet_emojied = tweet_emojied.replace("G", "???");
		tweet_emojied = tweet_emojied.replace("H", "???");
		tweet_emojied = tweet_emojied.replace("I", "???");
		tweet_emojied = tweet_emojied.replace("J", "???");
		tweet_emojied = tweet_emojied.replace("K", "???");
		tweet_emojied = tweet_emojied.replace("L", "???");
		tweet_emojied = tweet_emojied.replace("M", "???");
		tweet_emojied = tweet_emojied.replace("N", "???");
		tweet_emojied = tweet_emojied.replace("O", "???");
		tweet_emojied = tweet_emojied.replace("P", "???");
		tweet_emojied = tweet_emojied.replace("Q", "???");
		tweet_emojied = tweet_emojied.replace("R", "???");
		tweet_emojied = tweet_emojied.replace("S", "???");
		tweet_emojied = tweet_emojied.replace("T", "???");
		tweet_emojied = tweet_emojied.replace("U", "???");
		tweet_emojied = tweet_emojied.replace("V", "???");
		tweet_emojied = tweet_emojied.replace("W", "???");
		tweet_emojied = tweet_emojied.replace("X", "???");
		tweet_emojied = tweet_emojied.replace("Y", "???");
		tweet_emojied = tweet_emojied.replace("Z", "???");
		tweet_emojied = tweet_emojied.replace(".", "??");

	};
	
	// Replace all numbers and symbols
	for (var i = 0, len = tweet_emojied.length; i < len; i++) {
		tweet_emojied = tweet_emojied.replace("1", ":one:");
		tweet_emojied = tweet_emojied.replace("2", ":two:");
		tweet_emojied = tweet_emojied.replace("3", ":three:");
		tweet_emojied = tweet_emojied.replace("4", ":four:");
		tweet_emojied = tweet_emojied.replace("5", ":five:");
		tweet_emojied = tweet_emojied.replace("6", ":six:");
		tweet_emojied = tweet_emojied.replace("7", ":seven:");
		tweet_emojied = tweet_emojied.replace("8", ":eight:");
		tweet_emojied = tweet_emojied.replace("9", ":nine:");
		tweet_emojied = tweet_emojied.replace("0", ":zero:");
		tweet_emojied = tweet_emojied.replace("!?", ":interrobang:");
		tweet_emojied = tweet_emojied.replace("!", ":exclamation:");
		tweet_emojied = tweet_emojied.replace("?", ":question:");
		tweet_emojied = tweet_emojied.replace("#", ":hash:");
	};

	
	// Compose and send tweet
	if ((tweet.text.indexOf('@' + TWITTER_BOT_NAME) > -1) && (tweet_user != TWITTER_BOT_NAME)) {
		console.log("There is a tweet");
		
		var tweet_precomposed = ('@' + name);

		var reply = tweet_precomposed + ' ' + tweet_emojied;

		var length = 140;

		reply = reply.substring(0, length);
		
		// Send reply tweet
		T.post('statuses/update', {
			in_reply_to_status_id: nameID,
			status: reply
			
		}, function (err, data, response) {
			
			//Do nothing

		})
	}
});
