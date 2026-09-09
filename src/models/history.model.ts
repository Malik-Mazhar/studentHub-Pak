import mongoose, { Schema, Document, Model } from "mongoose";

export interface HistoryProp extends Document {
  userId: mongoose.Types.ObjectId;

  page:
    | "community"
    | "create Post"
    | "notes"
    |  "contact"
    | "My Posts"
    | "save Post"
    | "questions"
    | "videos"
    | "courses"
    | "playlists"
    | "profile";

  resourceId?: string;

  visitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const historySchema = new Schema<HistoryProp>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    page: {
      type: String,
      enum: [
        "community",
        "create Post",
        "notes",
        "contact",
        "My Posts",
        "save Post",
        "questions",
        "videos",
        "courses",
        "playlists",
        "profile",
      ],
      required: true,
    },

    resourceId: {
      type: String,
      required: false,
    },

    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One history record per user + page + resource
historySchema.index(
  { userId: 1, page: 1, resourceId: 1 },
  { unique: true }
);

// Latest visited first
historySchema.index({
  userId: 1,
  visitedAt: -1,
});

const History: Model<HistoryProp> =
  mongoose.models.History ||
  mongoose.model<HistoryProp>("History", historySchema);

export default History;