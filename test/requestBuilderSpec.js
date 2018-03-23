const chai              = require('chai');
const expect            = require('chai').expect;
const spies             = require('chai-spies');
const requestBuilder    = require("../lib/requestBuilder.js");
const getTweetsReq      = requestBuilder.getTweetsReq;
const defineParams      = requestBuilder.defineParams;
const likeReq           = requestBuilder.likeReq;
const retweetReq        = requestBuilder.retweetReq;
const followReq         = requestBuilder.followReq;
const likeAllTweets     = requestBuilder.likeAllTweets;
const retweetAllTweets  = requestBuilder.retweetAllTweets;
const followAllUsers    = requestBuilder.followAllUsers;

chai.use(spies);

describe('defineParams', () => {
  it('defines the search parameters', () => {
    expect(defineParams('chocolate')).to.be.a('object').with.property('count');
  });
});

describe('API methods', () => {
  let twitter, stubbedResponse;

  before(() => {
    twitter = {};
    stubbedResponse = (a, b) => { return stubbedResponse; };
    twitter.get = stubbedResponse;
    twitter.post = stubbedResponse;
    twitter.post.catch = stubbedResponse;
  });

  afterEach(() => {
    chai.spy.restore();
  });

  describe('request methods', () => {
    let params, id, idObj;

    before(() => {
      params = { key: 'value' };
      id = 12345;
      idObj = { id: id };
    });

    describe('getTweetsReq', () => {
      it('calls #get on the twitter parameter', () => {
        let twitterSpy = chai.spy.on(twitter, 'get');
        getTweetsReq(twitter, params);
        expect(twitterSpy).to.have.been.called.with.exactly('search/tweets', params);
      });
    });

    describe('likeReq', () => {
      it('calls post on the twitter parameter', () => {
        let twitterSpy = chai.spy.on(twitter, 'post');
        likeReq(twitter, id);
        expect(twitterSpy).to.have.been.called.with.exactly('favorites/create', idObj);
      });
    });

    describe('retweetReq', () => {
      it('calls post on the twitter parameter', () => {
        let twitterSpy = chai.spy.on(twitter, 'post');
        retweetReq(twitter, id);
        expect(twitterSpy).to.have.been.called.with.exactly('statuses/retweet', idObj);
      });
    });

    describe('followReq', () => {
      it('calls post on the twitter parameter', () => {
        let twitterSpy = chai.spy.on(twitter, 'post');
        followReq(twitter, id);
        expect(twitterSpy).to.have.been.called.with.exactly('friendships/create', idObj);
      });
    });
  });

  describe('do X to all methods', () => {
    let tweet1, tweet2, tweetSpy1, tweetSpy2;

    before(() => {
      tweet1 = { id: 1234, userId: 3456 };
      tweet2 = { id: 5678, userId: 6543 };
    });

    describe('likeAllTweets', () => {
      it('likes all returned tweets', () => {
        tweetSpy1 = chai.spy.on(tweet1, 'likeReq');
        tweetSpy2 = chai.spy.on(tweet2, 'likeReq');
        likeAllTweets(twitter, [tweet1, tweet2]);
        expect(tweetSpy1).to.have.been.called;
        expect(tweetSpy2).to.have.been.called;
      });
    });

    describe('retweetAllTweets', () => {
      it('retweets all returned tweets', () => {
        tweetSpy1 = chai.spy.on(tweet1, 'retweetReq');
        tweetSpy2 = chai.spy.on(tweet2, 'retweetReq');
        retweetAllTweets(twitter, [tweet1, tweet2]);
        expect(tweetSpy1).to.have.been.called;
        expect(tweetSpy2).to.have.been.called;
      });
    });

    describe('followAllUsers', () => {
      it('follows all returned users', () => {
        tweetSpy1 = chai.spy.on(tweet1, 'followReq');
        tweetSpy2 = chai.spy.on(tweet2, 'followReq');
        followAllUsers(twitter, [tweet1, tweet2]);
        expect(tweetSpy1).to.have.been.called;
        expect(tweetSpy2).to.have.been.called;
      });
    });
  });
});
