

module.exports = Backbone.View.extend({

  className: 'main_price main_wrap',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-price'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.fill_view()

    self.update_prices()

    self.$el.find('input').on('keyup', self.update_settings.bind(self))
    self.$el.find('select').on('change', self.update_settings.bind(self))

    self.user.price_data.on('change', self.update_prices.bind(self))
    self.$el.find('input').on('keyup', self.update_prices.bind(self))
    self.$el.find('select').on('change', self.update_prices.bind(self))

  },

  update_prices: function(){



    //pull in current price from selected soruce

    var self = this

    var selected_soruce = self.$el.find('#price_provider').val()
    var price = self.user.price_data.get(selected_soruce)
    var current = Math.round(price) / 100 

    var commission = (0.01 * self.$el.find('#price_commission').val()) + 1
    var display = Math.round(price * commission) / 100 
    
    if(isNaN(current)){
      self.$el.find('.current_price .value').html('---.--')
    }else{
      self.$el.find('.current_price .value').html(current.toFixed(2))
    }

    if(isNaN(display)){
      self.$el.find('.price_overview .value').html('---.--')
    }else{
      self.$el.find('.price_overview .value').html(display.toFixed(2))
    }

  },
  update_settings: function(){

    var self = this
    
    //define settings object
    var price_settings = {
      provider: self.$el.find('#price_provider').val(), 
      custom_url: self.$el.find('#price_custom_url').val(),
      commission: (0.01 * self.$el.find('#price_commission').val()) + 1
    }

    self.user.set('price',  price_settings)

  },

  fill_view: function(){ //fill feilds with current settings

    var self = this

    var price_settings = {
      provider: 'bitstamp', 
      custom_url: '',
      commission: 3
    }

    var price = self.user.get('price') || price_settings

    self.$el.find('#price_provider').val(price.provider)
    self.$el.find('#price_custom_url').val(price.custom_url)

    var per = ((price.commission - 1) * 100).toFixed(2)

    self.$el.find('#price_commission').val(per)

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