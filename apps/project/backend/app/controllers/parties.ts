import {
  addMovieToWatchlistReqParamsSchema,
  createPartyReqBodySchema,
  createPartyResBodySchema,
  getAllPartiesResBodySchema,
  getPartyByIdReqParamsSchema,
  getPartyByIdResBodySchema,
  joinPartyReqBodySchema,
  joinPartyResBodySchema,
  leavePartyReqParamsSchema,
  removeMovieFromWatchlistReqParamsSchema,
} from "api/schemas/parties";
import type { IMovie } from "../../core/domain/movie";
import Party from "../../core/domain/party";
import User, { type IUser } from "../../core/domain/user";
import { HttpError } from "../../core/errors/http";
import { createHandler } from "../../core/express/handler";
import { getMovie } from "../../core/utils/movies";

export const createParty = createHandler(
  {
    body: createPartyReqBodySchema,
    result: createPartyResBodySchema,
  },
  async (req, res) => {
    const user = await User.findById(req.jwt.user.id);
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const party = new Party({
      code,
      name: req.body.name,
      users: [],
      owner: user,
    });
    await party.save();

    return res.status(201).send({ id: party.id });
  },
);

export const getPartyById = createHandler(
  {
    result: getPartyByIdResBodySchema,
    params: getPartyByIdReqParamsSchema,
  },
  async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
      owner: IUser;
      users: IUser[];
      movies: IMovie[];
    }>([
      {
        path: "owner",
      },
      {
        path: "users",
      },
      {
        path: "movies",
      },
    ]);
    if (!party) {
      return next(new HttpError(404, "Party not found"));
    }
    return res.json({
      id: party.id,
      code: party.code,
      name: party.name,
      users: party.users.map((user) => {
        return { id: user.id, name: user.name };
      }),
      owner: { id: party.owner.id, name: party.owner.name },
      movies: party.movies.map((movie) => ({
        id: movie.ref,
        title: movie.title || null,
        rating: movie.rating || null,
        release: movie.release || null,
        overview: movie.overview || null,
        language: movie.language || null,
        genres: movie.genres.map((genre) => ({
          id: genre.id,
          name: genre.name || null,
        })),
        images: {
          poster: movie.images.poster
            ? `https://image.tmdb.org/t/p/w500${movie.images.poster}`
            : null,
          backdrop: movie.images.backdrop
            ? `https://image.tmdb.org/t/p/w500${movie.images.backdrop}`
            : null,
        },
      })),
    });
  },
);

export const getAllParties = createHandler(
  {
    result: getAllPartiesResBodySchema,
  },
  async (req, res) => {
    const parties = await Party.find({
      $or: [
        { owner: { $eq: req.jwt.user.id } },
        { users: { $in: [req.jwt.user.id] } },
      ],
    }).populate<{ owner: IUser }>([
      {
        path: "owner",
      },
    ]);
    return res.json(
      parties.map((party) => ({
        id: party.id,
        name: party.name,
        owner: { id: party.owner.id, name: party.owner.name },
      })),
    );
  },
);

export const addMovieToWatchlist = createHandler(
  {
    params: addMovieToWatchlistReqParamsSchema,
  },
  async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
      movies: IMovie[];
    }>([
      {
        path: "movies",
      },
    ]);

    if (!party) {
      return next(new HttpError(404, "Party not found"));
    }
    if (party.movies.find((movie) => movie.ref === req.params.movie)) {
      return next(new HttpError(400, "Movie already in party"));
    }

    const movie = await getMovie(req.params.movie);
    if (movie instanceof HttpError) {
      return next(movie);
    }
    if (!movie) {
      return next(new HttpError(500, "Could not retrieve movie"));
    }

    party.movies.push(movie);
    await party.save();

    return res.json();
  },
);

export const removeMovieFromWatchlist = createHandler(
  {
    params: removeMovieFromWatchlistReqParamsSchema,
  },
  async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
      movies: IMovie[];
    }>([
      {
        path: "movies",
      },
    ]);

    if (!party) {
      return next(new HttpError(404, "Party not found"));
    }
    if (!party.movies.find((movie) => movie.ref === req.params.movie)) {
      return next(new HttpError(400, "Movie not in party"));
    }

    party.movies = party.movies.filter(
      (movie) => movie.ref !== req.params.movie,
    );
    await party.save();

    return res.json();
  },
);

export const joinParty = createHandler(
  {
    body: joinPartyReqBodySchema,
    result: joinPartyResBodySchema,
  },
  async (req, res, next) => {
    const party = await Party.findOne({ code: req.body.code }).populate<{
      owner: IUser;
      users: IUser[];
    }>([
      {
        path: "users",
      },
      {
        path: "owner",
      },
    ]);
    if (!party) {
      return next(new HttpError(404, "Party not found"));
    }
    if (party.users.find((user) => user.id === req.jwt.user.id)) {
      return next(new HttpError(400, "User already in party"));
    }
    if (party.owner.id === req.jwt.user.id) {
      return next(new HttpError(400, "User is the owner of the party"));
    }

    const user = await User.findById(req.jwt.user.id);
    if (!user) {
      return next(new HttpError(404, "User not found"));
    }

    party.users.push(user);
    await party.save();

    return res.json({
      id: party.id,
    });
  },
);

export const leaveParty = createHandler(
  {
    params: leavePartyReqParamsSchema,
  },
  async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
      owner: IUser;
      users: IUser[];
    }>([{ path: "users" }]);
    if (!party) {
      return next(new HttpError(404, "Party not found"));
    }
    if (party.owner.id === req.jwt.user.id) {
      return next(new HttpError(400, "Owner cannot leave the party"));
    }
    if (!party.users.find((user) => user.id === req.jwt.user.id)) {
      return next(new HttpError(400, "User not in party"));
    }

    party.users = party.users.filter((user) => user.id !== req.jwt.user.id);
    await party.save();

    return res.json();
  },
);
