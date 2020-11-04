const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const User = require('../models/user')
const router = Router();

const controllers = {...controllerFactory(User)};


router.route('/')
    .get(controllers.getAll)
    .post(controllers.createOne);

router.route('/register')
    .post(controllers.createOne);

router.route('/register')
    .post(controllers.createOne);

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne);