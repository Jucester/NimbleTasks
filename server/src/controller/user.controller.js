const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const controller = {};

// Import models:
const User = require('../models/User');

controller.getUser = (req, res, next) => {
    res.status(200).json({
        message: 'User Get'
    })
}

controller.createUser = async (req, res, next) => {
    // check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extract email and password
    const { email, password } = req.body;
    
    try {
        // Check if the user if unique
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                msg: 'The user already exists'
            })
        }

        // Create the new user
        user = new User(req.body);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user in MongoDB
        await user.save();

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
                token: token
            })

        });

    } catch ( err) {
        console.error(err);
        res.status(400).send('Something went wrong. Try again.');
    }
}

module.exports = controller;