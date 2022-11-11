import mongoose  from "mongoose";
import config from "config";

export interface TrackDocument extends mongoose.Document {
    name: string;
    album: string;
    artist: string;
    duration: number;
    artwork: string;
    audio: string;
    createdAt: Date;
    updatedAt: Date;
}

const trackSchema = new mongoose.Schema({
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