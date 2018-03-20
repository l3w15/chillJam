var tweetParser = function(tweetData) {
  var tweet = {};
  tweet.url = "https://twitter.com/" + tweetData.user.screen_name + "/status/" + tweetData.id_str;
  tweet.text = tweetData.text;
  return tweet;
};

module.exports = tweetParser;
