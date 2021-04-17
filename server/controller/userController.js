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

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: " An user with this email already exists " });

        //hash password using bcypt

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(bcrypt.hash);
        const newUser = new User({
            name, email,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        //login the user once he registers

        //sign the token

        const token = jwt.sign(
            {
                user: savedUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },);

        console.log(token);


        // //send the token as cookie
        // res.cookie("token", token, { httpOnly: true, }).send()
       res.json({token,
            user : {
             id : savedUser._id,
             email : savedUser._email
        }
    });

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
        const isPwdCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPwdCorrect)
            return res.status(401).json({ message: " Wrong email or password" });

        //sign token

        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },);

        //send the token as cookie
        // res.cookie("token", token, { httpOnly: true, }).send()
        res.json({token,
            user : {
             id : existingUser._id,
             email : existingUser._email
        }
    });

    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

//logout user for cookies case
// const logout = (req, res) => {
//     res.cookie("token", "", { httpOnly: true, expires: new Date(0), }).send();
// }
module.exports = {
    addUser,
    loginUser,
}