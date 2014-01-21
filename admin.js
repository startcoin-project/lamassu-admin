'use strict';

var _config;
var _logger;

/**
 * initialize the admin routes and attach to the express application object
 */
exports.init = function(app, config, logger) {
  _config = config;
  _logger = logger;


  app.get('/exchange', function(req, res) {
    _config.readExchangesConfig(function(err, cfg) {
      if(err){
        _logger.log('error', 'Error while reading exchanges config: %j', err);
        res.json(500, err);
      }
      res.json(cfg);
    });
  });


  app.post('/exchange', function(req, res) {
    var exchangesConfig = JSON.stringify(req.body);

    if(!exchangesConfig) {
      _logger.log('error', 'No congig supplied for update.');
      res.json({ok:false, msg: 'No config suupplied.'});
      return;
    }

    _config.saveExchangesConfig(exchangesConfig, function(err, result) {
      if(err) {
        _logger.log('error', 'Error while saving exchanges config: %j', err);
        res.json(500, err);
      }
      res.json(result);
    });
  });
};
