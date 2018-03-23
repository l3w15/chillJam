const app     = require('../../app/app.js');
const Browser = require('zombie');

Browser.localhost('chilljam', 3000);

const browser = new Browser();

describe('chillJam', () => {
  before((done) => {
    browser.visit('/', done);
  });

  describe('index', () => {
    it('should be succesful', () => {
      browser.assert.success();
    });
  });

  describe('displays welcome message', () => {
    it('should welcome the user', () => {
      browser.assert.text('#welcome', 'Welcome to chillJam!');
    });
  });

  describe('fills search term', () => {
    before((done) => {
      browser.fill('#query', 'chocolate');
      browser.pressButton('Submit').then(() => done());
    });

    it('should display the tweets after sending a req', () => {
      browser.assert.text('.info-message', 'You have liked, retweeted and followed the below tweets');
      // Further testing welcome message
      // has li elems
      // has a href
    });
  });
});
