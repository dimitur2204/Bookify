const jwt = require('jsonwebtoken');
const ErrorResponse = require('../../utils/error-response');
const User = require('../models/user');
const asyncHandler = require('./asyncHandlers');

const protect = asyncHandler(async (req,res,next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    //else if(req.cookies.token){
    //     token = req.cookie.token
    // }
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route',401));
    }

    try {
        //verify token
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodedToken);
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route',401));
    }
});

const requireCreator = (model) => (req,res,next) => {
    const user = req.user;
    if (model.user === user._id) {
        return next();
    }
    return next(new ErrorResponse('Not authorized to access this route',403))
} 

const permitRoles = (...roles) => {
    return (req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`,403));
        }
        next();
    }
}

module.exports = {
    protect,
    permitRoles,
    requireCreator
}