module.exports = Backbone.View.extend({

  className: 'card wallet',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-card_wallet'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

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