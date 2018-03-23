const Twitter          = require('twitter');
const requestBuilder   = require('./requestBuilder.js');
const tParser          = require('./tweetParser.js')
const config           = require('../config.js');
const getTweetsReq     = requestBuilder.getTweetsReq;
const defineParams     = requestBuilder.defineParams;
const likeAllTweets    = requestBuilder.likeAllTweets;
const retweetAllTweets = requestBuilder.retweetAllTweets;
const followAllUsers   = requestBuilder.followAllUsers;
const tweetParser      = tParser.tweetParser;
const twitter          = new Twitter(config);

const postTweetsHelper = (req, res, next) => {
  req.params = defineParams(req.body.query);
  return next();
};

const twitterApiCalls = (req, res, next) => {
  let params = req.params;
  getTweetsReq(twitter, params)
    .then(data => {
      let tweets = tweetParser(data);
      likeAllTweets(twitter, tweets);
      retweetAllTweets(twitter, tweets);
      followAllUsers(twitter, tweets);
      req.tweets = tweets;
      return next();
    })
    .catch(reject => { console.log(reject) });
};

const renderTweets = (req, res) => {
  let tweets = req.tweets;
  res.render('tweets', { tweets: tweets });
};

module.exports = {
  postTweetsHelper: postTweetsHelper,
  twitterApiCalls: twitterApiCalls,
  renderTweets: renderTweets
}
