import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    //posts of user 

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

    // Reels :  loops of user reels of users 
    loops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loop'
    }],
    //stories of user
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    },
    // Reset Password Fields
    resetOtp:{
    type: String,
},
    otpExpiresAt:{
    type: Date,
},
   isOtpVerified:{
    type: Boolean,
    default: false,
}


}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;