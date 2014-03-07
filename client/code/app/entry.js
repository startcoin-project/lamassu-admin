var Models = require('./Models')
var Views = require('./Views')

window.ss = require('socketstream')

ss.server.on('disconnect', function(){
  console.log('Connection down :-(')
})

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)')
})

ss.server.on('ready', function(){

  Backbone.View.prototype.user = new Models.User() // make user available to every view

  $(function(){ // wait for the dom

    window.app = new Views.App() // create main app view

  })

})
