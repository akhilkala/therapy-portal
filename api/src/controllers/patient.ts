import Patient from "../models/Patient";
import { route } from "../utils/utilities";
require("dotenv").config();

export const postHistory = route(async (req, res) => {
  const patient = await Patient.updateOne(
    { user: req.body.userId },
    {
      $push: {
        history: {
          fileUrl: req.body.files[0] as string,
        },
      },
    },
    { new: true, upsert: true }
  );

  res.status(200).json(patient);
});

export const postReport = route(async (req, res) => {
  const patient = await Patient.updateOne(
    { user: req.body.userId },
    {
      $push: {
        report: {
          therapy: req.body.therapy,
          fileUrl: req.body.files[0] as string,
        },
      },
    },
    { new: true, upsert: true }
  );

  res.status(200).json(patient);
});
