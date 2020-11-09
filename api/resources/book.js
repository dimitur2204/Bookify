const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const processQuery = require('../middleware/processQuery')
const Book = require('../models/book');
const router = Router();
const { multerUploads } = require('../middleware/multer');
const processFileUpload = require('../middleware/processFileUpload');
const controllers = controllerFactory(Book);
router.route('/')
    .get(processQuery(Book,null),controllers.getAll)
    .post(multerUploads,processFileUpload,controllers.createOne);

router.route('/:id')
    .get(processQuery(Book,null),controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne);

module.exports = router;