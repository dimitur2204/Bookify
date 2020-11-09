const {Router} = require('express');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const shoppingCartRouter = require('./routes/shopping-cart');
module.exports.connect = (path, app) => {
    const router = Router();

    router.use('/auth',authRouter);
    router.use('/books',bookRouter);
    router.use('/cart',shoppingCartRouter);
    
    app.use(path,router);
}