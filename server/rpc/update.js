exports.actions = function(req, res, ss) {

  req.use('session');

  return {

    price: function(data) {

      console.log('update price data')
      console.log(data)

    }, 
    
    wallet: function(data){

      console.log('update wallet data')
      console.log(data)

    }

  }

}