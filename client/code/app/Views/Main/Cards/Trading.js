module.exports = Backbone.View.extend({

  className: 'card trading',

  initialize: function(){

    var view = this

    view.$el.html(ss.tmpl['main-card_trading'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

  },

  clear: function(){

    var view = this

    view.$el.removeClass('animated fadeInUp')
    view.$el.addClass('animatedQuick fadeOutUp')

    setTimeout(function(){

      view.$el.remove()

    }, 500)

  }

})