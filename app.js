var http = require('http')
var ss = require('socketstream')

//define assets for admin app
ss.client.define('main', {
  view: 'app.jade',
  css:  ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
})

// serve main client on the root url
ss.http.route('/', function(req, res){ 
  res.serveClient('main')
});

// code formatters
ss.client.formatters.add(require('ss-jade'))
ss.client.formatters.add(require('ss-stylus'))

ss.client.templateEngine.use(require('ss-hogan'))

// minimize and pack assets if you type: SS_ENV=production node app.js
// if (ss.env === 'production') ss.client.packAssets();

// start server
var server = http.Server(ss.http.middleware)

server.listen(process.env.PORT || 8080)


// start socketstream
ss.start(server)

var price_feed = require('./server/price/feed')
