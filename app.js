const express          = require('express');
const bodyParser       = require('body-parser');
const requestHelpers   = require('./lib/requestHelpers.js');
const postTweetsHelper = requestHelpers.postTweetsHelper;
const twitterApiCalls  = requestHelpers.twitterApiCalls;
const renderTweets     = requestHelpers.renderTweets;

const app              = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => { res.render('index') });

app.post('/tweets', postTweetsHelper, twitterApiCalls, renderTweets);

app.listen(3000, () => console.log('Listening on port 3000'));
