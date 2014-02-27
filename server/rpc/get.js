exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function() {

      var price_settings = {
        source: 'bitstamp',
        custom_url: null,
        commission: 3.00
      }

      res(null, price_settings)

    }, 
    
    wallet: function(){

      var wallet_settings = {
        provider: 'blockchain.info', 
        guid: 'GGGGG', 
        password: 'PPPPP',
        from_address: 'FFFFF'
      }

      res(null, wallet_settings)

    }, 
    
    exchange: function(){

      var exchange_settings = {

      }

      res(null, exchange_settings)

    }

  }

}