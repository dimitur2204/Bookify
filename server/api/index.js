const {Router} = require('express');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const paypalRouter = require('./routes/paypal');
const shoppingCartRouter = require('./routes/shopping-cart');
module.exports.connect = (path, app) => {
    const router = Router();

    router.use('/auth',authRouter);
    router.use('/paypal',paypalRouter);
    router.use('/books',bookRouter);
    router.use('/cart',shoppingCartRouter);
    
    app.use(path,router);
}