const expect            = require('chai').expect;
const testJson          = require('./testData/sampleTweetSearchJson.js');
const tweetParsers      = require('../lib/tweetParser.js');
const singleTweetParser = tweetParsers.singleTweetParser;
const tweetParser       = tweetParsers.tweetParser;

describe('singleTweetParser', () => {
  it("contains the tweet's urls", () => {
    expect(singleTweetParser(testJson.statuses[0]).url).to.equal('https://twitter.com/NASA/status/967824267948773377');
  });

  it("contains the tweet's text", () => {
    expect(singleTweetParser(testJson.statuses[0]).text).to.equal('From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804');
  });

  it("contains the tweet's id", () => {
    expect(singleTweetParser(testJson.statuses[0]).id).to.equal('967824267948773377');
  });
});

describe('tweetParser', () => {
  it('returns an array of tweets containing the appropriate information', () => {
    let expectedOutput = [
      singleTweetParser(testJson.statuses[0]),
      singleTweetParser(testJson.statuses[1]),
      singleTweetParser(testJson.statuses[2]),
      singleTweetParser(testJson.statuses[3]),
      singleTweetParser(testJson.statuses[4])
    ];

    expect(tweetParser(testJson)).to.deep.include.members(expectedOutput);
  });
});
