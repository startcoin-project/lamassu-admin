var config = require('../config.js')

exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    authenticate: function(username, password){      
      config.authenticateUser(username, password, function(err, authenticated){
        if (err){
          return res(err)
        }

        if (authenticated){

          req.session.userId = 1 //session is authenticated when it has a userId
          req.session.save()

          res(null, true)

        }else{

          res(null, false)

        }
      })
    }
  }
}
