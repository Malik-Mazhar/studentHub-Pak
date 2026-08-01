import mongoose, { Schema, Types, Document } from "mongoose";

export interface Comment extends Document {
  author: Types.ObjectId;

  targetId: Types.ObjectId;
  targetModel: "UserPost" | "Playlist";

  content: string;

  parentComment?: Types.ObjectId;

  likes: Types.ObjectId[];

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

    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
       refPath: "targetModel",
    },
    targetModel: {
      type: String,
      enum: ["UserPost", "Playlist"],
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