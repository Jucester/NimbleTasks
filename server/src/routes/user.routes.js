const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getUser, createUser } = require('../controller/user.controller');

// /api/users
router.get('/', getUser); 
router.post('/', 
    [
        check('name', 'Name is obligatory').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must have 6 character min').isLength({ min: 6 })
    ],
    createUser
)

module.exports = router;