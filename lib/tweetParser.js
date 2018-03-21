const requestBuilder  = require('../lib/requestBuilder.js');

var tweetParser = function(tweetData) {
  return tweetData.statuses.map(tweet => singleTweetParser(tweet));
};

var singleTweetParser = function(tweetData) {
  var tweet = {};
  tweet.id = tweetData.id_str;
  tweet.url = 'https://twitter.com/' + tweetData.user.screen_name + '/status/' + tweetData.id_str;
  tweet.text = tweetData.text;
  tweet.userId = tweetData.user.id_str;
  return tweet;
};

module.exports = { tweetParser: tweetParser,
                  singleTweetParser: singleTweetParser
                };
