// Route to authenticate users
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { loginUser, getUser  } = require('../controller/auth.controller');


// /api/login
router.post('/', 
    loginUser
);

// get the authenticated user
router.get('/',
    auth,
    getUser
)

module.exports = router;