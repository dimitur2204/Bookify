const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const Book = require('../models/book')
const router = Router();

const controllers = controllerFactory(Book);


router.route('/')
    .get(controllers.getAll)
    .post(controllers.createOne);

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne);

module.exports = router;