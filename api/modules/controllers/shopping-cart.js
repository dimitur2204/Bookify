const asyncHandler = require('../../middleware/asyncHandlers');
const Book = require('../../models/book');
const ShoppingCart = require('../../models/shopping-cart');

const createCart =asyncHandler (async (req, res, next) => {
    const cart = await ShoppingCart.create({
        holder:'5fa2bc6c59dcbd23603b9711'
    });

    res.status(201).json({success:true,doc:cart});
})

const getAllBooks = asyncHandler(async (req, res, next) => {
    const cart = await ShoppingCart.findById(req.params.id)
    const cartWithBooks = await cart.populate('books').execPopulate();
    res.status(200).json({success:true,doc:cartWithBooks.books});
})
const addBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.bookId);
    const cart = await ShoppingCart.findByIdAndUpdate(req.params.cartId,{
            $addToSet: {books: book}
        },{new:true})
    res.status(200).json({success:true,doc:cart});
})

const deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.bookId)
    const cart = await ShoppingCart.findByIdAndUpdate(req.params.cartId,{
            $pull: {books: book._id}
        },{new:true})
    res.status(200).json({success:true,doc:cart});
})

const checkout = asyncHandler(async (req, res, next) => {
    const cart = await ShoppingCart.findByIdAndUpdate(req.params.id,{
        $set:{books:[]}
    },{new:true})
    res.status(200).json({success:true,doc:cart});
})

module.exports = {
    createCart,
    getAllBooks,
    deleteBook,
    addBook,
    checkout
}