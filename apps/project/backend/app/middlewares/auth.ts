import type { RequestHandler } from "express";

import { type JwtPayload, verifyToken } from "../../core/auth/payload";

import { HttpError } from "../../core/errors/http";

declare global {
    namespace Express {
        interface Request {
            jwt: JwtPayload
        }
    }
}

const authMiddleware: RequestHandler = async (req, _, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return next(new HttpError(401, "Unauthorized"));
    }

    const [kind, token] = authorization.split(" ");

    if (kind === "Bearer" && token) {
        try {
            const payload = await verifyToken(token);
            req.jwt = payload;
            return next();
        } catch {
            return next(new HttpError(401, "Unauthorized"));
        }
    }
};

export default authMiddleware;
