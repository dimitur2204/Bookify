const {Schema,Types,model} = require('mongoose');

const shoppingCartSchema = new Schema({
    user:{
        type:Types.ObjectId,
        required:true,
        ref:'user'
    },
    books:[{
        type:Types.ObjectId,
        ref:'book'
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
module.exports = model('shoppingCart',shoppingCartSchema);