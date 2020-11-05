const asyncHandler = require("../middleware/asyncHandlers");

module.exports = controllerFactory = (Model) => {
    const createOne = asyncHandler(async (req,res,next) => {
        const doc = await Model.create(req.body)
        res.status(201).send(doc);
    })
    
    const updateOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id
        const doc = await Model.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(204).send(doc);
    })
    
    const getAll = asyncHandler(async (req,res,next) => {
        const doc = await Model.find({})
        res.status(201).send(doc);
    })
    
    const getOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id;
        const doc = await Model.findById(id)
        res.status(200).send(doc);
    })

    const deleteOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id;
        const doc = await Model.findByIdandDelete(id)
        res.status(200).send(doc);
    })

    return {
        createOne,
        updateOne,
        getAll,
        getOne,
        deleteOne
    }
}