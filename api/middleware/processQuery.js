const proccessQuery = (req,res,next) => {
    const reqQuery = {...req.query};

    const removeFields = ['select','sort','page','limit'];

    removeFields.forEach(field => {
        delete reqQuery[field];
    })

    let queryStr = JSON.stringify(reqQuery);
    const requestQuery = req.query;
    //returning the query param with a $ concatenated since mongoose requires it for the search queries
    requestQuery.searchObj = JSON.parse(queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => '$' + match));

    //filtering unselected fields
    if (requestQuery.select) {
        // replacing the , with spaces since mongoose doesn't recognize it either
        requestQuery.select = requestQuery.select.replace(',',' ');          
    }

    //sort - defaulting to createdAt by descending
    if(requestQuery.sort){
        requestQuery.sort = requestQuery.sort.replace(',',' ');
    }

    //pagination
    requestQuery.page = Number(requestQuery.page) || 1
    requestQuery.limit = Number(requestQuery.limit) || 25;
    requestQuery.startIndex = (requestQuery.page - 1) * requestQuery.limit;
    requestQuery.endIndex = requestQuery.page * requestQuery.limit;

    next();
}

module.exports = proccessQuery;