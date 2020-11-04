const User = require('../../models/user');

const postLogin = (req, res, next) => {
    const {email, password} = req.body;
    User.find({email,password}).then(doc => {
        //TODO: Finish logging func
    }).catch(next);
}

module.exports = {
    getAllProducts
}