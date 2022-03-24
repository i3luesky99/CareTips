const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique:true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: () => Date.now(),
    },
    updateAt: {
        type: Date,
        default: () => Date.now(),
    },
}
);
UserSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({ email })
    return !emailCount
},'Email is aready exists')
module.exports = mongoose.model('User', UserSchema) 
