const tweetParser = (tweetData) => {
  return tweetData.statuses.map(tweet => singleTweetParser(tweet));
};

const singleTweetParser = (tweetData) => {
  const tweet = {};
  tweet.id = tweetData.id_str;
  tweet.url = 'https://twitter.com/' + tweetData.user.screen_name + '/status/' + tweetData.id_str;
  tweet.text = tweetData.text;
  tweet.userId = tweetData.user.id_str;
  return tweet;
};

module.exports = {
  tweetParser: tweetParser,
  singleTweetParser: singleTweetParser
};
