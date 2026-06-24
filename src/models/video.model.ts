import mongoose, { Schema, Document } from "mongoose";

export interface UserPostType extends Document {
    title: string,
    description: string,
    videoFile: string,
    thumbnail?: string,
    duration?: number,
    views?: number,
    isPublished?: boolean,
    owner: mongoose.Types.ObjectId,
};

const postSchema: Schema<UserPostType> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoFile: {
        type: String // Cloudinary 3rd party
    },
    thumbnail: {
        type: String
    },
    duration: {
        type: Number,
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
} , 
{
    timestamps: true 
});

export const Post = mongoose.model("Post", postSchema);