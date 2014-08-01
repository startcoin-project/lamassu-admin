#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var https = require('https');
var ss = require('socketstream');

var argv = require('yargs').argv;

var secureHeaders = require('./server/secure-headers.js');

var server;

//define assets for admin app
ss.client.define('main', {
  view: 'app.jade',
  css:  ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
});

// serve main client on the root url
ss.http.route('/', function(req, res) {
  res.serveClient('main');
});

// code formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

ss.client.templateEngine.use(require('ss-hogan'));

// minimize and pack assets if you type: SS_ENV=production node app.js
// if (ss.env === 'production') ss.client.packAssets();

// start server
if (argv.http) {
  server = http.Server(ss.http.middleware);
}
else {
  var options = {
    key: fs.readFileSync(argv.key),
    cert: fs.readFileSync(argv.cert),
    secureProtocol: 'TLSv1_method',
    ciphers: 'AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    honorCipherOrder: true
  };

  server = https.createServer(options, ss.http.middleware);
}

server.listen(process.env.PORT || 8081);

ss.http.middleware.append(secureHeaders({ https: !argv.http }));

// start socketstream
ss.start(server);

var price_feed = require('./server/price/feed');
