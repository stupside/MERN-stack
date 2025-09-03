import type { Request, Response } from "express";
import { HttpError } from "../http/error";

export const errorHandler = (err: Error, __: Request, res: Response) => {

    if (err instanceof HttpError) {
        return res.status(err.status).send({
            error: err.message
        });
    }

    return res.status(500).send({
        error: err.message
    });
};
