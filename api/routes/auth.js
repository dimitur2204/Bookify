const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const authControllers = require('../modules/auth/controllers/auth');
const User = require('../models/user');
const { protect } = require('../middleware/auth');
const router = Router();

const controllers = {...controllerFactory(User),...authControllers};

router.route('/register')
    .post(controllers.register);

router.route('/login')
    .post(controllers.login);

router.route('/me')
    .get(protect,controllers.getLoggedUser);

module.exports = router;
