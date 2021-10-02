import Patient from "../models/Patient";
import User from "../models/User";
import { route } from "../utils/utilities";
require("dotenv").config();

export const postReport = route(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user || user.isTeacher) {
    return res.status(400).json({ message: "Patient does not exist" });
  }

  if (!process.env.DOMAIN_NAME) throw new Error("Environment Invalid");

  const fileUrl = process.env.DOMAIN_NAME + "/" + req.file?.path;

  await Patient.updateOne(
    { user: user._id },
    {
      $push: {
        report: {
          therapist: req.user._id,
          therapy: req.body.therapy,
          fileUrl,
        },
      },
    }
  );

  res.status(200).json({ success: true });
});

export const getUserDataByUsername = route(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user || user.isTeacher) {
    return res.status(400).json({ message: "Patient does not exist" });
  }

  const patient = await Patient.findOne({ user: user._id })
    .populate("user report.therapist")
    .lean();

  res.status(200).json(patient);
});
