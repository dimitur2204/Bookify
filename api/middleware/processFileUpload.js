const e = require("express");
const ErrorResponse = require("../../utils/error-response");
const asyncHandler = require("./asyncHandlers");
const { uploader } = require("./cloudinary");
const { dataUri } = require("./multer");

const processFileUpload = asyncHandler (async (req,res,next) => {
    if(req.files) {
        await Promise.all(Object.entries(req.files).map(async ([name, fArr]) => {
                const file = fArr[0];

                if (name === 'image') {
                    if (!file.mimetype.startsWith('image/')) {
                        return next(new ErrorResponse('Please upload an img file.',400));
                    }
                    if (file.size > process.env.MAX_IMAGE_UPLOAD) {
                        return next(new ErrorResponse
                            (`Please upload a file smaller than ${Math.round(process.env.MAX_IMAGE_UPLOAD / 1000000)}MB`,
                            400));
                    }
                }else{
                    if (!(file.mimetype === 'application/pdf')) {
                        return next(new ErrorResponse('Please upload a pdf file.',400));
                    }
                    if(name === 'preview' && file.size > process.env.MAX_PREVIEW_UPLOAD){
                        return next(new ErrorResponse
                            (`Please upload a file smaller than ${Math.round(process.env.MAX_PREVIEW_UPLOAD / 1000000)}MB`,
                            400));
                    }
                    if(name === 'fullBook' && file.size > process.env.MAX_FULL_UPLOAD){
                        return next(new ErrorResponse
                            (`Please upload a file smaller than ${Math.round(process.env.MAX_FULL_UPLOAD / 1000000)}MB`,
                            400));
                    }
                }
                const fileUri = dataUri(file).content;
                const fileInfo = await uploader.upload(fileUri);
                const url = fileInfo.url;
                req.body[name + 'Url'] = url;
            }));
            return next();
        }
        next(new ErrorResponse('Please upload files',400));
});

module.exports = processFileUpload;

