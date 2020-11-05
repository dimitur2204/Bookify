const asyncHandler = require('../../../middleware/asyncHandlers');
const User = require('../../../models/user');

const postLogin = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.find({email,password})
})

module.exports = {
    postLogin
}