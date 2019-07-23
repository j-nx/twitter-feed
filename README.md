# Twitter-feed

A server and client script to display the last tweets from a user. (Incl. rotate single tweet)

# Configuration

Server Configuration:

```
# Get these from Twitter
CONSUMER_KEY = ''
CONSUMER_SECRET = ''
ACCESS_TOKEN = '';
ACCESS_TOKEN_SECRET = '';
```

Client Configuration:

```
$.fn.tweetable.options = {
    api: 'LOCATION_OF_SERVER_SCRIPT',   // Server API
    limit: 5,                           // Number of tweets to show
    username: 'USERNAME',               // @username tweets to display
    time: false,                        // Display date
    rotate: false,                      // Rotate tweets
    speed: 20000,                       // Speed of rotation
    replies: true,                      // Filter out @replys
    position: 'append',                 // Append position
    failed: "No tweets available",      // Twitter stream unavailable text
    html5: false,                       // HTML5 Support
    retweets: false,                    // Show retweets
    onComplete: function($ul) {}        // On complete callback
};
```
