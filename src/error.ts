import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  console.error(error.message);
  response.status(400).json({ error: "An error ocurred"});
  next();
}