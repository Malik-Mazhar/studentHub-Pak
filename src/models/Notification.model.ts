import mongoose, { Schema, Document, Types } from "mongoose";

interface INotification extends Document {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  postId: Types.ObjectId;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "UserPost",
    },

    type: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;