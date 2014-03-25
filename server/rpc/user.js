exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    authenticate: function(username, password){      

      if (username === 'user' && password === 'pass'){

        req.session.userId = 1 //session is authenticated when it has a userId
        req.session.save()

        res(null, true)

      }else{

        res(null, false)

      }
    }
  }
}
