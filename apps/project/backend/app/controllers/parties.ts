import { createPartyReqBodySchema, createPartyResBodySchema, getPartyByIdReqParamsSchema, getPartyByIdResBodySchema, getAllPartiesResBodySchema, addMovieToPartyReqBodySchema, addMovieToPartyReqParamsSchema, removeMovieFromPartyReqBodySchema, removeMovieFromPartyReqParamsSchema } from "api";

import Party from "../../core/domain/party";
import { HttpError } from "../../core/errors/http";
import { requestHandler } from "../../core/express/handler";
import User, { IUser } from "../../core/domain/user";
import { IMovie } from "../../core/domain/movie";
import { getMovie } from "../../core/utils/movies";
import { joinPartyReqBodySchema, joinPartyResBodySchema } from "libraries/api/schemas/parties";

export const createParty = requestHandler({
    request: createPartyReqBodySchema,
    result: createPartyResBodySchema,
}, async (req, res) => {

    const user = await User.findById(req.jwt.user.id);
    if (!user) {
        throw new HttpError(404, "User not found");
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase()

    const party = new Party({
        code,
        name: req.body.name,
        users: [],
        owner: user,
    });
    await party.save();

    return res.status(201).send({ id: party.id });
});

export const getPartyById = requestHandler({
    params: getPartyByIdReqParamsSchema,
    result: getPartyByIdResBodySchema,
}, async (req, res, next) => {
    const party = await Party.findById(req.params.id).populate<{
        owner: IUser
        users: IUser[],
        movies: IMovie[],
    }>([
        {
            path: "owner",
        },
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
        code: party.code,
        name: party.name,
        users: party.users.map(user => {
            return { id: user.id, name: user.name };
        }),
        movies: party.movies.map(movie => {
            return { id: movie.id, title: movie.title };
        }),
        owner: { id: party.owner.id, name: party.owner.name }
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
    result: joinPartyResBodySchema,
    request: joinPartyReqBodySchema,
}, async (req, res, next) => {
    const party = await Party.findOne({ code: req.body.code }).populate<{
        owner: IUser,
        users: IUser[],
    }>([
        {
            path: "users",
        },
        {
            path: "owner",
        }
    ]);
    if (!party) {
        return next(new HttpError(404, "Party not found"));
    }
    if (party.users.find(user => user.id === req.jwt.user.id)) {
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
});
