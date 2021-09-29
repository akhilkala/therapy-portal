import Patient from "../models/Patient";
import { route } from "../utils/utilities";
require("dotenv").config();

export const postReport = route(async (req, res) => {
  await Patient.updateOne(
    { "user.username": req.body.username },
    {
      $push: {
        report: {
          therapist: req.user._id,
          therapy: req.body.therapy,
          fileUrl: req.file?.filename as string,
        },
      },
    }
  );

  res.status(200).json({ success: true });
});

export const getUserDataByUsername = route(async (req, res) => {
  res.status(200).json({ success: true });
});
