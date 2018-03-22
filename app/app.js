const express          = require('express');
const requestBuilder   = require('../lib/requestBuilder.js');
const app              = express();
const bodyParser       = require('body-parser');
const getTweetsReq     = requestBuilder.getTweetsReq;
const defineParams     = requestBuilder.defineParams;
const likeAllTweets    = requestBuilder.likeAllTweets;
const tParser         = require('../lib/tweetParser.js')
const tweetParser     = tParser.tweetParser;
const retweetAllTweets = requestBuilder.retweetAllTweets;
const followAllUsers   = requestBuilder.followAllUsers;
const Twitter = require('twitter');
const config  = require('../config.js');

const twitter = new Twitter(config);

var params;

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.route('/tweets')
  .get(function(req, res) {
    getTweetsReq(twitter, params)
      .then(data => {
        let tweets = tweetParser(data);
        likeAllTweets(twitter, tweets);
        retweetAllTweets(twitter, tweets);
        followAllUsers(twitter, tweets);
        res.render('tweets', { tweets: tweets });
      })
      .catch(reject => { console.log(reject); });
  })
  .post(function(req, res) {
    params = defineParams(req.body.query);
    res.redirect('/tweets');
  });

app.listen(3000, () => console.log('Listening on port 3000'));
