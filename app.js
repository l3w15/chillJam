const express = require('express')
const app = express()

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs')

var Twitter = require('twitter');
var config = require('./config.js');

app.get('/', (req,res) => res.render('index', function(err, html){
  res.send(twitterReq())
}));

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
         for (var i = 0; i < data.statuses.length; i++) {
          resolve(result.push( data.statuses[i].text ))
        }
      } else {
        reject( result.push( err ) )
      }
    })
    return prom.then((result) => {
      return result
    })
  });
};
