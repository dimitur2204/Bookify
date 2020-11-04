module.exports = controllerFactory = (Model) => {
    const createOne = (req,res,next) => {
        Model.create(req.body).then(doc => {
            res.status(201).send(doc);
        }).catch(next);
    }
    
    const updateOne = (req,res,next) => {
        const id = req.params.id
        Model.findByIdAndUpdate(id,req.body,{
            new:true
        }).then(doc => {
            res.status(204).send(doc);
        }).catch(next);
    }
    
    const getAll = (req,res,next) => {
        Model.find({}).then(doc => {
            res.status(201).send(doc);
        }).catch(next);
    }
    
    const getOne = (req,res,next) => {
        const id = req.params.id;
        Model.findById(id).then(doc => {
            res.status(200).send(doc);
        }).catch(next);
    }

    const deleteOne = (req,res,next) => {
        const id = req.params.id;
        Model.findByIdandDelete(id).then(doc => {
            res.status(200).send(doc);
        }).catch(next);
    }

    return {
        createOne,
        updateOne,
        getAll,
        getOne,
        deleteOne
    }
}