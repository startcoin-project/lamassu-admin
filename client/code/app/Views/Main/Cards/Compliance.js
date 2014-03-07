

module.exports = Backbone.View.extend({

  className: 'main_compliance',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-compliance'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.$base_limit = self.$el.find('.base .limit input')
    self.$base_verify = self.$el.find('.base .verify_type select')

    self.$extended_limit = self.$el.find('.extended .limit input')
    self.$extended_verify = self.$el.find('.extended .verify_type select')

    self.$maximum_limit = self.$el.find('.maximum .limit input')

    self.$verify_service = self.$el.find('.verify_service .service select')
    self.$verify_username = self.$el.find('.verify_service .username input')
    self.$verify_password = self.$el.find('.verify_service .password input')

    self.fill_view()


    self.$el.find('.save').on('click', function(){

      var compliance_settings = {
        base: {
          limit: self.$base_limit.val(),
          verify_type: self.$base_verify.val()
        },
        extended: {
          limit: self.$extended_limit.val(), 
          verify_type: self.$extended_verify.val()
        },
        maximum: {
          limit: self.$maximum_limit.val()
        },
        currency: 'USD',
        verification: {
          service: self.$verify_service.val(),
          username: self.$verify_username.val(),
          password: self.$verify_password.val()

        }
      }

      console.log(compliance_settings)

      self.user.set('compliance',  compliance_settings)

    })

  },

  fill_view: function(){

    var self = this

    self.$base_limit.val(self.user.get('compliance').base.limit)
    self.$base_verify.val(self.user.get('compliance').base.verify_type)

    self.$extended_limit.val(self.user.get('compliance').extended.limit)
    self.$extended_verify.val(self.user.get('compliance').extended.verify_type)

    self.$maximum_limit.val(self.user.get('compliance').maximum.limit)

    self.$verify_service.val(self.user.get('compliance').verification.service)
    self.$verify_username.val(self.user.get('compliance').verification.username)
    self.$verify_password.val('********')

    //fill the current fields with compliance data
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