const {Schema,Types,model} = require('mongoose');
const { uploader } = require('../middleware/files/cloudinary');


const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        default:'no-image.jpg'
    },
    description:{
        type:String,
        required:true,
        maxlength:350
    },
    imageId:{
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
        min:0,
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
    previewId:{
        type:String
    },
    fullBookId:{
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
    await this.model('user').updateOne({_id:this.user,role:'author'},{$addToSet:{books: this}});
    next();
})

bookSchema.pre('remove',async function(next){
    const book = await this.model('book').findOne({_id:this._id}).select('fullBookId');
    await uploader.destroy(this.imageId,{});
    await uploader.destroy(this.previewId,{});
    await uploader.destroy(book.fullBookId,{});
    await Promise.all([
        this.model('user').updateMany({},{$pull:{books: {$in: this._id}}}, {multi:true}),
        this.model('shoppingCart').updateMany({},{$pull:{books: {$in: this._id}}}, {multi:true})]);
    next();
})

module.exports = model('book',bookSchema);