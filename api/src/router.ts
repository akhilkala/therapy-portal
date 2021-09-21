import express from "express";
import { login, register } from "./controllers/auth";
import { getData, deleteAccount, postPatientData } from "./controllers/admin";
import { postFeedback, getByUserId } from "./controllers/feedback";
import protect from "./middleware/protect";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/admin/data", getData);
router.delete("/admin/delete-user/:id", deleteAccount);
router.post("/admin/patient-data", postPatientData);

router.post("/feedback", postFeedback);
router.get("/feedback", getByUserId);

export default router;
