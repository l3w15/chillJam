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
      browser.pressButton('Submit').then(function() {
        console.log('We are in here!');
        done();
      });

      // NEXT: get rid of our promise, use the T.get one
      // This way we should be able to test the request on screen
      // sampleTweetSearchJson.js

      // Test the current path stuff
    });

    it('should display the tweets after sending a req', function() {
      browser.assert.text('.goodbye', 'goodbye');
      // welcome message
      // has li elems
      // has a href
    });
  });
});
