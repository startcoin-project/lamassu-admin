var config = require('../config.js');
var fingerprint = require('../fingerprint.js');

exports.actions = function(req, res, ss) {
  req.use('session');

  return {
    create_pairing_token: function(data) {
      config.createPairingToken(function(err, token) {
        if (err) return res(err);
        res(null, token);
      })
    },
    get_server_address: function(data) {
      res(null, {
        host: '255.255.255.255',
        port: 3000,
        fingerprint: fingerprint()
      });
    }
  }
}
