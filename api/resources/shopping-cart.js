const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const ShoppingCart = require('../models/user');
const shoppingCartControllers = require('../modules/controllers/shopping-cart');
const router = Router();

const controllers = {...controllerFactory(ShoppingCart),...shoppingCartControllers};


router.route('/:id/products')
    .get(controllers.getAllProducts)

router.route('/:cartId/products/:productId')
    .delete(controllers.deleteProduct)

router.route('/')
    .get(controllers.createCart);

router.route('/:id')
    .get(controllers.getOne)
    .post(controllers.addProduct)

router.route('/:id/checkout')
    .post(controllers.checkout)