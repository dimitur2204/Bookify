const ErrorResponse = require('../../../../utils/error-response');
const asyncHandler = require('../../../middleware/asyncHandlers');
const User = require('../../../models/user');

const sendTokenResponse = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken();

    // Cookie expiration - in days
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true
    };

    if (proces.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            success:true,
            token
        })
}

const register = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email, password, role} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role
    });

    sendTokenResponse(user,200,res);
})

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    if (!(email && password)) {
        next(new ErrorResponse('Please provide an email and password',400))
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorResponse('Invalid credentials',401))
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials',401))
    }
    
    sendTokenResponse(user,200,res);
})

const getLoggedUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        doc:user
    })
})

module.exports = {
    login,
    register,
    getLoggedUser
}