// Route to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { loginUser } = require('../controller/auth.controller');

// /api/login
router.post('/', 
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must have 6 character min').isLength({ min: 6 })
    ],
    loginUser
)

module.exports = router;