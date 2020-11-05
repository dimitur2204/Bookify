const {Schema,Types,model} = require('mongoose');

const shoppingCartSchema = new Schema({
    holder:{
        type:String,//Types.ObjectId,
        required:true,
        ref:'user'
    },
    books:[{
        type:Types.ObjectId,
        ref:'book'
    }]
});
module.exports = model('shoppingCart',shoppingCartSchema);