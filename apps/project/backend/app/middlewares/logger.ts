import type { RequestHandler } from "express";

const loggerMiddleware: RequestHandler = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  res.on("finish", () => {
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode}`);
  });

  next();
};

export default loggerMiddleware;
