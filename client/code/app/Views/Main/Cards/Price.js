var Sources = Backbone.View.extend({

  initialize: function(){

    var self = this

    // pull possible sources from the user model
    self.sources = self.user.price_data.sources

    // fill in the options
    self.setup_options()

    // get current source from user model
    self.selected_source = self.user.get('price').provider

    // if we get any price updates, update the preview
    self.user.price_data.on('change', self.update_preview.bind(self))

    // fill in the preview
    self.update_preview()

    //show the data onces it's filled in
    setTimeout(function(){

      self.$el.find('.preview .value').show().addClass('animated flipInX')
      self.$el.find('.preview .subtext').show().addClass('animated flipInX')

    }, 700)


    var selection = self.sources.indexOf(self.selected_source)

    if(selection === -1){

      self.$el.find('.mid ul li').last().addClass('selected')

    }else{

      self.$el.find('.mid ul li').eq(selection).addClass('selected')

    }
    

  },

  capture_custom: function(){

    var self = this

    var url = self.$el.find('.custom_input input').val()

    //vaidate url





  },

  update_preview: function(){

    var self = this

    self.current_price = (self.user.price_data.get(self.selected_source)/100).toFixed(2)

    if(isNaN(self.current_price)){
      self.$el.find('.preview .value .number').html('---.--')
      self.$el.find('.preview .subtext').html(self.selected_source)
    }else{
      self.$el.find('.preview .value .number').html(self.current_price)
      self.$el.find('.preview .subtext').html(self.selected_source)
    }

  },

  setup_options: function(){

    var self = this

    // append sources to the list
    self.sources.forEach(function(source, index){
      var source_item = ss.tmpl['main-price_sources_item'].render({source: source})
      self.$el.find('.mid ul li').eq(index).before(source_item)
    })

    // set height for list items
    var item_height = (100 / (self.sources.length + 1))
    self.$el.find('.mid ul li').css({height: item_height + '%'})

    // on click of an item
    self.$el.find('.mid ul li').on('click', function(){

      var index = $(this).index()

      // highlight the item
      self.$el.find('ul li').removeClass('selected')
      self.$el.find('ul li').eq(index).addClass('selected')

      self.$el.removeClass('custom_selected')

      if($(this).is(':last-child')){ //this is a custom source

        self.selected_source = 'custom'
        self.update_preview()

        self.$el.addClass('custom_selected')
        self.$el.find('.custom_input input').focus()
        self.$el.find('ul').animate({scrollTop: self.$el.find('ul')[0].scrollHeight}, 250)


      }else{ //this is a non-custom source

        
        self.selected_source = self.sources[index]
        self.update_preview()

      }

    })

  }

  //respond to clicks to store current selection

  //respond to custom input 

  //give data to main view on submit




})


var Commission = Backbone.View.extend({

  initialize: function(options){

    var self = this

    self.parent = options.parent

    var percentages = [1, 2, 3, 4, 5]

    self.selected_commission = self.user.get('price').commission

    //append percentage items to the list
    percentages.forEach(function(percentage, index){
      var percentage_item = ss.tmpl['main-price_commissions_item'].render({percentage: percentage.toFixed(2)})
      self.$el.find('.mid ul li').eq(index).before(percentage_item)
    })

    //set the height of the list item based on how many there are
    var item_height = (100 / (percentages.length + 1))
    self.$el.find('.mid ul li').css({height: item_height + '%'})

    //on click do things
    self.$el.find('ul li').on('click', function(){

      var index = $(this).index()

      self.$el.find('ul li').removeClass('selected')
      self.$el.find('ul li').eq(index).addClass('selected')

      self.$el.removeClass('custom_selected')

      //if custom
      if($(this).is(':last-child')){ //if custom

        self.$el.addClass('custom_selected')
        self.$el.find('.custom_input input').focus()
        self.$el.find('ul').animate({scrollTop: self.$el.find('ul')[0].scrollHeight}, 250)



        //update the preview and current_commission 
        self.$el.find('.preview .value .number').html(self.$el.find('.custom_input input').val())


      } else { //if an option

        self.selected_commission = percentages[index]
        self.$el.find('.preview .value .number').html(percentages[index].toFixed(2))

      }

    })

    //self.user.on('change:commission', self.update_preview)

    self.$el.find('.preview .value .number').html(self.selected_commission.toFixed(2))

    //show data 

    setTimeout(function(){

      self.$el.find('.preview .value').show().addClass('animated flipInX')
      self.$el.find('.preview .subtext').show().addClass('animated flipInX')

    }, 700)

    //percentage

    var selection = percentages.indexOf(self.selected_commission)

    if(selection === -1){

      self.$el.find('.mid ul li').last().addClass('selected')
      self.$el.addClass('custom_selected')
      self.$el.find('.custom_input input').val(self.selected_commission.toFixed(2))
      self.$el.find('ul').animate({scrollTop: self.$el.find('ul')[0].scrollHeight}, 250)



    }else{

      self.$el.find('.mid ul li').eq(selection).addClass('selected')

    }


    self.setup_custom()

  },

  setup_custom: function(){

    var self = this

    self.$el.find('.custom_input input').on('keyup', function(){

      self.selected_commission = parseFloat($(this).val())

      console.log(self.selected_commission)

      self.$el.find('.preview .value .number').html(self.selected_commission.toFixed(2))

      self.parent.set_total()

    })





  }



})


var Overview = Backbone.View.extend({






})






module.exports = Backbone.View.extend({

  className: 'main_price',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-price'].render()).appendTo('.dash .main').addClass('animated fadeInUp')

    self.selected_commission = self.user.get('commission')

    self.sources = new Sources({el: self.$el.find('.source'), parent: self})
    self.commission = new Commission({el: self.$el.find('.commission'), parent: self})




    self.user.price_data.on('change', self.set_total.bind(self))

    //self.user.on('')

    self.set_total()

    setTimeout(function(){

      self.$el.find('.total .value').show().addClass('animated flipInX')
      self.$el.find('.total .subtext').show().addClass('animated flipInX')

    }, 700)

    self.$el.find('li').on('click', self.set_total.bind(self))


    self.$el.find('.save').on('click', self.update_user.bind(self))



  },

  set_total: function(){

    var self = this

    var current_source = self.sources.selected_source
    var current_commission = self.commission.selected_commission

    var current_price = self.user.price_data.get(current_source)

    var adjusted_price = Math.round(current_price + (current_price * (current_commission/100)))/100

    if(isNaN(adjusted_price)){

      self.$el.find('.total .value .number').html('---.--')

    }else{
      
      self.$el.find('.total .value .number').html(adjusted_price.toFixed(2))

    }

    //self.$el.find('.choice_text').fitText(0.9, { minFontSize: '20px', maxFontSize: '30px'})

  },

  update_user: function(){

    var self = this

    self.user.set({
      price:{
        provider: self.sources.selected_source,
        url: null,
        commission: self.commission.selected_commission
      }
    })

    console.log(self.user)

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

