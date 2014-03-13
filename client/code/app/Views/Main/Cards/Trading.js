module.exports = Backbone.View.extend({

  className: 'main_trading main_wrap',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-trading'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.fill_view()

    self.$el.find('input').on('keyup', self.update_settings.bind(self))
    self.$el.find('select').on('change', self.update_settings.bind(self))

  },

  update_settings: function(){

    var self = this
    
    //define settings object
    var exchange_settings = {
      provider: self.$el.find('#exchange_provider').val(),
      key: self.$el.find('#exchange_api_key').val(),
      clientId: self.$el.find('#exchange_id').val(),
      secret: self.$el.find('#exchange_secret').val()
    }

    self.user.set('exchange',  exchange_settings)

  },

  fill_view: function(){ //fill feilds with current settings

    var self = this

    var exchange_settings = {
      provider: 'bitstamp',
      key: 'none',
      clientId: 'none',
      secret: 'none'
    }

    var exchange = self.user.get('exchange') || exchange_settings

    self.$el.find('#exchange_provider').val(exchange.provider)
    self.$el.find('#exchange_api_key').val(exchange.key)
    self.$el.find('#exchange_id').val(exchange.clientId)
    self.$el.find('#exchange_secret').val(exchange.secret)

  },

  clear: function(){

    var self = this

    self.$el.removeClass('animated fadeInUp')
    self.$el.addClass('animatedQuick fadeOutUp')

    setTimeout(function(){

      self.$el.remove()

    }, 500)

  }

})