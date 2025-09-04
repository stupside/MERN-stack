import type { ErrorRequestHandler } from "express";

import { HttpError } from "../../core/errors/http";

const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
    if (err instanceof HttpError) {
        return res.status(err.status).send({
            error: err.message
        });
    }

    return res.status(500).send({
        error: err.message
    });
};

export default errorMiddleware;
