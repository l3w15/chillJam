const chai           = require('chai');
const expect         = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const Twitter        = require('twitter');
const config         = require('../../config.js');
const requestBuilder = require('../../lib/requestBuilder.js');
const getTweetsReq   = requestBuilder.getTweetsReq;
const twitter        = new Twitter(config);

chai.use(chaiAsPromised);

describe('Makes successfuly request to Twitter Api', () => {
  it('returns the correct tweet data', (done) => {
    let params = { q: '#competition' };
    let request = getTweetsReq(twitter, params);
    expect(request.then()).to.eventually.have.property('statuses').notify(done);
  });
});
