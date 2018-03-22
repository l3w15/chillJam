var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const TweetParsers = require('../lib/tweetParser.js');
var singleTweetParser = TweetParsers.singleTweetParser;
var tweetParser = TweetParsers.tweetParser;
var testJson = require('./testData/sampleTweetSearchJson.js');

describe('singleTweetParser', function() {
  it("contains the tweet's urls", function() {
    singleTweetParser(testJson.statuses[0]).url.should.equal('https://twitter.com/NASA/status/967824267948773377');
  });

  it("contains the tweet's text", function() {
    singleTweetParser(testJson.statuses[0]).text.should.equal('From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804');
  });

  it("contains the tweet's id", function() {
    singleTweetParser(testJson.statuses[0]).id.should.equal('967824267948773377');
  });
});

describe('tweetParser', function() {
  it('returns an array of tweets containing the appropriate information', function() {
    let expectedOutput = [singleTweetParser(testJson.statuses[0]),
                          singleTweetParser(testJson.statuses[1]),
                          singleTweetParser(testJson.statuses[2]),
                          singleTweetParser(testJson.statuses[3]),
                          singleTweetParser(testJson.statuses[4])
                         ];

    tweetParser(testJson).should.deep.include.members(expectedOutput);
  });
});
