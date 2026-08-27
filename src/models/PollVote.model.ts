import mongoose, { Schema, Types, model, models } from "mongoose";

const pollVoteSchema = new Schema(
  {
    postId: {
      type: Types.ObjectId,
      ref: "UserPost",
      required: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    option: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek user ek poll par sirf ek vote de sake
pollVoteSchema.index(
  { postId: 1, userId: 1 },
  { unique: true }
);

const PollVote =
  models.PollVote || model("PollVote", pollVoteSchema);

export default PollVote;