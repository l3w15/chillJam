const Twitter = require('twitter');
const config  = require('../config.js');

var T = new Twitter(config);

var defineParams = function(query) {
  let params = {
    q: '#competition #' + query + ' -RT',
    count: 20,
    result_type: 'recent',
    lang: 'en'
  };
  return params;
};

const getTweetsReq = function(twitter, params) {
  return twitter.get('search/tweets', params);
};

const likeReq = function(twitter, tweetId) {
  twitter.post('favourites/create', { id: tweetId });
  console.log('You liked tweet with id: ' + tweetId);
};

const retweetReq = function(twitter, tweetId) {
  twitter.post('statuses/retweet', { id: tweetId });
  console.log('You retweeted tweet with id: ' + tweetId);
};

const followReq = function(twitter, userId) {
  twitter.post('friendships/create', { id: userId });
  console.log('You made friends with user with id: ' + userId);
};

var likeAllTweets = function(twitter, tweets) {
  tweets.map(el => likeReq(twitter, el.id));
};

var retweetAllTweets = function(twitter, tweets) {
  tweets.map(el => retweetReq(twitter, el.id));
};

var followAllUsers = function(twitter, tweets) {
  tweets.map(el => followReq(twitter, el.userId));
};

module.exports = { defineParams: defineParams,
                   getTweetsReq: getTweetsReq,
                   likeAllTweets: likeAllTweets,
                   retweetAllTweets: retweetAllTweets,
                   followAllUsers: followAllUsers,
                   likeReq: likeReq,
                   retweetReq: retweetReq,
                   followReq: followReq
                 };
