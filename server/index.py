#!/usr/bin/python

import sys;
sys.path.append('/path/to/python/');
#sys.path.append('/home/nasha/lib/python/');
#The Local easy_install path 
#To upgrade on shared host use: easy_install --user oauth2

import json;
import oauth2 as oauth
import httplib2;

#Get these from Twitter
CONSUMER_KEY = ''
CONSUMER_SECRET = ''
ACCESS_TOKEN = '';
ACCESS_TOKEN_SECRET = '';

def oauth_req(url, key=CONSUMER_KEY, secret=CONSUMER_SECRET, http_method="GET", post_body="",
        http_headers=None):
    consumer = oauth.Consumer(key, secret)
    token = oauth.Token(ACCESS_TOKEN,ACCESS_TOKEN_SECRET)
    client = oauth.Client(consumer, token)
    
    resp, content = client.request(
        url,
        method=http_method,
        body=post_body,
        headers=http_headers
    )
    return content

def transform_usertimeline(content):    
    jdata = json.loads(content)
    response = []
    
    #trim json content to [{response: "", tweet_date: "Sun Jan 19 03:08:06 +0000 2014"}]
    for item in jdata:
        response.append({'response': item["text"], 'tweet_date' : item["created_at"]})
    
    return json.dumps(response)

# ----- main()
user_timeline = oauth_req('https://api.twitter.com/1.1/statuses/user_timeline.json?exclude_replies=1&trim_user=1&count=150')
tweets = transform_usertimeline(user_timeline)


#needs work - premature end of script headers
print "Content-type: text/html\n\n"
print tweets
#home_timeline = oauth_req('https://api.twitter.com/1.1/statuses/home_timeline.json') (get my feed)
