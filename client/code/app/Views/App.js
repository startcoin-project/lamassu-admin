var Login = require('./Login')
var Main = require('./Main')

var App = Backbone.View.extend({

  el: 'body',

  initialize: function() {

    var self = this

    self.user.on('change:authenticated', self.authenticated.bind(self))

    //update the display price on relevant changes


  },

  set_display: function(){

    var self = this

    var userPrice = self.user.get('price')
    var price_source = userPrice && userPrice.provider
    if (price_source)
      var price = self.user.price_data.get(price_source)
    var comm_per = userPrice && userPrice.commission
    if (comm_per)
      var comm_multiplier = 1 + (comm_per / 100)
    if (comm_multiplier)
      var display = Math.round(price * comm_multiplier) / 100

    if(isNaN(display)){
      $('.display .price .number').html('---.--')
    }else{
      $('.display .price .number').html(display.toFixed(2))
    }


  },

  authenticated: function(model, authenticated, options) {

    var self = this

    if(self.current != null){
      self.current.clear()
    }

    if (authenticated === true) {
      self.current = new Main()
      self.user.price_data.on('change', self.set_display.bind(self))
      self.user.on('change', self.set_display.bind(self))
    } else {
      self.current = new Login()
    }

  }

});

module.exports = App

