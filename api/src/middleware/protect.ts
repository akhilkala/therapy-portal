import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export default (role = "user") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!process.env.SECRET || !process.env.ADMIN_TOKEN)
        throw new Error("Environment Invalid");

      if (!req.user) {
        const token = req.headers?.authorization?.split(" ")[1] || "";
        const user: any = jwt.verify(token, process.env.SECRET);
        req.user = user;
      }

      if (role == "admin" && !req.user.isAdmin) throw new Error();
      if (role == "teacher" && !(req.user.isTeacher || req.user.isAdmin))
        throw new Error();

      next();
    } catch (err) {
      res.status(401).json({
        message: "Auth Failed",
      });
    }
  };
};
