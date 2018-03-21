const express         = require('express');
const requestBuilder  = require('../lib/requestBuilder.js');
const app             = express();
const bodyParser      = require('body-parser');
const twitterReq      = requestBuilder.twitterReq;
const defineParams    = requestBuilder.defineParams;
// const TweetParser     = require('../lib/tweetParser.js');
// const tweetParser     = TweetParser.tweetParser;
// const reqBuilder      = new requestBuilder.RequestBuilder;
// const Twitter         = require('twitter');
// const config          = require('../config.js');

var params;

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index')
})

app.route('/tweets')
  .get(function(req, res) {
    twitterReq(params)
      .then(tweets => {
        res.render('tweets', { tweets: tweets() });
      })
      .catch(reject => { console.log(reject); });
  })
  .post(function(req, res) {
    console.log("success")
    console.log(req.body.query);
    params = defineParams(req.body.query);
    res.redirect('/tweets')
  })

app.listen(3000, () => console.log('Listening on port 3000'));
