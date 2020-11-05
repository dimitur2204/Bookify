const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const userControllers = require('../modules/user/controllers/user');
const User = require('../models/user')
const router = Router();

const controllers = {...controllerFactory(User),...userControllers};


router.route('/')
    .get(controllers.getAll)

router.route('/register')
    .post(controllers.createOne);

router.route('/login')
    .post(controllers.postLogin);

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne);

module.exports = router;
