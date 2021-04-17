const User = require('../models/User')
const jwt = require('jsonWebToken');
const auth = (req, res, next) =>{
    console.log(req.headers);
      const token= req.headers['x-access-token'];
        //   const header_split= req.headers['authorization'].split(' ')[1];
      console.log("middleware");
      console.log(token);
      if (token){
          jwt.verify(JSON.parse(token), process.env.JWT_SECRET, function(err, decoded){
            //   if(decoded)
            if(err){
                console.log(err);
               return res.status(403).json({message : "UnAuthorised access"});
            }
            else{
              console.log(decoded);
              req.user = decoded.user ;
            }
          });
        //   console.log(decodedToken);
      
          
      }
      else{
        //   next();
        return res.status(403).json({message : "UnAuthorised access"});
      }

      next();
}

// module.exports = {auth}
// const expressJWT = require('express-jwt')
// // import expressJwt from 'express-jwt'

// const auth = expressJWT({
//     //secret, expiry date
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],

// });

module.exports = {auth}