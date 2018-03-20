const express = require('express')
const util = require('util')
const app = express()

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs')

var Twitter = require('twitter');
var config = require('./config.js');

app.get('/', function (req,res) {
  twitterReq().then(tweets => {
    res.render('index', { tweets: tweets() })
  })
  .catch( reject => { console.log(reject) })
});

app.listen(3000, () => console.log('Listening on port 3000'))

function twitterReq(){

  var T = new Twitter(config);

  var params = {
    q: '#giveaway -RT',
    count: 100,
    // result_type: 'recent',
    lang: 'en'
  }

  const prom = new Promise(function(resolve,reject) {
    T.get('search/tweets', params, function(err, data, response) {
      resolve( () => {
        var tweets = data.statuses.map(function(tweetData) {
          var tweet = {};
          tweet.text = tweetData.text;
          tweet.url = "https://twitter.com/" + tweetData.user.screen_name + "/status/" + tweetData.id_str
          console.log(tweet.url)
          return tweet;
        });
        return tweets
      });

        reject( () => { return err });
    });
  });

  return prom
};
