const asyncHandler = require("../middleware/asyncHandlers");

module.exports = controllerFactory = (Model) => {
    const createOne = asyncHandler(async (req,res,next) => {
        const doc = await Model.create(req.body)
        res.status(201).send({success:true,doc});
    })
    
    const updateOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id
        const doc = await Model.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(204).send({success:true,doc});
    })
    
    const getAll = asyncHandler(async (req,res,next) => {
        const pagination = {};
        const total = await Model.countDocuments();
        if(req.query.endIndex < total){
            pagination.next = {
                page: req.query.page + 1,
                limit:req.query.limit
            }
        }
        console.log(req.query.startIndex);
        if(req.query.startIndex > 0){
            pagination.prev = {
                page: req.query.page - 1,
                limit:req.query.limit
            }
        }
        const doc = await Model
        .find(req.query.searchObj)
        .select(req.query.select)
        .sort(req.query.sort)
        .skip(req.query.startIndex)
        .limit(req.query.limit)

        res.status(201).send({success:true,count:doc.length,pagination,doc});
    })
    
    const getOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id;
        const doc = await Model.findById(id)
        res.status(200).send({success:true,doc});
    })

    const deleteOne = asyncHandler(async (req,res,next) => {
        const id = req.params.id;
        const doc = await Model.findByIdandDelete(id)
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