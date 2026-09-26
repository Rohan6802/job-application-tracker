import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
    return;
  }

  res.status(500).json({ error: err.message || "server error" });
};

export default errorMiddleware;
