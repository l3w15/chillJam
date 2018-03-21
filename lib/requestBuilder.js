const Twitter = require('twitter');
const config  = require('../config.js');
const TweetParser = require('../lib/tweetParser.js');
const tweetParser = TweetParser.tweetParser;

var defineParams = function(query) {
  params = {
    q: '#giveaway ' + query + ' -RT',
    count: 100,
    result_type: 'recent',
    lang: 'en'
  };
  console.log(params);
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
}

module.exports = { defineParams: defineParams,
                   twitterReq: twitterReq };
