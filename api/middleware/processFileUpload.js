const e = require("express");
const ErrorResponse = require("../../utils/error-response");
const asyncHandler = require("./asyncHandlers");
const { uploader, utils } = require("./cloudinary");
const { dataUri } = require("./multer");

// This terribleness right here is needed because
// cloudinary does not allow you to fetch public pdf files,
// so I need to create a privateUrl for the preview which does not expire
const NEVER_EXPIRE = Number.MAX_SAFE_INTEGER;

const processFileUpload = asyncHandler (async (req,res,next) => {
    if(req.files) {
        const image = req.files.image[0];
        const imageUri = dataUri(image).content;
        if (!image.mimetype.startsWith('image/')) {
            return next(new ErrorResponse('Please upload an image file.',400));
        }
        if (image.size > process.env.MAX_IMAGE_UPLOAD) {
            return next(new ErrorResponse
                (`Please upload a file smaller than ${Math.round(process.env.MAX_IMAGE_UPLOAD / 1000000)}MB`,
                400));
        }
        const preview = req.files.preview[0];
        const previewUri = dataUri(preview).content;
        const fullBook = req.files.fullBook[0];
        const fullBookUri = dataUri(fullBook).content;
        if (!(preview.mimetype === 'application/pdf' && fullBook.mimetype === 'application/pdf')) {
            return next(new ErrorResponse('Please upload a pdf file.',400));
        }
        if(fullBook.size > process.env.MAX_FULL_UPLOAD){
            return next(new ErrorResponse
                (`Please upload a file smaller than ${Math.round(process.env.MAX_FULL_UPLOAD / 1000000)}MB`,
                400));
        }
        if(preview.size > process.env.MAX_PREVIEW_UPLOAD){
            return next(new ErrorResponse
                (`Please upload a file smaller than ${Math.round(process.env.MAX_FULL_UPLOAD / 1000000)}MB`,
                400));
        }
        const imageInfo = await uploader.upload(imageUri,{folder:'book_images'});
        req.body.imageId = imageInfo.public_id;
        req.body.imageUrl = imageInfo.url;
        const pdfInfos = await Promise.all([uploader.upload(previewUri,{type:'private',folder:'previews'}),uploader.upload(fullBookUri,{type:'private',folder:'full_books'})])
        const previewInfo = pdfInfos[0];
        req.body.previewId = previewInfo.public_id;
        req.body.previewUrl = await utils.private_download_url(previewInfo.public_id,'pdf',{attachment:true,expires_at:NEVER_EXPIRE});
        const fullBookInfo = pdfInfos[1];
        req.body.fullBookId = fullBookInfo.public_id;
        next();
        return;
        }
        next(new ErrorResponse('Please upload files',400));
});

module.exports = processFileUpload;

