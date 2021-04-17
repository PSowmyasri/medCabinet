const User = require('../models/User')
const getUser = async(req, res) =>{
    // console.log("hey")
    // console.log(req);
    const id = req.user ;
    try{
        const existingUser = await User.findOne({ _id : id });
        console.log(existingUser);
        res.json(existingUser);
    }
    catch{
res.status(400).json({message : "wrong details"});
    }
}

module.exports ={getUser};