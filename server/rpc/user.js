var config = require('../config.js')

exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    authenticate: function(username, password){      
      config.authenticateUser(username, password, function(err, user){
        if (err){
          return res(err)
        }

        if (user){

          req.session.userId = user.id //session is authenticated when it has a userId
          req.session.save()

          res(null, true)

        }else{

          res(null, false)

        }
      })
    }
  }
}
