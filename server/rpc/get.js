var async = require('async');
var config = require('../config.js');

var priceSettings = function (req, res) {
  config.load(function (err, results) {
    if (err) return res.json(500, err);
    res.json(200, {
      provider: results.config.exchanges.plugins.current.ticker,
      commission: results.config.exchanges.settings.commission,
      custom_url: null
    });
  });
};

var walletSettings = function (req, res) {
  config.load(function (err, results) {
    if (err) return res.json(500, err);

    var provider = results.config.exchanges.plugins.current.transfer;
    var settings = results.config.exchanges.plugins.settings[provider];
    settings.provider = provider;
    res.json(200, settings);
  });
};

var exchangeSettings = function (req, res) {
  config.load(function(err, results) {
    if (err) return res.json(500, err);

    var provider = results.config.exchanges.plugins.current.trade;
    if (!provider) {
      return res.json(200, null);
    }

    var settings = results.config.exchanges.plugins.settings[provider];
    settings.provider = provider;
    res.json(200, settings);
  });
};

var currencySettings = function (req, res) {
  res.json(200, { type:'USD', symbol:'$' });
};

var complianceSettings = function(callback) {
  config.load(function(err, results) {
    if (err) return callback(err);

    var default_settings =  {
      maximum: {
        limit: 500
      },
      verification: {
        service: 'idology',
        username: 'default_user',
        password: '********'
      }
    };

    var compliance = results.config.exchanges.settings.compliance || default_settings;

    callback(null, compliance);
  });
};

var userSettings = function (req, res) {
  async.parallel({
    price: priceSettings,
    wallet: walletSettings,
    exchange: exchangeSettings,
    compliance: complianceSettings
  }, function (err, results) {

    if (err) //if err don't try to return data
      return res.json(500, err);

    res.json(200, results);
  });
};

module.exports = function (app) {
  app.get('/price', priceSettings);
  app.get('/wallet', walletSettings);
  app.get('/exchange', exchangeSettings);
  app.get('/currency', currencySettings);
  app.get('/compliance', complianceSettings);
  app.get('/user', userSettings);
};
