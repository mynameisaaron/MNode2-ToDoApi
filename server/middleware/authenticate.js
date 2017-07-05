var {User} = require('./../models/User');

var authenticate = (req,res,next)=>{

    var authToken = req.header('x-auth');

   User.findByToken(authToken)
   .then(user =>{

        
       req.user = user;
       req.token = authToken;
       next();
   })
   .catch(e=>res.status(401).send());

}

module.exports = {authenticate};