const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const authControllers = require('../modules/auth/controllers/auth');
const User = require('../models/user');
const { protect } = require('../middleware/auth');
const { modifyParamsForUser } = require('../middleware/body');
const proccessQuery = require('../middleware/processQuery');
const processImageUpload = require('../middleware/processImageUpload');
const router = Router();

const controllers = {...controllerFactory(User),...authControllers};

router.route('/register')
    .post(processImageUpload,controllers.register);

router.route('/login')
    .post(controllers.login);

router.route('/me')
    .get(protect,modifyParamsForUser,proccessQuery(User,'books shoppingCart'),controllers.getOne);

module.exports = router;
