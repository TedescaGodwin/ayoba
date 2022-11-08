import mongoose  from "mongoose";
import config from "config";


export interface PlaylistDocument extends mongoose.Document {
    name: string;
    creator: string;
    playtime: number;
    createdAt: Date;
    updatedAt: Date;
}

const playlistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creator: {type: String, required: true},
    playtime: {type: Number, required: true},
},{
    timestamps: true
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

export default PlaylistModel;