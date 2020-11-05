const ErrorResponse = require("./utils/error-response");

module.exports = (err,req,res,next) => {
    let error = {...err};

    // console.error(err);

    //Wrong Object ID Errors
    if(err.name === 'CastError'){
        const message = `Item not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    
    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    //Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors)
        .map(val => `Please add a ${val.path}`);
        error = new ErrorResponse(message,400);
    }
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Internal server error'
    });
}