import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IFeedback extends Document {
  user: mongoose.Schema.Types.ObjectId;
  facultyName: string;
  message: string;
}

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    facultyName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);
