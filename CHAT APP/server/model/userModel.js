const mongoose=require("mongoose");

// here we creating mongoose object Schema
const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    // It would be used after login for avatars
    isAvatarImageSet: {
        type:Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});

// Same as how we create const object =mongoose.model here we doing module.exports
module.exports= mongoose.model("Users",userSchema);
