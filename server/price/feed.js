

var ss = require('socketstream')
var request = require('request')
var _ = require('lodash')
var _config = require('../config');
var _currency = 'USD';

_config.load(function(err, config) {
  if (err) return;
  _currency = config.exchanges.settings.currency;
});

_config.on('configUpdate', function () {
  _config.load(function(err, config) {
    if (err) return;
    _currency = config.exchanges.settings.currency;
  });  
});

setInterval(function(){


  //get bitstamp
  request.get("https://www.bitstamp.net/api/transactions?timedelta=5", function(error, response, body){

    if (error || response.statusCode != 200) { return }

    var trades = null

    try{

      trades = JSON.parse(body)

    }
    catch (e) {

      console.log("Error parsing BitStamp response: " + e)

      return

    }

    var latest_price = _currency === 'USD' ?
      Math.round(trades[0].price * 100) :
      null;

    ss.api.publish.all('latest_price:bitstamp', {rate: latest_price, currency: _currency})

  })

  //get bitpay
  request.get("https://bitpay.com/api/rates", function(error, response, body){

    if (error || response.statusCode != 200) { return }

    var rates = null

    try{

      rates = JSON.parse(body)

    }
    catch (e) {

      console.log("Error parsing BitPay response: " + e)

      return

    }

    var rate = (_.filter(rates, {code: _currency}))[0].rate
    var latest_price = Math.round(rate * 100)

    ss.api.publish.all('latest_price:bitpay', {rate: latest_price, currency: _currency});
  })


}, 2500)