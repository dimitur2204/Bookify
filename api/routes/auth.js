const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const authControllers = require('../modules/auth/controllers/auth');
const User = require('../models/user');
const { protect } = require('../middleware/auth');
const { modifyParamsForUser } = require('../middleware/body');
const proccessQuery = require('../middleware/processQuery');
const router = Router();

const controllers = {...controllerFactory(User),...authControllers};

router.route('/register')
    .post(controllers.register);

router.route('/login')
    .post(controllers.login);

router.route('/me')
    .get(protect,modifyParamsForUser,proccessQuery(User,'books'),controllers.getOne);

module.exports = router;
