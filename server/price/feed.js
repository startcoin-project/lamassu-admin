

var ss = require('socketstream')
var request = require('request')
var _ = require('lodash')

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

    var latest_price = Math.round(trades[0].price * 100)

    ss.api.publish.all('latest_price:bitstamp', latest_price)

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

    var usd = (_.filter(rates, {code: 'USD'}))[0]

    var latest_price = Math.round(usd.rate * 100)

    ss.api.publish.all('latest_price:bitpay', latest_price)

  })


}, 2500)