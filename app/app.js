const express = require('express')
const TweetParser = require('../lib/tweetParser.js')
const app = express();
const Twitter = require('twitter');
const config = require('../config.js');
const tweetParser = TweetParser.tweetParser;

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs')

app.get('/', function (req,res) {
  twitterReq()
    .then( tweets => {
      res.render('index', { tweets: tweets() })
    })
    .catch( reject => { console.log(reject) })
});

app.listen(3000, () => console.log('Listening on port 3000'))

twitterReq = function() {

  var T = new Twitter(config);

  var params = {
    q: '#giveaway -RT',
    count: 100,
    result_type: 'recent',
    lang: 'en'
  }

  const prom = new Promise(function(resolve, reject) {
    T.get('search/tweets', params, function(err, data, response) {
      resolve( () => {
        tweets = tweetParser(data)
        return tweets
      });
      reject( () => { return err });
    });
  });

  return prom
};
