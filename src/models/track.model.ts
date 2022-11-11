import mongoose  from "mongoose";
import { UserDocument } from "./user.model";

export interface TrackInput {
    user: UserDocument["_id"];
    name: string,
    album: string,
    artist: string,
    duration: number,
    artwork: string,
    audio: string,
}

export interface TrackDocument extends TrackInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const trackSchema = new mongoose.Schema({
    trackId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
      },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {type: String, required: true},
    album: {type: String, required: true},
    artist: {type: String, required: true},
    duration: {type: Number, required: true},
    artwork: {type: String, required: true},
    audio: {type: String, required: true},
},{
    timestamps: true
});

const TrackModel = mongoose.model("Track", trackSchema);

export default TrackModel;