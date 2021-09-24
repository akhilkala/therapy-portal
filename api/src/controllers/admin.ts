import Feedback from "../models/Feedback";
import User from "../models/User";
import Patient from "../models/Patient";
import { route } from "../utils/utilities";
require("dotenv").config();

export const getData = route(async (req, res) => {
  const [users, feedback] = await Promise.all([User.find(), Feedback.find()]);
  res.status(200).json({
    users,
    feedback,
  });
});

export const deleteAccount = route(async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  await Patient.deleteOne({ user: req.params.id });
  res.status(200).json({
    message: "User deleted",
  });
});

export const postPatientData = route(async (req, res) => {});
