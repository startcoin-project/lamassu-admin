module.exports = Backbone.View.extend({

  className: 'login',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['login-base'].render()).appendTo('.dash')

    self.$el.children().children().addClass('animated flipInX')

    self.$el.find('.submit').on('click', self.login.bind(this))

    self.$el.find('input').each(function(index, element){

      var $e = $(element)
      var value = $e.val()

      $e.focus(function(){

        if ($e.val() === value ){

          if (value === 'your password' ){ $e.prop('type', 'password') }

          $e.val('')

        }


      })

      $e.blur(function(){

        if ($e.val() === '' ){

          if (value === 'your password' ){ $e.removeProp('type', 'password') }

          $e.val(value)

        }

      })


    })


  },

  login: function(){

    var self = this

    self.user.authenticate(null, true)

    //sent data 

  },

  clear: function(){

    var self = this

    self.$el.children().children().removeClass('animated flipInX')
    self.$el.children().children().addClass('animatedQuick fadeOutUp')

    setTimeout(function(){

      self.$el.remove()

    }, 1000)

  }

})