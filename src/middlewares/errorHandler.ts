import { Errback, Request, Response, NextFunction } from "express";

import HttpError from "../errors/HttpError";

function errorHandler(
  error: Errback & HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error);

  const status = error.status() || 500;
  const message = error.message || "Server Internal Error";
  return response.status(status).json({ status: "error", message });
}

export default errorHandler;
