const ShoppingCart = require("../models/shopping-cart");
const asyncHandler = require("./asyncHandlers");

const addUserToBody = (req,res,next) => {
    req.body.user = req.user;
    next();
}
const modifyParamsForUser = (req,res,next) => {
    req.params.id = req.user._id;
    next();
}
const modifyParamsForCart = shouldBeId => asyncHandler(async(req,res,next) => {
    const cart = await ShoppingCart.findOne({user:req.user._id});
    if(shouldBeId){
        req.params.id = cart._id;
        return next();
    }
    req.params.cartId = cart._id;
    next();
});
module.exports = {
    addUserToBody,
    modifyParamsForUser,
    modifyParamsForCart
}