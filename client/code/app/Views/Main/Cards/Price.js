

module.exports = Backbone.View.extend({

  className: 'main_price main_wrap',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-price'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.fill_view()

    self.$el.find('input').on('keyup', self.update_settings.bind(self))
    self.$el.find('select').on('change', self.update_settings.bind(self))

  },

  update_settings: function(){

    var self = this
    
    //define settings object
    var price_settings = {
      provider: self.$el.find('#price_provider').val(), 
      custom_url: self.$el.find('#price_custom_url').val(),
      commission: self.$el.find('#price_commission').val()
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
    self.$el.find('#price_custom_url').val(price.custom_url || 'no url set')
    self.$el.find('#price_commission').val(price.commission)

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