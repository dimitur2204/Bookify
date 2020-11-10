const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const ShoppingCart = require('../models/shopping-cart');
const shoppingCartControllers = require('../modules/shopping-cart/controllers/shopping-cart');
const Book = require('../models/book');
const processQuery = require('../middleware/processQuery');
const { protect } = require('../middleware/auth');
const router = Router();

const controllers = {...controllerFactory(ShoppingCart),...shoppingCartControllers};

router.route('/:cartId/books/:bookId')
    .delete(controllers.removeBook)
    .post(controllers.addBook)

router.route('/')
    .post(controllers.createOne);

router.route('/:id')
    .get(protect,processQuery(Book,null),controllers.getOne)

router.route('/:id/checkout')
    .post(protect,controllers.checkout)

module.exports = router;
