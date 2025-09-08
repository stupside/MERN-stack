import mongoose from "mongoose";
import User from "./user";
import Movie from "./movie";

export interface IParty extends mongoose.Document {
    name: string;
    code: string;
    owner: mongoose.Types.ObjectId;
    users: mongoose.Types.ObjectId[];
    movies: mongoose.Types.ObjectId[];
}

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    owner: {
        ref: User.modelName,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: [{
        ref: User.modelName,
        type: mongoose.Schema.Types.ObjectId,
    }],
    movies: [{
        ref: Movie.modelName,
        type: mongoose.Schema.Types.ObjectId,
    }]
});

partySchema.index({ code: 1 }, { unique: true });

const Party = mongoose.model<IParty>("Party", partySchema);

export default Party;
