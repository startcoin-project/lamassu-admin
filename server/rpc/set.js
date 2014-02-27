exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function(data) {

      console.log('set new price data')
      console.log(data)

    }, 
    
    wallet: function(data){

      console.log('set new wallet data')
      console.log(data)

    }, 

    exchange: function(data){

      console.log('set new exchange data')
      console.log(data)

    }

  }

}