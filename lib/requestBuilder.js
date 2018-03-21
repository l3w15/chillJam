const Twitter = require('twitter');
const config  = require('../config.js');
const TweetParser = require('../lib/tweetParser.js');
const tweetParser = TweetParser.tweetParser;

var defineParams = function(query) {
  let params = {
    q: '#competition ' + query + ' -RT',
    count: 100,
    result_type: 'recent',
    lang: 'en'
  };
  return params;
}

var twitterReq = function(params) {
  var T = new Twitter(config);

  const prom = new Promise(function(resolve, reject) {
    T.get('search/tweets', params, function(err, data, response) {
      resolve(() => {
        return tweetParser(data);
      });
      reject(() => { return err; });
    });
  });
  return prom;
};

var likeReq = function(tweetId) {
  let T = new Twitter(config);

  T.post('favorites/create', { id: tweetId }, function(err, tweet, response) {
    if (err) console.log(err);
    console.log("liked tweet with id " + tweetId);
  });
};

var retweetReq = function(tweetId) {
  let T = new Twitter(config);

  T.post('statuses/retweet', { id: tweetId }, function(err, tweet, response) {
    if (err) console.log(err);
    console.log("retweeted id " + tweetId);
  });
}

var followReq = function(userId) {
  let T = new Twitter(config);

  T.post('friendships/create', { id: userId }, function(err, tweet, response) {
    if (err) console.log(err);
    console.log("made friends with id " + userId);
  });
}

var likeAllTweets = function(tweets) {
  tweets.map(el => likeReq(el.id));
}

var retweetAllTweets = function(tweets) {
  tweets.map(el => retweetReq(el.id));
}

var followAllUsers = function(tweets) {
  tweets.map(el => followReq(el.userId));
}



module.exports = { defineParams: defineParams,
                   twitterReq: twitterReq,
                   likeAllTweets: likeAllTweets,
                   retweetAllTweets: retweetAllTweets,
                   followAllUsers: followAllUsers
                 };
