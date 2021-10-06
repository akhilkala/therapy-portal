import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { route } from "../utils/utilities";
import Patient from "../models/Patient";
require("dotenv").config();

export const register = route(async (req, res) => {
  const { fullName, username, password, isTeacher, age, gender, therapies } =
    req.body;

  if (!isTeacher) {
    for (let i = 0; i < therapies.length; i++) {
      const username = therapies[i].therapist;
      const check = await User.findOne({ username });
      if (!check || !check.isTeacher) {
        return res.status(401).json({
          message: `${username} is not a therapist`,
        });
      }
      therapies[i]["therapist"] = check._id;
    }
  }

  const exisitngUser = await User.findOne({ username });

  if (exisitngUser) {
    return res.status(401).json({
      message: "Username is already in use",
    });
  }

  const user = await new User({
    fullName,
    username,
    password,
    isTeacher: !!isTeacher,
  }).save();

  if (!isTeacher) {
    await new Patient({
      user: user._id,
      age,
      gender,
      therapies,
    }).save();
  }

  res.status(200).json({
    message: "User Created Succesfully",
  });
});

export const login = route(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password").lean();

  if (!user) {
    return res.status(401).json({
      message: "Username or Password is Incorrect",
    });
  }

  const check = await bcrypt.compare(password, user.password);

  if (!check) {
    return res.status(401).json({
      message: "Username or Password is Incorrect",
    });
  }

  if (!process.env.SECRET || !process.env.SECRET_2)
    throw new Error("Environment Invalid");

  let payload = {
    ...user,
    password: undefined,
  };
  if (!user.isTeacher && !user.isAdmin) {
    const patient = await Patient.findOne({ user: user._id }).populate(
      "therapies._id",
      "fullName"
    );
    payload["patient"] = patient;
  }

  const accessToken = jwt.sign(
    payload,
    process.env.SECRET
    // { expiresIn: "15s" }
  );

  // const refreshToken = jwt.sign(
  //   { ...user, password: undefined },
  //   process.env.SECRET_2
  // );

  // const refreshToken = jwt.sign({ user: user._id }, process.env.SECRET_2, {
  //   expiresIn: '7d',
  // });

  res.status(200).send({
    token: accessToken,
    // refreshToken,
  });
});

export const token = route(async (req, res) => {});
