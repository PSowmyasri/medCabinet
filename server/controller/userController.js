const User = require('../models/User')
const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// const { default: User } = require('../models/User');

const addUser = async (req, res) => {
    try {
        const { name, email, password, passwordVerify } = req.body;

        // validation of fields
        if (!name || !email || !password || !passwordVerify) {
            return res.status(400).json({ message: " Please fill all the required fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: " please enter a password of atleast 6 characters" });
        }

        if (password !== passwordVerify) {
            return res.status(400).json({ message: " Please enter the same password twice" });
        }

        // check if user exists

        // User.findOne({ email })
        //     .then(user => {
        //         if (user)
        //             res.status(400).json({ message: "User already exists" });

        //         const newUser = new User({
        //             name,
        //             email,
        //             password
        //         })

        //         //bcrypt the password 
        //          bcrypt.genSalt(10, function(err, salt) {
        //             bcrypt.hash(newUser.password, salt , function(err, hash) {
        //                 if (err) throw err;
        //                 newUser.password = hash;
        //                 newUser.save()
        //                     .then(user => {
        //                         res.json({
        //                             user: {
        //                                 id: user.id,
        //                                 name: user.name,
        //                                 email: user.email
        //                             }
        //                         })
        //                     })
        //                     .catch(err => {
        //                         console.log("error while saving the user");
        //                         res.status(400).json({
        //                             error: err
        //                         })
        //                     })
        //             })
        //          })
        //     })
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: " An user with this email already exists " });

        //hash password - need to fix issue with bcrypt for windows

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(bcrypt.hash);
        const newUser = new User({
            name, email,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        // .then(user => {
        //     res.json({
        //         user: {
        //             id: user.id,
        //             name: user.name,
        //             email: user.email
        //         }
        //     })
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(400).json({ message: " error while saving the user" });
        // })

        //login the user once he registers

        //sign the token

        const token = jwt.sign(
            {
                user: savedUser._id
            },
            process.env.JWT_SECRET);

        //send the token as cookie
        res.cookie("token", token, { httpOnly: true, }).send()

    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }

}

//login user

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validate 
        if (!email || !password) {
            return res.status(400).json({ message: " Please fill all the required fields" });
        }
        // check if user exists

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ message: " Wrong email or password" })

        // check if passoword matches
        const isPwdCorrect = bcrypt.compare(password, existingUser.password);
        if (!isPwdCorrect)
            return res.status(401).json({ message: " Wrong email or password" });

        //sign token

        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET);

        //send the token as cookie
        res.cookie("token", token, { httpOnly: true, }).send()


    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

//logout user
const logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0), }).send();
}
module.exports = {
    addUser,
    loginUser,
    logout
}