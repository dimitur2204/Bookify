const {Schema,Types,model} = require('mongoose');

const authorSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    books:[{
        type:Types.ObjectId,
        ref:'book'
    }]
});

module.exports = model('author',authorSchema);