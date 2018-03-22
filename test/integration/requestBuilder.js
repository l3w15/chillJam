// To test API call returns expected data

it('returns the correct tweet data', function(done) {
  var promise = getTweetsReq({
    q: '#competition'
  });
  promise.then().should.eventually.have.property('statuses').notify(done);
});
