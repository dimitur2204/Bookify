const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const ShoppingCart = require('../models/shopping-cart');
const shoppingCartControllers = require('../modules/shopping-cart/controllers/shopping-cart');
const router = Router();

const controllers = {...controllerFactory(ShoppingCart),...shoppingCartControllers};


router.route('/:id/books')
    .get(controllers.getAllBooks)
    

router.route('/:cartId/books/:bookId')
    .delete(controllers.removeBook)
    .post(controllers.addBook)

router.route('/')
    .post(controllers.createCart);

router.route('/:id')
    .get(controllers.getOne)

router.route('/:id/checkout')
    .post(controllers.checkout)

module.exports = router;
