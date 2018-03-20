const express = require('express')
const util = require('util')
const app = express()

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs')

var Twitter = require('twitter');
var config = require('./config.js');

app.get('/', function (req,res) {
  twitterReq().then(data => {
    res.render('index', { tweets: data })
  })
});

app.listen(3000, () => console.log('Listening on port 3000'))

function twitterReq(){

  var T = new Twitter(config);
  var result = [];

  var params = {
    q: '#giveaway -RT',
    count: 20,
    result_type: 'recent',
    lang: 'en'
  }

  const prom = new Promise(function(resolve,reject) {
    T.get('search/tweets', params, function(err, data, response) {
      if(!err) {
        resolve( function(){
          var tweets = [];
          for (var i = 0; i < data.statuses.length; i++) {
            tweets.push(data.statuses[i].text)
          }
          return tweets
        })
      } else {
        reject(function(){ console.log("failure") })
      }
    })
  });

  return prom.then((result) => {
    // console.log(result.toString())
    return result()
  }).catch((rej) => { rej(); })


};
