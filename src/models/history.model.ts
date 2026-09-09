import mongoose, { Schema, Document, Model } from "mongoose";

export interface HistoryProp extends Document {
  userId: mongoose.Types.ObjectId;
  action: "view" | "create" | "attempt" | "save" | "comment";
  resourceType:
    | "post"
    | "note"
    | "question"
    | "quiz"
    | "video"
    | "playlist"
    | "profile";
  resourceId: mongoose.Types.ObjectId;
  title?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const historySchema = new Schema<HistoryProp>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    action: {
      type: String,
      enum: ["view", "create", "attempt", "save", "comment"],
      required: true,
    },

    resourceType: {
      type: String,
      enum: [
        "post",
        "note",
        "question",
        "quiz",
        "video",
        "playlist",
        "profile",
      ],
      required: true,
    },

    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      trim: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Latest history first
historySchema.index({ userId: 1, createdAt: -1 });

// Prevent duplicate view records for the exact same resource
// if you decide to update an existing view instead of creating one.
historySchema.index({
  userId: 1,
  resourceType: 1,
  resourceId: 1,
});

const History: Model<HistoryProp> = mongoose.models.History || mongoose.model<HistoryProp>("History", historySchema);

export default History;