var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

// var testJson = require('./testData/sampleTweetSearchJson.js');
const requestBuilder    = require("../lib/requestBuilder.js")
const tParser           = require("../lib/tweetParser.js")
const tweetParser       = tParser.tweetParser
const singleTweetParser = tParser.singleTweetParser;
const twitterReq        = requestBuilder.twitterReq
const defineParams      = requestBuilder.defineParams;
const likeReq           = requestBuilder.likeReq;
const likeAllTweets     = requestBuilder.likeAllTweets;
const retweetAllTweets  = requestBuilder.retweetAllTweets;
const followAllUsers    = requestBuilder.followAllUsers;


describe('defineParams', function(){
  it('defines the search parameters', function(){
    expect(defineParams('chocolate')).to.be.a('object').with.property('count')
    // expect(defineParams('chocolate')).to.have.property('count')
  })
});

describe('twitterReq', function() {
 it('returns the correct tweet data', function(done) {
   var promise = twitterReq({
     q: '#competition'
   });
   // console.log(promise.then().resolve())
   promise.then().should.eventually.have.property('statuses').notify(done);
 });
});

// describe('likeReq', function(){
//   it('likes a tweet given the tweet_id', function(){
//
//   })
// })

describe('likeAllTweets', function(){
  it('likes all returned tweets', function(){
    var tweet1 = {id: 1234}
    var tweet2 = {id: 5678}
    likeAllTweets([tweet1, tweet2])
    expect(tweet1.liked).to.be.true
  })
})
