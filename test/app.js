
var chai = require("chai");
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

var app = require("../app/app.js");

describe("Twitter Request", function() {
  it("resolving promises", function(done) {
    return twitterReq().should.eventually.have.length(3).notify(done);
  })
})
