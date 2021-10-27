import Feedback from "../models/Feedback";
import User from "../models/User";
import Patient from "../models/Patient";
import { route } from "../utils/utilities";
require("dotenv").config();

export const getData = route(async (req, res) => {
  const [users, feedback] = await Promise.all([
    User.find().select("username isTeacher isAdmin").lean(),
    Feedback.find().populate("user", "username").lean(),
  ]);
  res.status(200).json({
    users,
    feedback,
  });
});

export const deleteAccount = route(async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  await Patient.deleteOne({ user: req.params.id });
  await Feedback.deleteMany({ user: req.params.id });
  res.status(200).json({
    message: "User deleted",
  });
});

export const postPatientData = route(async (req, res) => {});

export const uploadUserHistory = route(async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).lean();

  if (!user || user.isTeacher) {
    return res.status(400).json({ message: "Patient does not exist" });
  }

  if (!process.env.DOMAIN_NAME) throw new Error("Environment Invalid");

  const fileUrl = process.env.DOMAIN_NAME + "/" + req.file?.path;

  await Patient.updateOne(
    { user: user._id },
    {
      $push: {
        history: {
          fileUrl,
        },
      },
    }
  );

  res.status(200).json({ success: true });
});

export const getUserData = route(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).lean();
  console.log(user);

  if (!user || user.isTeacher) {
    return res.status(400).json({ message: "Patient does not exist" });
  }

  const data = await Patient.findOne({ user: user._id })
    .populate("user")
    .lean();

  res.status(200).json(data);
});

export const updateUserData = route(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  console.log("user");
  console.log(req.body.username);
  console.log("user");

  await User.updateOne({ _id: user._id }, { fullName: req.body.fullName });
  await Patient.updateOne(
    { user: user._id },
    {
      age: req.body.age,
      gender: req.body.gender,
    }
  );
  res.status(200).json({ success: true });
});
