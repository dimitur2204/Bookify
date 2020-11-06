const asyncHandler = require("./asyncHandlers");
const { uploader } = require("./cloudinary");
const { dataUri } = require("./multer");

const processFileUpload = asyncHandler (async (req,res,next) => {
    if(req.files) {
            
        await Promise.all(Object.entries(req.files).map(async ([name, fArr]) => {
                const file = fArr[0];
                const fileUri = dataUri(file).content;
                const fileInfo = await uploader.upload(fileUri);
                const url = fileInfo.url;
                req.body[name + 'Url'] = url;
            }));
        }
        next();
});

module.exports = processFileUpload;

