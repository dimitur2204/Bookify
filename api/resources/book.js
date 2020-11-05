const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const processQuery = require('../middleware/processQuery')
const Book = require('../models/book');
const router = Router();
const { multerUploads } = require('../middleware/multer');
const processImageUpload = require('../middleware/processImageUpload');
const controllers = controllerFactory(Book);
router.route('/')
    .get(processQuery,controllers.getAll)
    .post(multerUploads,processImageUpload,controllers.createOne);

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne);

module.exports = router;