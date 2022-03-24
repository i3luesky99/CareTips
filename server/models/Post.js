const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    username:{
        type:String,
        require:true
    },
    desc: {
        type: String,
        max: 500
    },
    photo: {
        type: String,
        required:false
    },
    likes: {
        type: Array,
        default: []
    },
    categories:{
        type:Array,
        require:false
    },
    createAt: {
        type: Date,
        default: () => Date.now(),
    },
    updateAt: {
        type: Date,
        default: () => Date.now(),
    },
},
);
// PostSchema.path('title').validate(async (title) => {
//     const titleCount = await mongoose.models.Post.countDocuments({ title })
//     return !titleCount
// },'Tittle is aready exists')

module.exports = mongoose.model('Post', PostSchema) 
