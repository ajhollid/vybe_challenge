import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  const status = 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({ success: false, msg: message });
};
export default ErrorHandler;
