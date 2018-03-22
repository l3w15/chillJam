var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
var spies = require('chai-spies');

chai.use(chaiAsPromised);
chai.use(spies);
chai.should();

// var testJson = require('./testData/sampleTweetSearchJson.js');
const requestBuilder    = require("../lib/requestBuilder.js")
const tParser           = require("../lib/tweetParser.js")
const tweetParser       = tParser.tweetParser;
const singleTweetParser = tParser.singleTweetParser;
const twitterReq        = requestBuilder.twitterReq;
const defineParams      = requestBuilder.defineParams;
const likeReq           = requestBuilder.likeReq;
const likeAllTweets     = requestBuilder.likeAllTweets;
const retweetAllTweets  = requestBuilder.retweetAllTweets;
const followAllUsers    = requestBuilder.followAllUsers;

describe('defineParams', function() {
  it('defines the search parameters', function() {
    expect(defineParams('chocolate')).to.be.a('object').with.property('count')
  });
});

describe('twitterReq', function() {
  it('returns the correct tweet data', function(done) {
    var promise = twitterReq({
      q: '#competition'
    });
    promise.then().should.eventually.have.property('statuses').notify(done);
  });
});

describe('likeAllTweets', function() {
  it('likes all returned tweets', function() {
    var tweet1 = {id: 1234};
    var tweet2 = {id: 5678};
    let spy1 = chai.spy.on(tweet1, 'likeReq');
    let spy2 = chai.spy.on(tweet2, 'likeReq');
    likeAllTweets([tweet1, tweet2]);
    expect(spy1).to.have.been.called;
    expect(spy2).to.have.been.called;
  });
});

describe('retweetAllTweets', function() {
  it('retweets all returned tweets', function() {
    var tweet1 = { id: 1234 };
    var tweet2 = { id: 5678 };
    let spy1 = chai.spy.on(tweet1, 'retweetReq');
    let spy2 = chai.spy.on(tweet2, 'retweetReq');
    retweetAllTweets([tweet1, tweet2]);
    expect(spy1).to.have.been.called;
    expect(spy2).to.have.been.called;
  });
});

describe('followAllUsers', function() {
  it('follows all returned users', function() {
    var tweet1 = { id: 1234 };
    var tweet2 = { id: 5678 };
    let spy1 = chai.spy.on(tweet1, 'followReq');
    let spy2 = chai.spy.on(tweet2, 'followReq');
    followAllUsers([tweet1, tweet2]);
    expect(spy1).to.have.been.called;
    expect(spy2).to.have.been.called;
  });
});