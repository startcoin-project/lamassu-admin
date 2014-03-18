var config = require('../config.js');

exports.actions = function(req, res, ss) {
  req.use('session');

  return {
    startPairing: function(data) {
      config.createPairingToken(function(err, token) {
        if (err) return res(err);
        res(null, token);
      })
    }
  }
}
