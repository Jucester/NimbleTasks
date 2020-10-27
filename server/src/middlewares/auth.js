const jwt = require('jsonwebtoken');


module.exports = function( req, res, next) {
    // Read token in header
    const token = req.header('x-auth-token');
    console.log(token)

    // Validate if there's token
    if(!token) {
        return res.status(401).json({
            msg: 'Permission not valid'
        })
    }

    try {
        const cipher = jwt.verify(token, process.env.SECRET);
        req.user = cipher.user;
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "Token not valid"
        })
    }
 
}