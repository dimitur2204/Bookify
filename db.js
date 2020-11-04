const mongoose = require('mongoose');

module.exports.connect = (connectionString) => {
    console.log(connectionString);
    return mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true})
};