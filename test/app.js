
var chai = require("chai");
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

// var app = require("../app/app.js");
var requestBuilder = require("../lib/requestBuilder.js")
var tParser = require("../lib/tweetParser.js")
var tweetParser = tParser.tweetParser
var twitterReq = requestBuilder.twitterReq

describe('twitterReq', function() {
 it('returns the correct tweet data', function(done) {
   var promise = twitterReq({
     q: '#competition'
   });
   // console.log(promise.then().resolve())
   promise.then().should.eventually.have.property('statuses').notify(done);
 });
});
