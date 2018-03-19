
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

var params = {
  q: '#giveaway -filter:retweets',
  count: 20,
  result_type: 'recent',
  lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
  if(!err) {
    for (var i = 0; i < data.statuses.length; i++) {
      // console.log(data.statuses[i].text)
      console.log(data.statuses[i].text)
    }
  } else {
    console.log(err)
  }
});