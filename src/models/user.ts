import mongoose, { Schema, Document } from "mongoose";

export interface userProfileType extends Document {
    profileName: string,
    bio: string,
    pinnedDetail: string,
    location: string,
    birthday: Date,
    gender: string,
    profileImgUrl: string,
    coverImageUrl?: string; 
    profileImgPublicId?: string; 
    coverImgPublicId?: string; 
};

const userProfileSchema: Schema<userProfileType> = new Schema({
    profileName: {
        type: String,
        required: [true, "profileName is required"]
    },

    bio: {
        type: String,
        required: [true, "Bio is required"]
    },

    pinnedDetail: {
        type: String
    },

    location: {
        type: String
    },

    birthday: {
        type: Date
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Non-binary", "Other"]
    },

    profileImgUrl: {
        type: String
    },

    coverImageUrl: {
        type: String
    },

    profileImgPublicId: {
        type: String,
        default: ""
    },
    coverImgPublicId: {
        type: String,
        default: ""
    }
});

export interface User extends Document {
   username: string,
   email: string,
   password: string,
   profileImgUrl?: string,
   coverImage?: string,
   verifyCode: string,
   verifyCodeExpiry: Date,
   isverifyed: boolean,
   isAcceptMessage: boolean,
   watchHistory: mongoose.Types.ObjectId[],
   userProfile: userProfileType
};


const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [ true, "userName is required"],
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type:String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/ , "please use a valid email address"]
    },
    password: {
        type: String,
        required: [ true, "Password is required"],
    },

    profileImgUrl: {
        type: String // Cloudinary 3rd party
    },
    coverImage: {
        type: String
    },

    verifyCode: {
        type: String,
        required: [true, "verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify Code Expiry is required"]
    },
    isverifyed: {
        type: Boolean,
        default: false
    },
    
    isAcceptMessage: {
        type: Boolean,
        default: true
    },
    watchHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    ],
    userProfile: userProfileSchema
}, {timestamps: true});

const UserModel = (mongoose.models.User as mongoose.Model <User> || mongoose.model<User>("User", userSchema));

export default UserModel;