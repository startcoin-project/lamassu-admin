module.exports = Backbone.View.extend({

  className: 'card languages',

  initialize: function(){

    var view = this

    view.$el.html(ss.tmpl['main-card_languages'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

  },

  clear: function(){

    var view = this

    view.$el.removeClass('animated flipInUp')
    view.$el.addClass('animatedQuick fadeOutUp')

    setTimeout(function(){

      view.$el.remove()

    }, 500)

  }

})