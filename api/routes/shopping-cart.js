const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const ShoppingCart = require('../models/shopping-cart');
const shoppingCartControllers = require('../modules/shopping-cart');
const { protect, requireCreator, permitRoles } = require('../middleware/auth');
const proccessQuery = require('../middleware/processQuery');
const { modifyParamsForCart } = require('../middleware/body');
const router = Router();

const controllers = {...controllerFactory(ShoppingCart),...shoppingCartControllers};

router.route('/books/:id')
    .delete(protect,
        permitRoles('user'),
        modifyParamsForCart(false),
        requireCreator(ShoppingCart),
        controllers.removeBook)
    .post(protect,
        permitRoles('user'),
        modifyParamsForCart(false),
        requireCreator(ShoppingCart),
        controllers.addBook)

router.route('/')
    .get(protect,
        permitRoles('user'),
        modifyParamsForCart(true),
        requireCreator(ShoppingCart),
        proccessQuery(ShoppingCart,'books'),
        controllers.getOne)

module.exports = router;
