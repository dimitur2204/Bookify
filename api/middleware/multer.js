const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).fields([
    {name:'image',maxCount:1}, 
    {name:'preview',maxCount:1},
    {name:'fullBook',maxCount:1}]);
const Datauri = require('datauri/parser');
const dUri = new Datauri();
const path = require('path');
/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = file => dUri.format(path.extname(file.originalname).toString(), file.buffer);
module.exports = { multerUploads, dataUri };