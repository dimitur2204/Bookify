const {Schema,Types,model} = require('mongoose');


const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    user:{
        type:Types.ObjectId,
        ref:'user',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    categories:{
        type:[String],
        enum:[
            'Arts and Music','Biographies','Business','Comics','Computers and Tech',
            'Cooking', 'Education and Reference','Entertainment','Health and Fitness',
            'History','Hobbies and Crafts','Home and Garden','Kids','Medical','Literature and Fiction',
            'Mysteries','Romance','Sci-Fi', 'Science and Math', 'Travel', 'True Crime','Sports','Teen'
        ]
    },
    previewUrl:{
        type:String
    },
    fullBookUrl:{
        type:String,
        required:true,
        select:false
    },
    buyers:[{
        type:Types.ObjectId,
        ref:'user'
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

bookSchema.pre('save',async function(next){
    await this.model('user').updateOne({_id:this.user},{$addToSet:{books: this}});
    next();
})

bookSchema.pre('remove',async function(next){
    await this.model('user').updateMany({},{$pull:{books: {$in: this._id}}}, {multi:true});
    await this.model('shoppingCart').updateMany({},{$pull:{books: {$in: this._id}}}, {multi:true});
    next();
})

module.exports = model('book',bookSchema);