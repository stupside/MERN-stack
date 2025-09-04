import type { RequestHandler } from "express";

const loggerMiddleware: RequestHandler = (req, _, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;
