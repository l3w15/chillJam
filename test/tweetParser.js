var chai = require("chai");
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

var tweetParser = require("../lib/tweetParser.js");
