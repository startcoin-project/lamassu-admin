module.exports = Backbone.View.extend({

  className: 'main_wallet',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-wallet'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.user.on('change:wallet', self.fill_preview.bind(self))

    self.fill_preview()



    self.$el.find('.save').on('click', function(){
      var new_wallet = {
        provider: self.$el.find('.mid ul li').eq(0).find('input').val(),
        guid: self.$el.find('.mid ul li').eq(1).find('input').val(),
        password: self.$el.find('.mid ul li').eq(2).find('input').val(),
        from_address: self.$el.find('.mid ul li').eq(3).find('input').val()
      }

      self.user.set('wallet', new_wallet)


    })


  },

  fill_preview: function(){

    var self = this

    var wallet = self.user.get('wallet')

    self.$el.find('.preview ul li').eq(0).find('.value').html(wallet.provider)
    self.$el.find('.preview ul li').eq(1).find('.value').html(wallet.guid)
    self.$el.find('.preview ul li').eq(2).find('.value').html(wallet.password)
    self.$el.find('.preview ul li').eq(3).find('.value').html(wallet.from_address)


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