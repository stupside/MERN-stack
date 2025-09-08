import { createPartyReqBodySchema, createPartyResBodySchema, getPartyByIdReqParamsSchema, getPartyByIdResBodySchema, getAllPartiesResBodySchema, addMovieToPartyReqBodySchema, addMovieToPartyReqParamsSchema, removeMovieFromPartyReqBodySchema, removeMovieFromPartyReqParamsSchema } from "api";

import Party from "../../core/domain/party";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";
import User, { IUser } from "../../core/domain/user";
import { IMovie } from "../../core/domain/movie";
import { getMovie } from "../../core/utils/movies";
import { joinPartyReqBodySchema, joinPartyReqParamsSchema } from "libraries/api/schemas/parties";

export const createParty = requestHandler({
    request: createPartyReqBodySchema,
    result: createPartyResBodySchema,
}, async (req, res) => {

    const party = new Party({
        name: req.body.name,
        users: [] // TODO: add owner user
    });
    await party.save();

    return res.status(201).send({ id: party.id });
});

export const getPartyById = requestHandler({
    params: getPartyByIdReqParamsSchema,
    result: getPartyByIdResBodySchema,
}, async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
        users: IUser[],
        movies: IMovie[]
    }>([
        {
            path: "users",
        },
        {
            path: "movies",
        }
    ])
    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    return res.json({
        id: party.id,
        name: party.name,
        users: party.users.map(user => {
            if (!user) throw new Error("User not found");
            return { id: user.id, name: user.name };
        }),
        movies: party.movies.map(movie => {
            if (!movie) throw new Error("Movie not found");
            return { id: movie.id, title: movie.title };
        })
    });
});

export const getAllParties = requestHandler({
    result: getAllPartiesResBodySchema,
}, async (_, res) => {
    const parties = await Party.find();
    return res.json(parties.map(party => ({
        id: party.id,
        name: party.name,
    })));
})

export const addMovieToParty = requestHandler({
    params: addMovieToPartyReqParamsSchema,
    request: addMovieToPartyReqBodySchema,
}, async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
        movies: IMovie[]
    }>([
        {
            path: "movies",
        }
    ]);

    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    if (party.movies.find(movie => movie.ref === req.body.id)) {
        return next(new HttpError(400, "Movie already in party"));
    }

    const movie = await getMovie(req.body.id);
    if (movie instanceof HttpError) {
        return next(movie);
    }
    if (!movie) {
        return next(new HttpError(500, "Could not retrieve movie"));
    }

    party.movies.push(movie);
    await party.save();

    return res.json({});
});

export const removeMovieFromParty = requestHandler({
    params: removeMovieFromPartyReqParamsSchema,
    request: removeMovieFromPartyReqBodySchema,
}, async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
        movies: IMovie[]
    }>([
        {
            path: "movies",
        }
    ]);

    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    if (!party.movies.find(movie => movie.ref === req.body.id)) {
        return next(new HttpError(400, "Movie not in party"));
    }

    party.movies = party.movies.filter(movie => movie.ref !== req.body.id);
    await party.save();

    return res.json({});
});

export const joinParty = requestHandler({
    request: joinPartyReqBodySchema,
    params: joinPartyReqParamsSchema,
}, async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
        users: IUser[]
    }>([
        {
            path: "users",
        }
    ]);
    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    if (party.users.find(user => user.id === req.jwt.user.id)) {
        return next(new HttpError(400, "User already in party"));
    }

    const user = await User.findById(req.jwt.user.id);
    if (!user) {
        return next(new HttpError(404, "User not found"));
    }

    party.users.push(user);
    await party.save();

    return res.json({});
});
