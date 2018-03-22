var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

// var testJson = require('./testData/sampleTweetSearchJson.js');
const requestBuilder      = require("../lib/requestBuilder.js")
const tParser             = require("../lib/tweetParser.js")
const tweetParser         = tParser.tweetParser
const singleTweetParser   = tParser.singleTweetParser;
const twitterReq          = requestBuilder.twitterReq
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
})
