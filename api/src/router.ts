import express from "express";
import { login, register } from "./controllers/auth";
import { getData, deleteAccount, postPatientData } from "./controllers/admin";
import { postFeedback, getByUserId } from "./controllers/feedback";
import protect from "./middleware/protect";
import { postReport, getUserDataByUsername } from "./controllers/teacher";
import { upload } from "./utils/utilities";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/admin/data", getData);
router.delete("/admin/delete-user/:id", deleteAccount);
router.post("/admin/patient-data", postPatientData);

router.post("/feedback", protect(), postFeedback);
router.get("/feedback", getByUserId);

router.post(
  "/upload-report",
  upload.single("file"),
  protect("teacher"),
  postReport
);

router.get("/user-data/:username", protect("teacher"), getUserDataByUsername);

export default router;
