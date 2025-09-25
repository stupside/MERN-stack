import type { RequestHandler } from "express";

import { type JwtPayload, verifyToken } from "../../core/auth/payload";

import { HttpError } from "../../core/errors/http";

declare global {
  namespace Express {
    interface Request {
      jwt: JwtPayload;
    }
  }
}

const authMiddleware: RequestHandler = async (req, _, next) => {
  const authorization = req.headers.authorization || req.query.token;
  if (!authorization) {
    return next(new HttpError(401, "Unauthorized"));
  }

  if (typeof authorization !== "string") {
    return next(new HttpError(401, "Unauthorized"));
  }

  if (authorization.startsWith("Bearer")) {
    const [_, token] = authorization.split(" ");

    if (!token) {
      return next(new HttpError(401, "Unauthorized"));
    }

    try {
      req.jwt = await verifyToken(token);
    } catch {
      return next(new HttpError(401, "Unauthorized"));
    }
    return next();
  }

  try {
    req.jwt = await verifyToken(authorization);
  } catch {
    return next(new HttpError(401, "Unauthorized"));
  }
  return next();
};

export default authMiddleware;
