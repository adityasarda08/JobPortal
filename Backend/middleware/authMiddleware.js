const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const protect = async (req, res, next) => {

    let token;

    try {

        console.log("Authorization Header:", req.headers.authorization);

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {

            token = req.headers.authorization.split(' ')[1];

            console.log("Token:", token);
        }

        if (!token && req.cookies?.token) {
            token = req.cookies.token;
            console.log("Token from cookie:", token);
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized, no token'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded);

        req.user = await User.findById(decoded.id).select('-password');

        console.log("User Found:", req.user);

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            message: 'Not authorized, token failed'
        });
    }
};


const employerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'employer') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied, employers only' });
    }
};


module.exports = { protect, employerOnly };