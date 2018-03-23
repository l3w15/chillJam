const express          = require('express');
const bodyParser       = require('body-parser');
const Twitter          = require('twitter');
const requestBuilder   = require('../lib/requestBuilder.js');
const tParser          = require('../lib/tweetParser.js')
const config           = require('../config.js');
const getTweetsReq     = requestBuilder.getTweetsReq;
const defineParams     = requestBuilder.defineParams;
const likeAllTweets    = requestBuilder.likeAllTweets;
const retweetAllTweets = requestBuilder.retweetAllTweets;
const followAllUsers   = requestBuilder.followAllUsers;
const tweetParser      = tParser.tweetParser;
const app              = express();
const twitter          = new Twitter(config);

var params;

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.route('/tweets')
  .get((req, res) => {
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
  .post((req, res) => {
    params = defineParams(req.body.query);
    res.redirect('/tweets');
  });

app.listen(3000, () => console.log('Listening on port 3000'));
