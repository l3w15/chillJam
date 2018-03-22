const Twitter = require('twitter');
const config  = require('../config.js');

var T = new Twitter(config);

var defineParams = function(query) {
  let params = {
    q: '#competition ' + query + ' -RT',
    count: 1,
    result_type: 'recent',
    lang: 'en'
  };
  return params;
};

const getTweetsReq = function(params) {
  return T.get('search/tweets', params);
};

var likeReq = function(tweetId) {
  T.post('favorites/create', { id: tweetId }, function(err, tweet, response) {
    if (err) console.log(err);
    console.log('liked tweet with id ' + tweetId);
  });
};

var retweetReq = function(tweetId) {
  T.post('statuses/retweet', { id: tweetId }, function(err, tweet, response) {
    if (err) console.log(err);
    console.log('retweeted id ' + tweetId);
  });
};

var followReq = function(userId) {
  T.post('friendships/create', { id: userId }, function(err, tweet, response) {
    if (err) console.log(err);
    console.log('made friends with id ' + userId);
  });
};

var likeAllTweets = function(tweets) {
  tweets.map(el => likeReq(el.id));
};

var retweetAllTweets = function(tweets) {
  tweets.map(el => retweetReq(el.id));
};

var followAllUsers = function(tweets) {
  tweets.map(el => followReq(el.userId));
};

module.exports = { defineParams: defineParams,
                   getTweetsReq: getTweetsReq,
                   likeAllTweets: likeAllTweets,
                   retweetAllTweets: retweetAllTweets,
                   followAllUsers: followAllUsers
                 };
