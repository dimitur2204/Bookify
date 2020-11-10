const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const processQuery = require('../middleware/processQuery')
const Book = require('../models/book');
const router = Router();
const { multerUploads } = require('../middleware/multer');
const processFileUpload = require('../middleware/processFileUpload');
const { protect } = require('../middleware/auth');
const controllers = controllerFactory(Book);
router.route('/')
    .get(protect,processQuery(Book,null),controllers.getAll)
    .post(protect,multerUploads,processFileUpload,controllers.createOne);

router.route('/:id')
    .get(protect,processQuery(Book,null),controllers.getOne)
    .put(protect,controllers.updateOne)
    .delete(protect,controllers.deleteOne);

module.exports = router;