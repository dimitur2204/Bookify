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
    author:{
        type:Types.ObjectId,
        ref:'author',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    categories:{
        type:String,
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
        required:true
    },
    buyers:[{
        type:Types.ObjectId,
        ref:'user'
    }]
});

module.exports = model('book',bookSchema);