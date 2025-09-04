import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tmdbId: { type: Number, required: true, unique: true },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;