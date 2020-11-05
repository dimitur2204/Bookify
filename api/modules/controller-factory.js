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
        let query;

        const reqQuery = {...req.query};

        const removeFields = ['select'];

        removeFields.forEach(field => {
            delete reqQuery[field];
        })

        let queryStr = JSON.stringify(reqQuery);

        //returning the query param with a $ concatenated since mongoose requires it for the search queries
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => '$' + match);

        query = Model.find(JSON.parse(queryStr));

        //filtereing unselected fields
        if (req.query.select) {
            // replacing the , with spaces since mongoose does'nt recognize it either
            const fields = req.query.select.replace(',',' ');
            console.log(fields);
            query = query.select(fields);            
        }

        const doc = await query
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