const ErrorResponse = require("../../utils/error-response");
const asyncHandler = require("../middleware/asyncHandlers");

module.exports = controllerFactory = (Model) => {
    const createOne = asyncHandler(async (req,res,next) => {
        const doc = await Model.create(req.body)
        res.status(201).send({success:true,doc});
    })
    
    const updateOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id
        const doc = await Model.findOneAndUpdate(id,req.body,{
            new:true
        })
        if(!doc){
           return next(new ErrorResponse(`Item with id of ${id} not found!`,404));
        }
        res.status(204).send({success:true,doc});
    })
    
    const getAll = asyncHandler(async (req,res,next) => {
        res.status(201).send(res.advancedResults);
    })
    
    const getOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id;
        const doc = await Model.findOne(id);
        if(!doc){
            return next(new ErrorResponse(`Item with id of ${id} not found!`,404));
         }
        res.status(200).send({success:true,doc});
    })

    const deleteOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id;
        const doc = await Model.findOne(id);
        if(!doc){
            return next(new ErrorResponse(`Item with id of ${id} not found!`,404));
         }
        await doc.remove();
        res.status(200).send({success:true,doc});
    })

    return {
        createOne,
        updateOne,
        getAll,
        getOne,
        deleteOne
    }
}