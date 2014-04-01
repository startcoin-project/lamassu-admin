#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

var get = require('./server/rpc/get.js');
var set = require('./server/rpc/set.js');

var argv = require('yargs')
  .argv

var app = express();

var server;

app.use(require('./server/secure-headers.js')({ https: !argv.http }));

// start server
if (argv.http) {
  server = http.Server(app);
}
else {
  var options = {
    key: fs.readFileSync(argv.key),
    cert: fs.readFileSync(argv.cert),
    secureProtocol: 'TLSv1_method',
    ciphers: 'AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    honorCipherOrder: true
  }

  server = https.createServer(options, app);
}

get(app);
set(app);

server.listen(process.env.PORT || 8081)
