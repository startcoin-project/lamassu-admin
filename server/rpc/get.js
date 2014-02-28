var async = require('async');
var config = require('lamassu-config');

var psql = process.env.DATABASE_URL || 'postgres://lamassu:lamassu@localhost/lamassu';

var fetch_user = function(){
  return {
    id: '1'
  }
}

var price_settings = function(callback){
  config.load(psql, function(err, results) {
    if (err) return callback(err);
    callback(null, {
      provider: results.config.exchanges.plugins.current.ticker,
      commission: results.config.exchanges.settings.commission,
      custom_url: null
    });
  });
}

var wallet_settings = function(callback){
  config.load(psql, function(err, results) {
    if (err) return callback(err);

    var provider = results.config.exchanges.plugins.current.transfer;
    var settings = results.config.exchanges.plugins.settings[provider];
    settings.provider = provider;
    callback(null, settings);
  });
}

var exchange_settings = function(callback){
  config.load(psql, function(err, results) {
    if (err) return callback(err);

    var provider = results.config.exchanges.plugins.current.trade;
    if (!provider) {
      return callback(null, null);
    }

    var settings = results.config.exchanges.plugins.settings[provider];
    settings.provider = provider;
    callback(null, settings);
  });
}



exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function() {

      //return price settings to the client
      price_settings(res);

    }, 
    
    wallet: function(){

      //return wallet settings to the client
      wallet_settings(res);

    }, 
    
    exchange: function(){

      //return exchange settings to the client
      exchange_settings(res);

    },

    user: function(){

      //get base user info
      var user = fetch_user()

      //fill user with price/wallet/exhange data
      user['price'] = price_settings()
      user['wallet'] = wallet_settings()
      user['exchange'] = exchange_settings()

      //return user to the client
      res(null, user)

    }
  }
}
