const ShoppingCart = require('../../models/shopping-cart');

const getAllProducts = (req, res, next) => {
    ShoppingCart.findById(req.params.id).then(doc => {
        doc.populate('books').execPopulate().then(doc =>{
            return doc.books;
        })
    }).catch(next);
}

module.exports = {
    getAllProducts
}