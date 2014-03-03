var assert = require('assert');
var ss = require('socketstream').start();

var blockchain = {
  provider: 'blockchain',
  guid: '85d9dc37-85ce-4d84-a0cc-48d8627b74bc',
  password: 'horse battery stapler',
  fromAddress: '31uEbMgunupShBVTewXjtqbBv5MndwfXhb'
};

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
    ss.rpc('set.wallet', blockchain, function(setResult) {
      assert(!setResult[0], 'setting commission should succeed');

      ss.rpc('get.wallet', function(getResult) {
        assert(!getResult[0], 'getting wallet after setting should succeed');

        assert.equal(getResult[1].guid, blockchain.guid, 'guid should be set correctly');
        assert.equal(getResult[1].password, blockchain.password, 'password should be set correctly');
        assert.equal(getResult[1].fromAddress, blockchain.fromAddress, 'fromAddress should be set correctly');
        done();
      });
    });
  });

  it('should set correct exchange settings', function(done) {
    ss.rpc('set.exchange', blockchain, function(setResult) {
      assert(!setResult[0], 'setting commission should succeed');

      ss.rpc('get.exchange', function(getResult) {
        assert(!getResult[0], 'getting exchange after setting should succeed');

        assert.equal(getResult[1].guid, blockchain.guid, 'guid should be set correctly');
        assert.equal(getResult[1].password, blockchain.password, 'password should be set correctly');
        assert.equal(getResult[1].fromAddress, blockchain.fromAddress, 'fromAddress should be set correctly');
        done();
      });
    });
  });
});
