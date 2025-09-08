import mongoose from "mongoose";

export interface IMovieImages {
    poster: string | null;
    backdrop: string | null;
}

export interface IMovie extends mongoose.Document {
    ref: number;
    title: string;
    images: IMovieImages;
}

const movieSchema = new mongoose.Schema({
    ref: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    images: {
        poster: { type: String, required: false },
        backdrop: { type: String, required: false },
    }
});

movieSchema.index({ ref: 1 }, { unique: true });

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;