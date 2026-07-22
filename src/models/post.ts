import mongoose, { Schema, Document, Types } from "mongoose";

export interface UserPost extends Document {
    author: Types.ObjectId;
    postType: string;

    title: string;
    content?: string;

    category?: string;
    notesCategory?: string;
    className?: string

    tags?: string[];

    resourceLink?: string;

    postImageUrl?: string[];
    postDocumentUrl: string;
    postImgPublicId?: string[];
    postDocumentPublicId: string;

    videoLink?: string;

    pollQuestion?: string;
    pollOptions?: string[];
    pollDuration?: number;

    visibility: string;

    likes: Types.ObjectId[];
};

const userPostSchema: Schema<UserPost> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postType: {
        type: String,
        enum: [
            "discussion",
            "notes",
            "question",
            "poll",
            "resource",
            "video",
            "simple",
        ],
        default: "simple",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
    },

    category: {
        type: String,
        enum: ["General Discussion", "Education", "Technology", "Science", "Career"]
    },
    notesCategory: {
        type: String,
        enum: ["Mathematics", "English", "Bio", "Science"],
    },
    className: {
        type: String,
        enum: ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
        default: "10th",
    },


    tags: {
        type: [String],
        default: [],
    },
    resourceLink: {
        type: String,
    },

    postImageUrl: {
        type: [String],
    },
    postImgPublicId: {
        type: [String],
    },
    postDocumentUrl: {
        type: String,
    },
    postDocumentPublicId: {
        type: String,
    },

     videoLink: String,

    pollQuestion: String,
    pollOptions: {
        type: [String],
        default: [],
    },
    pollDuration: Number,
     
    visibility: {
        type: String,
        enum: ["Everyone", "Only Members", "Private"],
        default: "Everyone",
    },

    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

}, { timestamps: true });

export const UserPostModel = (mongoose.models.UserPost as mongoose.Model<UserPost>) || mongoose.model<UserPost>("UserPost", userPostSchema);

export default UserPostModel;