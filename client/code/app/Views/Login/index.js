module.exports = Backbone.View.extend({

  className: 'login',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['login-base'].render()).appendTo('.dash')

    self.$el.find('input').each(function(index, element){

      var $e = $(element)
      var value = $e.val()

      $e.keyup(function(){
        var username = self.$el.find('#login_username').val()
        var password = self.$el.find('#login_password').val()
        self.user.login(username, password)
      })

      $e.focus(function(){
        if ($e.val() === value ){
          if (value === 'password') 
            $e.prop('type', 'password') 
          $e.val('')
        }
      })

      $e.blur(function(){
        if ($e.val() === ''){
          if (value === 'password') 
            $e.prop('type', 'text')
          $e.val(value)
        }
      })
    })
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