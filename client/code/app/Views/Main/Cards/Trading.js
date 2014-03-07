







module.exports = Backbone.View.extend({

  className: 'main_trading',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-trading'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

  
    self.user.on('change:exchange', self.fill_preview.bind(self))

    self.fill_preview()


    self.$el.find('.save').on('click', function(){
      var new_exchange = {
        provider: self.$el.find('.mid ul li').eq(0).find('input').val(),
        clientId: self.$el.find('.mid ul li').eq(1).find('input').val(),
        key: self.$el.find('.mid ul li').eq(2).find('input').val(),
        secret: self.$el.find('.mid ul li').eq(3).find('input').val()
      }

      self.user.set('exchange', new_exchange)


    })




  },

  fill_preview: function(){

    var self = this

    var exchange = self.user.get('exchange')

    self.$el.find('.preview ul li').eq(0).find('.value').html(exchange.provider)
    self.$el.find('.preview ul li').eq(1).find('.value').html(exchange.clientId)
    self.$el.find('.preview ul li').eq(2).find('.value').html(exchange.key)
    self.$el.find('.preview ul li').eq(3).find('.value').html(exchange.secret)

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