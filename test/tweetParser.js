var chai = require("chai");
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

var tweetParser = require("../lib/tweetParser.js");
var testJson = require("./sampleTweetSearchJson.js")

describe("tweetParser", function () {
  it("contains the tweet's urls", function() {
    tweetParser(testJson.statuses[0]).url.should.equal("https://twitter.com/NASA/status/967824267948773377")
  })

  it("contains the tweet's text", function() {
    tweetParser(testJson.statuses[0]).text.should.equal("From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804")
  })
})
