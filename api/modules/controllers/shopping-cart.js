const Book = require('../../models/book');
const ShoppingCart = require('../../models/shopping-cart');

const createCart = (req, res, next) => {
    ShoppingCart.create({
        holder:'5fa2bc6c59dcbd23603b9711'
    }).then(doc => {
        res.status(201).json(doc);
    }).catch(next)
}

const getAllBooks = (req, res, next) => {
    ShoppingCart.findById(req.params.id).then(doc => {
        doc.populate('books').execPopulate().then(doc =>{
            res.status(200).json(doc.books);
        })
    }).catch(next);
}

const addBook = (req, res, next) => {
    Book.findById(req.params.bookId).then(book => {
        ShoppingCart.findByIdAndUpdate(req.params.cartId,{
            $addToSet: {books: book}
        },{new:true}).then(doc => {
            res.status(200).json(doc);
        }).catch(next)
    })
}

const deleteBook = (req, res, next) => {
    Book.findById(req.params.bookId).then(book => {
        ShoppingCart.findByIdAndUpdate(req.params.cartId,{
            $pull: {books: book._id}
        },{new:true}).then(doc => {
            res.status(200).json(doc);
        }).catch(next)
    })
}

const checkout = (req, res, next) => {
    ShoppingCart.findByIdAndUpdate(req.params.id,{
        $set:{books:[]}
    },{new:true}).then(doc => {
        res.status(200).json(doc);
    }).catch(next)
}

module.exports = {
    createCart,
    getAllBooks,
    deleteBook,
    addBook,
    checkout
}