const ErrorResponse = require('../../../../utils/error-response');
const asyncHandler = require('../../../middleware/asyncHandlers');
const Book = require('../../../models/book');
const ShoppingCart = require('../../../models/shopping-cart');


const addBook = asyncHandler(async (req, res, next) => {
    const bookId = req.params.id;
    const book = await Book.findOne({_id:bookId});
    console.log(book);
    if(!book){
        return next(new ErrorResponse(`Book with id of ${bookId} not found!`,404));
    }
    const cart = await ShoppingCart.findOneAndUpdate({_id:req.params.cartId},{
            $addToSet: {books: book}
        },{new:true})
    res.status(200).json({success:true,doc:cart});
})

const removeBook = asyncHandler(async (req, res, next) => {
    const bookId = req.params.id;
    const book = await Book.findOne({_id:bookId});
     
    if(!book){
        return next(new ErrorResponse(`Book with id of ${bookId} not found!`,404));
    }
    const cart = await ShoppingCart.findOneAndUpdate({_id:req.params.cartId},{
            $pull: {books: book._id}
        },{new:true})
    res.status(200).json({success:true,doc:cart});
})

const checkout = asyncHandler(async (req, res, next) => {
    const cart = await ShoppingCart.findOne({_id:req.params.cartId}).populate('books','fullBookId');
    if (cart.books.length <= 0) {
        return next(new ErrorResponse('No books in the cart', 400));
    }
    cart.books = [];
    await cart.save();
    res.status(200).json({success:true,doc:cart});
})

module.exports = {
    removeBook,
    addBook,
    checkout
}