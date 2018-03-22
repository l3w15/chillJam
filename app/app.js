const express         = require('express');
const requestBuilder  = require('../lib/requestBuilder.js');
const app             = express();
const bodyParser      = require('body-parser');
const twitterReq      = requestBuilder.twitterReq;
const defineParams    = requestBuilder.defineParams;
const likeReq       = requestBuilder.likeReq;
const likeAllTweets = requestBuilder.likeAllTweets;
const retweetAllTweets = requestBuilder.retweetAllTweets;
const followAllUsers = requestBuilder.followAllUsers;

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
    twitterReq(params)
      .then(tweets => {
        // likeAllTweets(tweets);
        // retweetAllTweets(tweets);
        // followAllUsers(tweets);
        res.render('tweets', { tweets: tweets });
      })
      .catch(reject => { console.log(reject); });
  })
  .post(function(req, res) {
    params = defineParams(req.body.query);
    res.redirect('/tweets');
  });

// app.post('/favourites', function(req, res) {
//   likeReq(req.body.id);
//   res.redirect('/tweets');
// });

app.listen(3000, () => console.log('Listening on port 3000'));
