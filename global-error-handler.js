const ErrorResponse = require("./utils/error-response");

module.exports = (err,req,res,next) => {
    let error = {...err};

    console.error(err);
    if(err.name === 'CastError'){
        const message = `Item not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Internal server error'
    });
}