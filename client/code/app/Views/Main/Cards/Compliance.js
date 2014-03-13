

module.exports = Backbone.View.extend({

  className: 'main_compliance main_wrap',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-compliance'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.fill_view()

    self.$el.find('input').on('keyup', self.update_settings.bind(self))
    self.$el.find('select').on('change', self.update_settings.bind(self))

  },

  update_settings: function(){

    var self = this

    //define settings object
    var compliance_settings = {
      base: {
        limit: self.$el.find('#base_limit').val(),
        verify_type: self.$el.find('#base_verify_type').val()
      },
      extended: {
        limit: self.$el.find('#extended_limit').val(), 
        verify_type: self.$el.find('#extended_verify_type').val()
      },
      maximum: {
        limit: self.$el.find('#max_limit').val()
      },
      currency: 'USD',
      verification: {
        service: self.$el.find('#verification_service').val(),
        username: self.$el.find('#verification_service_username').val(),
        password: self.$el.find('#verification_service_password').val()

      }
    }

      self.user.set('compliance',  compliance_settings)

  },

  fill_view: function(){ //fill feilds with current settings

    var self = this

    self.$el.find('#base_limit').val(self.user.get('compliance').base.limit)
    self.$el.find('#base_verify_type').val(self.user.get('compliance').base.verify_type)

    self.$el.find('#extended_limit').val(self.user.get('compliance').extended.limit)
    self.$el.find('#extended_verify_type').val(self.user.get('compliance').extended.verify_type)

    self.$el.find('#max_limit').val(self.user.get('compliance').maximum.limit)

    self.$el.find('#verification_service').val(self.user.get('compliance').verification.service)
    self.$el.find('#verification_service_username').val(self.user.get('compliance').verification.username)
    self.$el.find('#verification_service_password').val('********')

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