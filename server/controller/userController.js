const User = require('../models/User')
const { mongoose } = require('mongoose');
const { bcrypt } = require('bcrypt')
// const { default: User } = require('../models/User');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    // validation of mandatory fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: " Please fill all the required fields" });
    }

    // check if user exists
    User.findOne({ email })
        .then(user => {
            if (user)
                res.status(400).json({ message: "User already exists" });

            const newUser = new User({
                name,
                email,
                password
            })

            //bcrypt the password 
            // bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, 10 , (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        })
                        .catch(err => {
                            console.log("error while saving the user");
                            res.status(400).json({
                                error: err
                            })
                        })
                })
            // })

        })


}
module.exports = { addUser }