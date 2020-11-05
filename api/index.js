const {Router} = require('express');
const userRouter = require('./resources/user');
const bookRouter = require('./resources/book');
const shoppingCartRouter = require('./resources/shopping-cart');
module.exports.connect = (path, app) => {
    const router = Router();

    router.use('/users',userRouter);
    router.use('/books',bookRouter);
    router.use('/cart',shoppingCartRouter);
    
    app.use(path,router);
}