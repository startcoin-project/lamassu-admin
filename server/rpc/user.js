var user = {
  id: '1',
  price: {
    source: 'bitstamp',
    custom_url: null,
    commission: 3.00
  },
  wallet: {
    provider: 'blockchain.info', 
    guid: 'GUIsssD', 
    password: null,
    from_address: '324fnndflkdsnlgfk'
  }
}


exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    fetch: function() {

      //get user req.session.userId, should be auth'd

      res(null, user)

      //return the user

    }

  }

}