
var fetch_user = function(){
  return {
    id: '1'
  }
}

var price_settings = function(){

  return {
    source: 'bitstamp',
    custom_url: null,
    commission: 3.50
  }

}

var wallet_settings = function(){

  return {
    provider: 'blockchain.info', 
    guid: 'GGGGG', 
    password: 'PPPPP',
    from_address: 'FFFFF'
  }

}

var exchange_settings = function(){
  return {}
}



exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function() {

      //return price settings to the client
      res(null, price_settings())

    }, 
    
    wallet: function(){

      //return wallet settings to the client
      res(null, wallet_settings())

    }, 
    
    exchange: function(){

      //return exchange settings to the client
      res(null, exchange_settings())

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