const ErrorResponse = require("../../../utils/error-response");
const asyncHandler = require("../asyncHandlers");
const { uploader} = require("./cloudinary");
const { dataUri } = require("./multer");

const processImageUpload = asyncHandler(async(req,res,next) => {
    const image = req.files.image[0];
    const imageUri = dataUri(image).content;
    if (!image.mimetype.startsWith('image/')) {
        return next(new ErrorResponse('Please upload an image file.',415));
    }
    if (image.size > process.env.MAX_IMAGE_UPLOAD) {
        return next(new ErrorResponse
            (`Please upload a file smaller than ${Math.round(process.env.MAX_IMAGE_UPLOAD / 1000000)}MB`,
            400));
    }
    const imageInfo = await uploader.upload(imageUri);
    req.body.imageId = imageInfo.public_id;
    req.body.imageUrl = imageInfo.url;
    next();
});

module.exports = processImageUpload;