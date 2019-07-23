/*
/*
 * tweetable 1.7.1 - jQuery twitter feed plugin 
 * (Modified for @ replies by Dinesh Jamwal)
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) & Patrick DW (stackoverflow)
 *
 * Revision: $Id: jquery.tweetable.js 2013-06-16 $ 
 *
 * Usage $('#tweets').tweetable({username: 'jamwal', time: true, limit: 150)
 */
 

(function($) {
	var tweets; 
	jQuery.fn.tweetable = function (opts) {
		this.get(0).innerHTML = "";
		
		opts = $.extend({}, $.fn.tweetable.options, opts);

		return this.each(function () {

			var act = jQuery(this)
			,   tweetList = jQuery('<ul class="tweetList">')[opts.position.toLowerCase() + 'To'](act)
			,   shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
			,	  api = opts.api
			,   limitcount = "&limit="
			,   twitterError
			,   tweetMonth
			,   tweetMonthInt
			,   iterate
			,   element;
			
			if (tweets != undefined) 
				renderTweets(tweets);
			else jQuery.getJSON(api, act, function (data) {
				tweets = data; //First call must retrieve max tweets.
				renderTweets(data);
			});
			
			function renderTweets(data) {
				// Check for response error 
				twitterError = data && data.error || null;

				if(twitterError)
				{
					tweetList.append('<li class="tweet_content item"><p class="tweet_link">'+ opts.failed +'</p></li>');
					return;
				}

				// Loop through twitter API response
				jQuery.each(data, function (i, tweet) {

					// Output tweets if less than limit
					if(i >= opts.limit)
						return;
						
				  //Skip if tweet starts with @ (poor man's in_reply_to_status_id)
				  if (opts.replies && tweet.response.charAt(0) == "@")
					return true;

					tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + tweet.response.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + '</p></li>');
					
				});

				// Display one tweet and retweet
				if ( opts.rotate === true ) {

					var listItem = tweetList.find('li')
					,   listLength = listItem.length || null
					,   current = 0
					,   timeout = opts.speed;	

					if(!listLength)
						return

					// Rotate the tweets one at a time
					function rotateTweets() {
					   listItem.eq(current++).fadeOut(400, function(){
							current = (current === listLength) ? 0 : current;
							listItem.eq(current).fadeIn(400);
					   });
					}
					//Hide all but the first tweet
					listItem.slice(1).hide();

					//Rotate tweets at specified interval
					setInterval(rotateTweets, timeout);
				}		
				opts.onComplete(tweetList);
			}
		});
	};

	// Define plugin defaults
	$.fn.tweetable.options = {
	  api: 'https://nasha.co.in/services/twitter/index.py', // Server API
		limit: 5,                       // Number of tweets to show
		username: 'jamwal',              // @username tweets to display
		time: false,                    // Display date
		rotate: false,                  // Rotate tweets
		speed: 20000,                    // Speed of rotation
		replies: true,                 // Filter out @replys
		position: 'append',             // Append position
		failed: "No tweets available",  // Twitter stream unavailable text
		html5: false,                   // HTML5 Support
		retweets: false,                // Show retweets
		onComplete: function($ul) {}    // On complete callback
	};

})(jQuery);
