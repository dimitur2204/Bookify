const {Schema,Types,model} = require('mongoose');
const validator = require('validator').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ShoppingCart = require('./shopping-cart');

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
        required:true,
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
        select:false
    },
    imageUrl:{
        type:String,
        default:'no-image.jpg'
    },
    stripeId:{
        type:String,
        default:null
    },
    description:{
        type:String
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
            "user",
            "author"
        ],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

//Encrypt password
userSchema.pre('save', async function(next){
    //Encrypt password
    const salt = await bcrypt.genSalt(11);
    this.password = await bcrypt.hash(this.password, salt);
    //Create cart if the user is not an author
    if(this.role === 'user'){
        this.shoppingCart = await ShoppingCart.create({
            user:this._id
        })
    }
    next();
});

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = model('user',userSchema);