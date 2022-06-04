const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            //remove the token from the string that contains bearer
            token = req.headers.authorization.split(' ')[1]

            // Veryfy token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            //select will not include the password
            //req.user is the user that is authenticated
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401) // unauthorized status code
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect,
}
