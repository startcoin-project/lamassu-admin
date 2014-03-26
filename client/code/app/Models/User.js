var PriceData = Backbone.Model.extend({ //this model keeps a current record of price data from various sources

  initialize: function() {

    var self = this

    self.sources = ['bitstamp', 'bitpay']

    self.sources.forEach(function(source){
      var price_update = 'latest_price:' + source
      ss.event.on(price_update, function(price){
        self.set(source, price)
      })
    })
  },
  current_price: function(){}

})



module.exports = Backbone.Model.extend({

  initialize: function() {

    var self = this

    self.price_data = new PriceData()

    ss.rpc('get.user', this.authenticate.bind(this))

    self.on('change:price', function(){
      ss.rpc('set.price', self.get('price'), function(err, res){})
    })

    self.on('change:wallet', function(){
      ss.rpc('set.wallet', self.get('wallet'), function(err, res){})
    })

    self.on('change:exchange', function(){
      ss.rpc('set.exchange', self.get('exchange'), function(err, res){})
    })

    self.on('change:compliance', function(){
      ss.rpc('set.compliance', self.get('compliance'), function(err, res){})
    })

  },


  login: function(username, password){

    var self = this

    //login and return user
    ss.rpc('user.authenticate', username, password, function(err, authd, user){

      //make auth return user in the future

      if(authd){
        ss.rpc('get.user', self.authenticate.bind(self))
      }

    })


  },

  authenticate: function(err, user){

    var self = this

    if (err)
      //should  be handled differently in the future
      alert('Error returned from user.get: \n\n' + JSON.stringify(err, null, '  '))

    if (user != null) {

      self.set(user, {silent: true})
      self.set({authenticated: true})

    } else {
      
      self.set({authenticated: false})

    }
  },

  create_pairing_token: function(callback){
    ss.rpc('pair.create_pairing_token', callback)
  },

  get_server_address: function(callback){
    ss.rpc('pair.get_server_address', callback)
  }
})


