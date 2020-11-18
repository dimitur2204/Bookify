const {Router} = require('express');
const controllerFactory = require('../modules/controller-factory');
const processQuery = require('../middleware/processQuery')
const Book = require('../models/book');
const router = Router();
const { multerUploads } = require('../middleware/files/multer');
const processBookUpload = require('../middleware/files/processBookUpload');
const { protect,permitRoles,requireCreator  } = require('../middleware/auth');
const { addUserToBody } = require('../middleware/body');
const processImageUpload = require('../middleware/files/processImageUpload');
const controllers = controllerFactory(Book);
router.route('/')
    .get(protect, 
         permitRoles('user'), 
         processQuery(Book,null),
         controllers.getAll)
    .post(protect,
         permitRoles('author'),
         multerUploads,
         processImageUpload,
         processBookUpload,
         addUserToBody,
         controllers.createOne);

router.route('/:id')
    .get(protect,
        permitRoles('user'),
        processQuery(Book,null),
        controllers.getOne)
    .put(protect,
        permitRoles('author'),
        requireCreator(Book),
        controllers.updateOne)
    .delete(protect,
        permitRoles('author'),
        requireCreator(Book),
        controllers.deleteOne);

module.exports = router;