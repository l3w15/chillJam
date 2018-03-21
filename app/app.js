const express     = require('express');
const TweetParser = require('../lib/tweetParser.js');
const app         = express();
const Twitter     = require('twitter');
const config      = require('../config.js');
const tweetParser = TweetParser.tweetParser;
const bodyParser  = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index')
})

var params;

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
    console.log(req.body.query)
    defineParams(req.body.query);
    res.redirect('/tweets')
  })

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
};

app.listen(3000, () => console.log('Listening on port 3000'));
