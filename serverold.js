'use strict';

var express = require('express');
var path = require('path');
var seneca = require('seneca')();
var admin = require('./admin');
var atm = require('lamassu-atm-protocol');
var pg = require('pg');
var winston = require('winston');
var config = require('lamassu-config');
var logger = new (winston.Logger)({transports:[new (winston.transports.Console)()]});

process.on('uncaughtException', function(err) {
  console.error('uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

seneca.use('options', 'options.mine.js');
seneca.use('user');
seneca.use('auth');

seneca.ready(function(err) {
  if (err) {
    return process.exit(!console.error(err));
  }

  var options = seneca.export('options');
  var u = seneca.pin({role: 'user',cmd: '*'});
  u.register({nick:'u1', name:'nu1', email: 'u1@example.com', password: 'u1', active: true});

  var app = express();
  app.configure(function() {
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
  });
  app.configure('development', function() {
    app.use(express.static(path.join(__dirname, '.tmp')));
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.errorHandler());
    seneca.log.info('listen', options.main.port);
  });
  app.configure('production', function() {
    app.use(express.favicon(path.join(__dirname, 'dist/favicon.ico')));
    app.use(express.static(path.join(__dirname, 'dist')));
  });
  app.use(seneca.export('web'));

  var port = process.env.PORT || 3000;

  admin.init(app, config, logger);
  config.load(function(err, conf) {
    if (err) { console.log(err); process.exit(1); }
    atm.init(app, conf.config);

    seneca.listen();
    /*
    app.listen(port, function() {
      console.log('Express server listening on port %d in %s mode', port, app.get('env'));
    });
    */
  });

});


