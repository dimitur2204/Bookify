const {Schema,Types,model} = require('mongoose');

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
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
    description:{
        type:String,
        required:true
    },
    books:[{
        type:Types.ObjectId,
        ref:'book'
    }],
    shoppingCart:{
        type:Types.ObjectId,
        ref:'shoppingCart'
    },
    role:{
        type:String,
        enum:[
            "User",
            "Author"
        ]
    }
});

module.exports = model('user',userSchema);