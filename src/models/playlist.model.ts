import mongoose  from "mongoose";
import TrackModel, { TrackDocument } from "./track.model";
import { UserDocument } from "./user.model";


export interface PlaylistInput {
    user: UserDocument["_id"];
    name: string;
    tracks: TrackDocument[];
    creator: string;
    playtime: number;
}

export interface PlaylistDocument extends PlaylistInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const playlistSchema = new mongoose.Schema({
    playlistId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
      },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {type: String, required: true},
    tracks: { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
    creator: {type: String, required: true},
    playtime: {type: Number, required: true},
},{
    timestamps: true
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

export default PlaylistModel;