import express from "express";
import { login, register } from "./controllers/auth";
import {
  getData,
  deleteAccount,
  postPatientData,
  uploadUserHistory,
  getUserData,
  updateUserData,
} from "./controllers/admin";
import { postFeedback, getByUserId } from "./controllers/feedback";
import protect from "./middleware/protect";
import {
  postReport,
  getUserDataByUsername,
  getUserDataById,
} from "./controllers/teacher";
import { upload } from "./utils/utilities";
import { getReports } from "./controllers/patient";

const router = express.Router();

router.post("/auth/login", login);

router.post("/auth/register", protect("admin"), register);
router.get("/feedback", protect("admin"), getByUserId);
router.get("/admin/data", protect("admin"), getData);
router.get("/admin/user-data/:username", protect("admin"), getUserData);
router.delete("/admin/delete-user/:id", protect("admin"), deleteAccount);
router.post("/admin/patient-data", protect("admin"), postPatientData);
router.post(
  "/history",
  upload.single("file"),
  protect("admin"),
  uploadUserHistory
);
router.post("/update-data", protect("admin"), updateUserData);

router.post("/feedback", protect(), postFeedback);
router.get("/reports", protect(), getReports);

router.post(
  "/upload-report",
  upload.single("file"),
  protect("teacher"),
  postReport
);
router.get("/user-data/:username", protect("teacher"), getUserDataByUsername);
router.get("/therapist-data/:id", protect("user"), getUserDataById);

export default router;
