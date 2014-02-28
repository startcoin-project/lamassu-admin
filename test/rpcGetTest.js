var assert = require('assert');
var ss = require('socketstream').start();

describe('lamassu-admin/rpc/get', function() {
  it('should return correct price settings', function(done) {
    ss.rpc('get.price', function(params) {
      assert(!params[0]);

      assert.equal(params[1].commission, 1.0);
      assert.equal(params[1].provider, 'bitpay');
      assert.equal(params[1].custom_url, null);

      done();
    });
  });
});
