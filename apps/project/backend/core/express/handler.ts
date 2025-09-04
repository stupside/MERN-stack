import z from "zod";

import type { RequestHandler } from "express";

import { HttpError } from "../errors/http";

export const requestHandler = <
    TQuery extends z.ZodTypeAny,
    TParams extends z.ZodTypeAny,
    TResBody extends z.ZodTypeAny,
    TReqBody extends z.ZodTypeAny,
>(params: {
    query?: TQuery,
    params?: TParams,
    result?: TResBody,
    request?: TReqBody,
}, handler: RequestHandler<z.infer<TParams>, z.infer<TResBody>, z.infer<TReqBody>, z.infer<TQuery>>) => {
    const handle: RequestHandler<z.infer<TParams>, z.infer<TResBody>, z.infer<TReqBody>, z.infer<TQuery>> = async (req, res, next) => {
        try {
            if (params.query) {
                req.query = params.query.parse(req.query);
            }
            if (params.request) {
                req.body = params.request.parse(req.body);
            }
            if (params.params) {
                req.params = params.params.parse(req.params);
            }
            return handler(req, res, next);
        } catch (err) {
            if (err instanceof z.ZodError) {
                return next(new HttpError(400, JSON.stringify({ cause: err.cause, issues: err.issues })));
            }
            return next(err);
        }
    }

    return handle;
}