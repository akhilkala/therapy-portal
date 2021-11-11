import mongoose, { Document } from "mongoose";

export interface IPatient extends Document {
  user: mongoose.Schema.Types.ObjectId;
  age: number;
  gender: string;
  history: [
    {
      fileUrl: string;
    }
  ];
  report: [
    {
      therapist: mongoose.Schema.Types.ObjectId;
      therapy: string;
      fileUrl: string;
    }
  ];
}

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  history: [
    {
      fileUrl: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  report: [
    {
      therapy: String,
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      fileUrl: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  therapies: [{ therapy: String, therapist: mongoose.Schema.Types.ObjectId }],
});
export default mongoose.model<IPatient>("Patient", patientSchema);
