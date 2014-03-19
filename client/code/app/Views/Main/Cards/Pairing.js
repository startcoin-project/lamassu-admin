module.exports = Backbone.View.extend({

  className: 'main_price main_wrap',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-pairing'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.create_pairing_token(function(err, token){
      self.display_qr({}, token)
    });
  },

  clear: function(){

    var self = this

    self.$el.removeClass('animated fadeInUp')
    self.$el.addClass('animatedQuick fadeOutUp')

    setTimeout(function(){

      self.$el.remove()

    }, 500)

  },

  create_pairing_token: function(callback){
    this.user.create_pairing_token(callback)
  },

  display_qr: function(server, token) {
    new QRCode(document.getElementById('qrcode'), JSON.stringify({
      trader: server,
      token: token
    }))
  }

})
