const {Schema,Types,model} = require('mongoose');

const shoppingCartSchema = new Schema({
    holder:{
        type:Types.ObjectId,
        required:true,
        ref:'user'
    },
    books:[{
        type:Types.ObjectId,
        ref:'book'
    }],
});
shoppingCartSchema.statics.price = function () {
    return this.populate('books').execPopulate().then(doc=>{
        return doc.books.reduce((acc,curr) => {
            acc+=curr.price;
            return acc;
        },0)
    })
}

module.exports = model('shoppingCart',shoppingCartSchema);