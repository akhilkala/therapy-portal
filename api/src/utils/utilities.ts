import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuid } from "uuid";

type Route = (req: Request, res: Response, next: NextFunction) => any;

export const route =
  (fn: Route) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + ".pdf");
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

export const getTherapy = (key: string) => {
  const therapies = {
    "0": "Vision Therapy",
    "1": "Speech Therapy",
    "2": "Occupational Therapy",
    "3": "Play & Art Therapy",
    "4": "Counselling",
    "5": "Clinical Psycology",
    "6": "Special Education",
    "7": "Vocational Training",
  };
  //@ts-ignore
  return therapies[key];
};
