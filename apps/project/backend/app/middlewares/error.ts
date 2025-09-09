import type { ErrorRequestHandler } from "express";

import { HttpError } from "../../core/errors/http";

const errorMiddleware: ErrorRequestHandler = (err, req, res, __) => {
  console.error(
    `[${new Date().toISOString()}] ERROR ${req.method} ${req.url}:`,
    err.message,
  );

  if (err instanceof HttpError) {
    return res.status(err.status).send({
      error: err.message,
    });
  }

  console.error("Stack trace:", err.stack);
  return res.status(500).send({
    error: err.message,
  });
};

export default errorMiddleware;
