import mongoose from "mongoose";

export interface _IMovie {
  ref: number;
  title?: string;
  genres: { id: number; name?: string }[];
  images: {
    poster?: string;
    backdrop?: string;
  };
  rating?: number;
  release?: string;
  overview?: string;
  language?: string;
  production: { id: number; company?: string }[];
}

export interface IMovie extends mongoose.Document, _IMovie {}

const movieSchema = new mongoose.Schema({
  ref: { type: Number, required: true },
  title: { type: String, required: false },
  rating: { type: Number, required: false },
  release: { type: String, required: false },
  overview: { type: String, required: false },
  language: { type: String, required: false },
  genres: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: false },
    },
  ],
  images: {
    poster: { type: String, required: false },
    backdrop: { type: String, required: false },
  },
  production: [
    {
      id: { type: Number, required: true },
      company: { type: String, required: false },
    },
  ],
});

movieSchema.index({ ref: 1 }, { unique: true });

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
