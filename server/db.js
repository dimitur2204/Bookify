const mongoose = require('mongoose');

module.exports.connect = (connectionString) => {
    return mongoose.connect(connectionString,{
        useCreateIndex: true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false})
};