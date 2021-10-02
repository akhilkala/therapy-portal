import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./utils/db";
import router from "./router";
import seed from "./seed";
import { upload } from "./utils/utilities";

const app: Application = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/src/uploads", express.static("src/uploads"));
app.use("/", router);
connectDB();
seed();

app.post("/test", upload.single("test"));

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    error: err.message,
    message: "Something went wrong",
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// who all can see patient history
// who all can see patient reports
// who all can see patient data
// delet pdfs on delect account

// { value: "0", label: "Vision Therapy" },
// { value: "1", label: "Speech Therapy" },
// { value: "2", label: "Occupational Therapy" },
// { value: "3", label: "Play & Art Therapy" },
// { value: "4", label: "Counselling" },
// { value: "5", label: "Clinical Psycology" },
// { value: "6", label: "Special Education" },
// { value: "7", label: "Vocational Training" },
