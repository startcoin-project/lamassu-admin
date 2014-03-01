var assert = require('assert');
var ss = require('socketstream').start();

describe('lamassu-admin/rpc/set', function() {
  it('should set correct price settings', function(done) {
    ss.rpc('set.price', {
      provider: 'bitpay',
      commission: 1.5
    }, function(setResult) {
      assert(!setResult[0], 'setting commission should succeed');

      ss.rpc('get.price', function(getResult) {
        assert(!getResult[0], 'getting price after setting should succeed');

        assert.equal(getResult[1].commission, 1.5, 'commission should be set properly');
        done();
      });
    });
  });

  it('should set correct wallet settings', function(done) {
    ss.rpc('set.wallet', {
      provider: 'blockchain',
      guid: 'foo',
      password: 'bar'
    }, function(setResult) {
      assert(!setResult[0], 'setting commission should succeed');

      ss.rpc('get.wallet', function(getResult) {
        assert(!getResult[0], 'getting price after setting should succeed');

        assert.equal(getResult[1].guid, 'foo', 'guid should be set correctly');
        assert.equal(getResult[1].password, 'bar', 'password should be set correctly');
        done();
      });
    });
  });
});
