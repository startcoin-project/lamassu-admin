var assert = require('assert');
var ss = require('socketstream').start();

describe('lamassu-admin/rpc/get', function() {
  it('should return correct price settings', function(done) {
    ss.rpc('get.price', function(params) {
      assert(!params[0]);

      console.dir(params);
      assert.equal(params[1].commission, 1.5); // TODO: reseed this from set
      assert.equal(params[1].provider, 'bitpay');
      assert.equal(params[1].custom_url, null);

      done();
    });
  });

  it('should return correct wallet settings', function(done) {
    ss.rpc('get.wallet', function(params) {
      assert(!params[0]);

      assert.equal(params[1].provider, 'blockchain');
      assert(params[1].guid);
      assert(params[1].password);
      assert(params[1].fromAddress);

      done();
    });
  });

  it('should return correct exchange settings', function(done) {
    ss.rpc('get.exchange', function(params) {
      assert(!params[0]);

      if (!params[1]) {
        // No trade exchange configured, skip this (TODO: until we resolve
        // https://github.com/lamassu/lamassu-admin/issues/3 and can change
        // the config in tests).
        return done();
      }
      assert.equal(params[1].provider, 'bitstamp');
      assert(params[1].key);
      assert(params[1].secret);
      assert(params[1].clientId);

      done();
    });
  });
});
