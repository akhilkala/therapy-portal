import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

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
  data: {
    speech: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
    occupational: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
    play: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
    vision: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
    art: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
    behavorial: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
    physiotherapist: {
      therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      needed: {
        type: Boolean,
        default: false,
      },
    },
  },
});
export default mongoose.model<IPatient>("Patient", patientSchema);
