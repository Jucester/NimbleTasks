const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const controller = {};


// Import models:
const User = require('../models/User');

controller.loginUser = async (req, res, next) => {
    // check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Destructuring the req body data
    const { email, password } = req.body;

    try {
        // check if the user is registered
        let user = await User.findOne({ email })
        if(!user) {
            console.log("User doesn't exists")
            return res.status(400).json({
                msg: 'User doesn\'t exists'
            })
        }

        // check the password
        const passChecked = await bcrypt.compare(password, user.password);

        if (!passChecked) {
            console.log("Password incorrect")
            return res.status(400).json({
                msg: 'Password incorrect.'
            })
        }
        // Create and signature the JWT
         const payload = {
            user: {
                id: user.id
            }
        };

        // Sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            // Confirmation json
            res.status(200).json({
                msg: 'Login successful',
                token: token
            })

        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
// Get the authenticated user
controller.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        //The select function to specify what fields pass or ignore (with "-" before) to user

        res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}


module.exports = controller;