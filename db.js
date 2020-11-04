const mongoose = require('mongoose');

module.exports.connect = (connectionString) => (
    mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true})
);