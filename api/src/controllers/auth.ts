import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { route } from "../utils/utilities";
require("dotenv").config();

export const register = route(async (req, res) => {
  const { username, password, isTeacher } = req.body;

  const exisitngUser = await User.findOne({ username });

  if (exisitngUser) {
    return res.status(401).json({
      message: "Username is already in use",
    });
  }

  const user = await new User({
    username,
    password,
    isTeacher: !!isTeacher,
  }).save();

  res.status(200).json({
    message: "User Created Succesfully",
    user,
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

  const accessToken = jwt.sign(
    { ...user, password: undefined },
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
