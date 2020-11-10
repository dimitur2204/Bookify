const addUserToBody = (req,res,next) => {
    req.body.user = req.user;
    next();
}
const modifyParamsForUser = (req,res,next) => {
    req.params.id = req.user.id;
    next();
}
module.exports = {
    addUserToBody,
    modifyParamsForUser
}