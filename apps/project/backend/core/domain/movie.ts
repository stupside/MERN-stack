import mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
    ref: number;
    title: string;
}

const movieSchema = new mongoose.Schema({
    ref: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
});

movieSchema.index({ ref: 1 }, { unique: true });

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;