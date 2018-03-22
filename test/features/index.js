const app = require('../../app/app.js');

const Browser = require('zombie');

Browser.localhost('chilljam', 3000);
console.log(Browser.site);
const browser = new Browser();

describe('chillJam', function() {
  before(function(done) {
    browser.visit('/', done);
  });

  describe('index', function() {
    it('should be succesful', function() {
      browser.assert.success();
    });
  });

  describe('displays welcome message', function() {
    it('should welcome the user', function() {
      browser.assert.text('#welcome', 'Welcome to chillJam!');
    });
  });

  describe('fills search term', function() {
    before(function(done) {
      browser.fill('#query', 'chocolate');
      browser.pressButton('Submit').then(() => done());
    });

    it('should display the tweets after sending a req', function() {
      browser.assert.text('.info-message', 'You have liked retweeted and followed the below tweets');
      // Further testing welcome message
      // has li elems
      // has a href
    });
  });
});
