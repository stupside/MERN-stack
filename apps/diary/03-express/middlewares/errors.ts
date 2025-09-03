import type { Request, Response } from "express";

export const errorHandler = (err: Error, __: Request, res: Response) => {
    return res.status(500).send({
        error: err.message
    });
};
