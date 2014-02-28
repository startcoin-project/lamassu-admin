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
        config._updateConfig(undefined, results.config, res);
      });
    }, 
    
    wallet: function(data){

      console.log('set new wallet data')
      console.log(data)

    }, 

    exchange: function(data){

      console.log('set new exchange data')
      console.log(data)

    }

  }

}
