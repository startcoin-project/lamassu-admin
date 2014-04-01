var config = require('../config.js');

var price = function (data) {
  config.load(function (err, results) {
    if (err) return res(err);
    results.config.exchanges.settings.commission = data.commission;
    results.config.exchanges.plugins.current.ticker = data.provider;
    config.saveExchangesConfig(results.config, res);
  });
};

var wallet = function (data) {
  config.load(function (err, results) {
    if (err) return callback(err);

    var provider = data.provider;
    var settings = results.config.exchanges.plugins.settings[provider];
    results.config.exchanges.plugins.current.wallet = provider;
    Object.keys(data).forEach(function (key) {
      if (key !== 'provider')
        settings[key] = data[key];
    });

    config.saveExchangesConfig(results.config, res);
  });
};

var exchange = function (data) {
  config.load(function (err, results) {
    if (err) return callback(err);

    var provider = data.enabled ? data.provider : null;
    results.config.exchanges.plugins.current.trade = provider;

    if (provider) {
      var settings = results.config.exchanges.plugins.settings[provider];
      Object.keys(data).forEach(function(key) {
        if (key !== 'provider' && key !== 'enabled')
          settings[key] = data[key];
      });
    }

    config.saveExchangesConfig(results.config, res);
  });
};

var compliance = function (data) {
  config.load(function (err, results) {
    if (err) return callback(err);
    // validate elements???
    results.config.exchanges.settings.compliance = data;
    // res { ok: true }
    config.saveExchangesConfig(results.config, res);
  });
};

module.exports = function (app) {
  app.post('/price', price);
  app.post('/wallet', wallet);
  app.post('/exchange', exchange);
  app.post('/compliance', compliance);
};
