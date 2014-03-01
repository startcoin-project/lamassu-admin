var LamassuConfig = require('lamassu-config');

var psql = process.env.DATABASE_URL || 'postgres://lamassu:lamassu@localhost/lamassu';
var config = new LamassuConfig(psql);

exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function(data) {
      config.load(function (err, results) {
        if (err) return res(err);
        results.config.exchanges.settings.commission = data.commission;
        results.config.exchanges.plugins.current.ticker = data.provider;
        config.saveExchangesConfig(results.config, res);
      });
    }, 
    
    wallet: function(data) {
      config.load(function(err, results) {
        if (err) return callback(err);

        var provider = data.provider;
        var settings = results.config.exchanges.plugins.settings[provider];
        results.config.exchanges.plugins.current.wallet = provider;
        Object.keys(data).forEach(function(key) {
          if (key !== 'provider')
            settings[key] = data[key];
        });

        config.saveExchangesConfig(results.config, res);
      });
    }, 

    exchange: function(data){
      config.load(function(err, results) {
        if (err) return callback(err);

        var provider = data.provider;
        var settings = results.config.exchanges.plugins.settings[provider];
        results.config.exchanges.plugins.current.trade = provider;
        Object.keys(data).forEach(function(key) {
          if (key !== 'provider')
            settings[key] = data[key];
        });

        config.saveExchangesConfig(results.config, res);
      });
    }

  }

}
