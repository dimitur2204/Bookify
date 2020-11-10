const proccessQuery = (model,populate) => {
    return async (req,res,next) => {
        const reqQuery = {...req.query};
    
        const removeFields = ['select','sort','page','limit'];
    
        removeFields.forEach(field => {
            delete reqQuery[field];
        })
    
        let queryStr = JSON.stringify(reqQuery);
        const requestQuery = req.query;
        //returning the query param with a $ concatenated since mongoose requires it for the search queries
        const searchObj = JSON.parse(queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => '$' + match));

        //Finding resource
        let query = model.find(searchObj);
    
        //filtering unselected fields
        if (requestQuery.select) {
            // replacing the , with spaces since mongoose doesn't recognize it either
            query = query.select(requestQuery.select.replace(',',' '));          
        }
    
        //sort - defaulting to createdAt by descending
        if(requestQuery.sort){
            query = query.sort(requestQuery.sort.replace(',',' '));
        }else{
            query = query.sort('-createdAt')
        }
    
        //pagination
        const page = Number(requestQuery.page) || 1
        const limit = Number(requestQuery.limit) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const pagination = {};
        const total = await model.countDocuments();

        query = query.skip(startIndex).limit(limit);

        if(populate){
            console.log(populate);
            query = query.populate(populate);
        }

        if(endIndex < total){
            pagination.next = {
                page:page + 1,
                limit
            }
        }
        if(startIndex > 0){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        const results = await query;

        res.advancedResults = {
            success:true,
            count:results.length,
            pagination,
            doc:results
        }
    
        next();
    }
} 

module.exports = proccessQuery;