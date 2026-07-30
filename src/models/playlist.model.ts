import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface Playlist extends Document {
    author: Types.ObjectId;

    youtubePlaylistId: string;

    title: string;
    thumbnail: string;

    videoCount: number;
    playlistDuration: string;

    visibility: "Everyone" | "Only Me";

    createdAt: Date;
    updatedAt: Date;
}

const playlistSchema = new Schema<Playlist>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        youtubePlaylistId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        videoCount: {
            type: Number,
            required: true,
            min: 0,
        },

        playlistDuration: {
            type: String,
            required: true,
        },

        visibility: {
            type: String,
            enum: ["Everyone", "Only Me"],
            default: "Everyone",
        },
    },
    {
        timestamps: true,
    }
);

const PlaylistModel: Model<Playlist> =
    mongoose.models.Playlist ||
    mongoose.model<Playlist>("Playlist", playlistSchema);

export default PlaylistModel;