import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFollow extends Document {
  follower: Types.ObjectId;
  following: Types.ObjectId;
  createdAt: Date;
}

const followSchema = new Schema<IFollow>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Same user ko dobara follow na kar sake
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow =
  mongoose.models.Follow ||
  mongoose.model<IFollow>("Follow", followSchema);

export default Follow;