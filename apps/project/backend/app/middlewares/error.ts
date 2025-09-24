import type { ErrorRequestHandler } from "express";

import { HttpError } from "../../core/errors/http";
import { ZodError } from "zod";

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

  if (err instanceof ZodError) {
    return res.status(400).send({
      error: "Validation error",
      details: err.issues,
    });
  }

  console.error("Stack trace:", err.stack);
  return res.status(500).send({
    error: err.message,
  });
};

export default errorMiddleware;
