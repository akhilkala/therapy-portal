import Feedback from "../models/Feedback";
import User from "../models/User";
import Patient from "../models/Patient";
import { route } from "../utils/utilities";
require("dotenv").config();

export const getData = route(async (req, res) => {
  const [patients, feedback] = await Promise.all([
    Patient.find().populate("user"),
    Feedback.find(),
  ]);
  res.status(200).json({
    patients,
    feedback,
  });
});

export const deleteAccount = route(async (req, res) => {
  await User.deleteOne({ username: req.params.id });
  await Patient.deleteOne({ user: req.params.id });
  res.status(200).json({
    message: "User deleted",
  });
});

export const postPatientData = route(async (req, res) => {});
