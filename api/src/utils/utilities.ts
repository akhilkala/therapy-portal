import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

type Route = (req: Request, res: Response, next: NextFunction) => any;

export const route =
  (fn: Route) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(null, false);
};

export const upload = multer({
  storage,
  fileFilter,
});
