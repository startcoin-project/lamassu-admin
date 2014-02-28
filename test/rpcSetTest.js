var assert = require('assert');
var ss = require('socketstream').start();

describe('lamassu-admin/rpc/set', function() {
  it('should set correct price settings', function(done) {
    ss.rpc('set.price', { commission: 1.5 }, function(params) {
      assert(!params[0], 'setting commission should succeed');

      ss.rpc('get.price', function (params) {
        assert(!params[0], 'getting price after setting should succeed');

        assert.equal(params[0].commission, 1.5, 'commission should be set properly');
      });

      done();
    });
  });
});
