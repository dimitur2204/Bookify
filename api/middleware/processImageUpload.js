const asyncHandler = require("./asyncHandlers");
const { uploader } = require("./cloudinary");
const { dataUri } = require("./multer");

const processImageUpload = asyncHandler (async (req,res,next) => {
    if(req.file) {
        const file = dataUri(req).content;
        const res = await uploader.upload(file);
        req.body.imageUrl = res.url;
        }
        next();
});

module.exports = processImageUpload;

