import mongoose, { Schema, Document, Types } from "mongoose";

export interface Userpost extends Document {
   title: string,
   content?: string,
   postImageUrl?: string,
   postImgPublicId?: string,
   author: Types.ObjectId,
   createdAt: Date,
};

const userPostSchema: Schema<Userpost> = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
    },
    postImageUrl: {
        type: String,
    },
    postImgPublicId: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const UserPostModel = ( mongoose.models.Post as mongoose.Model <Userpost> || mongoose.model<Userpost>("UserPost", userPostSchema));

export default UserPostModel;