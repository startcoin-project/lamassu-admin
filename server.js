'use strict';

var express = require('express');
var path = require('path');
var seneca = require('seneca')();
var pg = require('pg'); 

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

  var port = options.main.port || 3000;
  app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
  });

  app.get('/exchange', function(req, res) { 
    var conString = "postgres://postgres:password@localhost/lamassu";
    var client = new pg.Client(conString);

    client.connect(function(err) {
      client.query('SELECT * FROM user_config WHERE type = \'exchanges\'', function(err, results) {
        console.log('error reading config');
        console.dir(err);
        console.dir(results);
        res.json(JSON.parse(results.rows[0].data));
      })
    });
  });

  app.post('/exchange', function(req, res) { 
    var config = JSON.stringify(req.body);
    var conString = "postgres://postgres:password@localhost/lamassu";
    var client = new pg.Client(conString);

    console.log(config);
    console.log(req.body);

    client.connect(function(err) {
      console.log('Connect error')
      console.dir(err)

      client.query('UPDATE user_config SET data = \'' + config + '\'  WHERE type = \'exchanges\'', function(err, results) {
        console.log('update error: ');
        console.dir(err);
      })
    });
  });

  app.get('/commission', function(req, res) { 
  });

  app.post('/commission', function(req, res) { 
  });

  seneca.listen();

});
