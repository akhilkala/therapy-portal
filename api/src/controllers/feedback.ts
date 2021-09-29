import Feedback from "../models/Feedback";
import { route } from "../utils/utilities";
require("dotenv").config();

export const postFeedback = route(async (req, res) => {
  const { message } = req.body;

  const feedback = await new Feedback({
    user: req.user._id,
    message,
  }).save();
  res.status(200).json(feedback);
});

export const getByUserId = route(async (req, res) => {
  const feedback = await Feedback.find({ user: req.user._id });
  res.status(200).json(feedback);
});
