

var ss = require('socketstream')
var request = require('request')

setInterval(function(){

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

    //faux broadcast of other sources
    ss.api.publish.all('latest_price:bitpay', Math.round(latest_price * 0.97) )

  })


}, 3000)