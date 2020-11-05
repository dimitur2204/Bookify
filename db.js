const mongoose = require('mongoose');

module.exports.connect = (connectionString) => {
    return mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
};