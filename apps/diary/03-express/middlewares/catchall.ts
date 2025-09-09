import type { RequestHandler } from "express";

import { HttpError } from "../http/error";

export const catchallHandler: RequestHandler = (_, __, next) => {
  return next(new HttpError(404, "Not Found"));
};
