const asyncHandler = require('../../../middleware/asyncHandlers');
const User = require('../../../models/user');

const register = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email, password, role} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role
    });
    res.status(200).json({success:true})
})

const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email,password})
})

module.exports = {
    login,
    register
}