import mongoose, { Schema, Types, Document } from "mongoose";

export interface Comment extends Document {
  author: Types.ObjectId;
  post: Types.ObjectId;

  content: string;

  parentComment?: Types.ObjectId; // Reply ke liye

  likes: Types.ObjectId[]; // Jin users ne like kiya

  edited: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<Comment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "UserPost",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    edited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.models.Comment || mongoose.model<Comment>("Comment", CommentSchema);