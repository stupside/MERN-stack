import mongoose from "mongoose";
import User from "./user";
import Movie from "./movie";

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    users: [{
        type: User.schema,
        default: []
    }],
    movies: [{
        type: Movie.schema,
        default: [],
    }]
});

partySchema.index({ code: 1 }, { unique: true });

const Party = mongoose.model("Party", partySchema);

export default Party;
